import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import menuItems from './menuItems.json';
import MenuItemsContext from './containers/menu/MenuItemContext';

describe('Renders the App Component', () => {
  it('should render the app component', () => {
    const component = render(
      <MenuItemsContext.Provider value={menuItems}>
        <App />
      </MenuItemsContext.Provider>,
    );
    const halloweenMenu = component.getByText('Halloween Menu');
    expect(halloweenMenu).toBeInTheDocument();
  });
});
