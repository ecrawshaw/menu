import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import * as uuid from 'uuid';
import userEvent from '@testing-library/user-event';
import Menu from '../Menu';
import MenuItemsContext from '../MenuItemContext';

const menuItems = [{
  key: '0',
  title: 'Snickers',
  description: 'Hungry, why wait?',
  price: '3.99',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Snickers-broken.png',
}];
jest.mock('uuid', () => ({ v4: () => '00000000-0000-0000-0000-000000000000' }));

describe('Testing the menu component', () => {
  let container;
  const setMenuItems = jest.fn();

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

  it('Should add a new menu item', () => {
    const addMenuItemInput = {
      key: '00000000-0000-0000-0000-000000000000',
      title: 'test title',
      description: 'test description',
      price: '5',
      imageUrl: 'test URL',
    };
    container = render(
      <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
        <Menu />
      </MenuItemsContext.Provider>,
    );
    const addMenuItemButton = container.getByText('Add Menu Item');
    userEvent.click(addMenuItemButton);

    const titleInput = container.getByPlaceholderText('Title');
    const descriptionInput = container.getByPlaceholderText('Description');
    const priceInput = container.getByPlaceholderText('Price');
    const imageUrlInput = container.getByPlaceholderText('Image URL');

    fireEvent.change(titleInput, { target: { value: 'test title' } });
    fireEvent.change(descriptionInput, { target: { value: 'test description' } });
    fireEvent.change(priceInput, { target: { value: '5' } });
    fireEvent.change(imageUrlInput, { target: { value: 'test URL' } });
    expect(titleInput.value).toBe('test title');
    expect(descriptionInput.value).toBe('test description');
    expect(priceInput.value).toBe('5');
    expect(imageUrlInput.value).toBe('test URL');
    const okButton = container.getByText('OK');
    userEvent.click(okButton);
    expect(setMenuItems).toHaveBeenCalledWith([...menuItems, addMenuItemInput]);
  });

  it('Should delete a menu item', () => {
    container = render(
      <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
        <Menu />
      </MenuItemsContext.Provider>,
    );
    const deleteMenuItemButton = container.getByText('Remove Menu Items');
    userEvent.click(deleteMenuItemButton);
    const deleteIcon = container.getAllByRole('button', { label: 'delete' })[2];
    userEvent.click(deleteIcon);
    const yesButton = container.getByText('Yes');
    userEvent.click(yesButton);
    expect(setMenuItems).toHaveBeenCalledWith([]);
  });

  // it('should changeItemFields', () => {
  //   container = render(
  //     <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
  //       <Menu />
  //     </MenuItemsContext.Provider>,
  //   );
  //
  //   expect(setMenuItems).toHaveBeenCalledWith([]);
  // });
});
