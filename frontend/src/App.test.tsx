import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Find Resources heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/find resources/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders search form elements', () => {
  render(<App />);
  
  // Check for form elements
  const locationInput = screen.getByLabelText(/location/i);
  const categorySelect = screen.getByLabelText(/category/i);
  const searchButton = screen.getByRole('button', { name: /search/i });
  
  expect(locationInput).toBeInTheDocument();
  expect(categorySelect).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();
});

test('renders category options', () => {
  render(<App />);
  
  const categorySelect = screen.getByLabelText(/category/i);
  expect(categorySelect).toBeInTheDocument();
  
  // Check that category options are present
  expect(screen.getByText('Select Category')).toBeInTheDocument();
  expect(screen.getByText('Domestic Violence')).toBeInTheDocument();
  expect(screen.getByText('Mental Health')).toBeInTheDocument();
  expect(screen.getByText('Legal Aid')).toBeInTheDocument();
  expect(screen.getByText('Housing')).toBeInTheDocument();
});
