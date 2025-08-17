import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Login } from './Login';

// Mock the Google OAuth provider
jest.mock('@react-oauth/google', () => ({
  GoogleOAuthProvider: ({ children }) => <div data-testid="google-oauth-provider">{children}</div>,
  GoogleLogin: ({ onSuccess, onError }) => (
    <button 
      data-testid="google-login-button"
      onClick={() => onSuccess({ credential: 'mock-jwt-token' })}
    >
      Sign in with Google
    </button>
  )
}));

// Mock jwt-decode
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(() => ({
    email: 'test@example.com',
    name: 'Test User'
  }))
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true })
  })
);

describe('Login Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Google OAuth login correctly', () => {
    render(<Login />);

    expect(screen.getByText('Welcome Back')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByText('Sign in with your Google account to access your dashboard and manage your preferences.')).toBeInTheDocument();
  });

  test('renders Google login button', () => {
    render(<Login />);

    expect(screen.getByTestId('google-login-button')).toBeInTheDocument();
  });

  test('handles Google login success', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    
    render(<Login />);
    
    const googleButton = screen.getByTestId('google-login-button');
    fireEvent.click(googleButton);
    
    expect(consoleSpy).toHaveBeenCalledWith('Google User:', {
      email: 'test@example.com',
      name: 'Test User'
    });
    
    expect(fetch).toHaveBeenCalledWith('http://localhost:5000/create-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'test@example.com' })
    });
    
    consoleSpy.mockRestore();
  });
});
