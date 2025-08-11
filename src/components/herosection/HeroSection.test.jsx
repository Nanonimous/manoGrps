import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

describe('HeroSection Component', () => {
  test('renders with default props', () => {
    render(<HeroSection />);
    
    expect(screen.getByText('The wait is over—our sale starts today!')).toBeInTheDocument();
    expect(screen.getByText('Deals Content - Products')).toBeInTheDocument();
    expect(screen.getByText('Shop now')).toBeInTheDocument();
  });

  test('applies dynamic colors correctly', () => {
    const customProps = {
      mainHeading: 'Custom Heading',
      subText: 'Custom subtext',
      buttonText: 'Custom Button',
      backgroundColor: '#f0f0f0',
      headingColor: '#ff0000',
      subTextColor: '#00ff00',
      buttonColor: '#0000ff',
      buttonBgColor: '#ffff00'
    };

    render(<HeroSection {...customProps} />);
    
    // Check if custom text is rendered
    expect(screen.getByText('Custom Heading')).toBeInTheDocument();
    expect(screen.getByText('Custom subtext')).toBeInTheDocument();
    expect(screen.getByText('Custom Button')).toBeInTheDocument();
    
    // Check if colors are applied
    const heading = screen.getByText('Custom Heading');
    const subtext = screen.getByText('Custom subtext');
    const button = screen.getByText('Custom Button');
    
    expect(heading).toHaveStyle('color: #ff0000');
    expect(subtext).toHaveStyle('color: #00ff00');
    expect(button).toHaveStyle('color: #0000ff');
    expect(button).toHaveStyle('background: #ffff00');
  });

  test('applies default colors when no color props provided', () => {
    render(<HeroSection />);
    
    const heading = screen.getByText('The wait is over—our sale starts today!');
    const subtext = screen.getByText('Deals Content - Products');
    const button = screen.getByText('Shop now');
    
    expect(heading).toHaveStyle('color: #2d5a27');
    expect(subtext).toHaveStyle('color: #666');
    expect(button).toHaveStyle('color: #ffffff');
    expect(button).toHaveStyle('background: linear-gradient(135deg, #ff6b6b, #ff8e53)');
  });
});
