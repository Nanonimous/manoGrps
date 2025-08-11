import React from 'react';
import { render, screen } from '@testing-library/react';
import { HeroSection } from '../herosection/HeroSection';
import { ShopByNeed } from '../shopByNeed/ShopByNeed';
import { WhyChoseUs } from '../whyChoseUs/WhyChoseUs';
import { TopBrands } from '../topBrands/TopBrands';
import { About_us } from '../About_us/About_us';
import { LookingFor } from '../lookingFor/LookingFor';
import Trendings from '../trendings/Trendings';
import Location from '../location/Location';
import EnquiryForm from '../enquiryForm/EnquiryForm';

describe('Title Styling Consistency', () => {
  const testTitleColor = '#ff0000';

  test('HeroSection title uses consistent styling', () => {
    render(
      <HeroSection 
        mainHeading="Test Heading"
        headingColor={testTitleColor}
      />
    );
    
    const heading = screen.getByText('Test Heading');
    expect(heading).toHaveStyle('color: #ff0000');
    
    // Check if the element has the correct CSS class for consistent styling
    expect(heading).toHaveClass('mainHeading');
  });

  test('ShopByNeed title uses consistent styling', () => {
    render(
      <ShopByNeed 
        title="Test Shop Title"
        titleColor={testTitleColor}
      />
    );
    
    const title = screen.getByText('Test Shop Title');
    expect(title).toHaveStyle('color: #ff0000');
    expect(title).toHaveClass('sectionTitle');
  });

  test('WhyChoseUs title uses consistent styling', () => {
    render(
      <WhyChoseUs 
        title="Test Why Choose Title"
        titleColor={testTitleColor}
        features={[]}
      />
    );
    
    const title = screen.getByText('Test Why Choose Title');
    expect(title).toHaveStyle('color: #ff0000');
    expect(title).toHaveClass('mainTitle');
  });

  test('TopBrands title uses consistent styling', () => {
    render(
      <TopBrands 
        title="Test Brands Title"
        titleColor={testTitleColor}
        brands={[]}
      />
    );
    
    const title = screen.getByText('Test Brands Title');
    expect(title).toHaveStyle('color: #ff0000');
    expect(title).toHaveClass('mainTitle');
  });

  test('About_us title uses consistent styling', () => {
    render(
      <About_us 
        title="Test About Title"
        titleColor={testTitleColor}
      />
    );
    
    const title = screen.getByText('Test About Title');
    expect(title).toHaveStyle('color: #ff0000');
    expect(title).toHaveClass('aboutUsTitle');
  });

  test('LookingFor title uses consistent styling', () => {
    render(
      <LookingFor 
        title="Test Looking Title"
        titleColor={testTitleColor}
        categories={[]}
      />
    );
    
    const title = screen.getByText('Test Looking Title');
    expect(title).toHaveStyle('color: #ff0000');
    expect(title).toHaveClass('sectionTitle');
  });

  test('Trendings title uses consistent styling', () => {
    render(
      <Trendings 
        title="Test Trending Title"
        titleColor={testTitleColor}
        products={[]}
      />
    );
    
    const title = screen.getByText('Test Trending Title');
    expect(title).toHaveStyle('color: #ff0000');
    expect(title).toHaveClass('sectionTitle');
  });

  test('Location title uses consistent styling', () => {
    render(
      <Location 
        title="Test Location Title"
        titleColor={testTitleColor}
      />
    );
    
    const title = screen.getByText('Test Location Title');
    expect(title).toHaveStyle('color: #ff0000');
  });

  test('EnquiryForm title uses consistent styling', () => {
    render(
      <EnquiryForm 
        title="Test Enquiry Title"
        titleColor={testTitleColor}
      />
    );
    
    const title = screen.getByText('Test Enquiry Title');
    expect(title).toHaveStyle('color: #ff0000');
  });
});
