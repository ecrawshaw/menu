import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import menuItems from './menuItems.json';
import MenuItemsContext from './containers/menu/MenuItemContext';

describe('renders the App Component', () => {
  it('should render the app', () => {
    const component = render(
      <MenuItemsContext.Provider value={menuItems}>
        <App />
      </MenuItemsContext.Provider>,
    );
    const linkElement = component.getByText('Halloween Menu');
    expect(linkElement).toBeInTheDocument();
  });
});
