import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import StartContainer from '../components/StartContainer';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('StartContainer', () => {
  it('should navigate to /LoginPage when Get Started button is clicked', () => {
    // Render the component with MemoryRouter
    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<StartContainer />} />
        </Routes>
      </MemoryRouter>
    );

    // Click the Get Started button
    fireEvent.click(screen.getByText('Get Started'));

    // Check if the navigate function was called with the correct argument
    expect(mockNavigate).toHaveBeenCalledWith('/LoginPage');
  });
});
