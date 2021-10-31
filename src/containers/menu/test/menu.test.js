import React from 'react';
import { render } from '@testing-library/react';
import Menu from '../menu';
import MenuItemsContext from '../MenuItemContext';

const menuItemsToDisplay = [{
  key: 0,
  title: 'Snickers',
  description: 'Hungry, why wait?',
  price: 3.99,
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Snickers-broken.png',
}];

describe('Testing the menu component', () => {
  let component;

  it('Should render a menu item card', () => {
    component = render(
      <MenuItemsContext.Provider value={{ menuItemsToDisplay }}>
        <Menu />
      </MenuItemsContext.Provider>,
    );

    expect(component.getByText(menuItemsToDisplay[0].title)).toBeInTheDocument();
    expect(component.getByText(menuItemsToDisplay[0].description)).toBeInTheDocument();
    expect(component.getByText('Halloween Menu')).toBeInTheDocument();
    expect(component.getByText('$3.99')).toBeInTheDocument();
  });
});
