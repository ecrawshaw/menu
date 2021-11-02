import React from 'react';
import { render } from '@testing-library/react';
import Menu from '../Menu';
import MenuItemsContext from '../MenuItemContext';

const menuItems = [{
  key: 'Snickers',
  title: 'Snickers',
  description: 'Hungry, why wait?',
  price: 3.99,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Snickers-broken.png',
}];

describe('Testing the menu component', () => {
  let container;

  it('Should render a menu item card', () => {
    container = render(
      <MenuItemsContext.Provider value={{ menuItems }}>
        <Menu />
      </MenuItemsContext.Provider>,
    );

    expect(container.getByText(menuItems[0].title)).toBeInTheDocument();
    expect(container.getByText(menuItems[0].description)).toBeInTheDocument();
    expect(container.getByText('Halloween Menu')).toBeInTheDocument();
    expect(container.getByText('$3.99')).toBeInTheDocument();
  });
});
