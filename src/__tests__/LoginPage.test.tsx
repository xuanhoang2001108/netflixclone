import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';  // Import the Provider
import configureStore from 'redux-mock-store';  // You may need to install this package

import LoginContainer from '../components/LoginContainer';
import { store } from '../store/Store';

const mockNavigate = jest.fn();
const mockStore = configureStore();  // Create a mock store

test('clicking "Sign up now." should trigger navigation to /RegisterPage', () => {
  // Render the component inside a MemoryRouter and Provider
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/LoginPage']}>
        <Routes>
          <Route path="/LoginPage" element={<LoginContainer />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  fireEvent.click(screen.getByText('Sign up now.'));
  expect(mockNavigate).toHaveBeenCalledWith('/RegisterPage');
});
