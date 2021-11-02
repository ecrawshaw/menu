import React from 'react';
import { fireEvent, prettyDOM, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddRemoveItems from '../addRemoveItems';

const props = {
  isModalVisible: true,
  setIsModalVisible: jest.fn(),
  addMenuItems: jest.fn(),
  setShowDeleteIcon: jest.fn(),
  showDeleteIcon: false,
};

describe('Testing the add and remove buttons', () => {
  it('should render the add and remove buttons', () => {
    const container = render(<AddRemoveItems {...props} />);
    const addMenuItemButton = container.getByText('Add Menu Item');
    const deleteMenuItemButton = container.getByText('Remove Menu Items');
    expect(addMenuItemButton).toBeInTheDocument();
    expect(deleteMenuItemButton).toBeInTheDocument();
  });

  it('should click the add menu item button and cancel', () => {
    const container = render(<AddRemoveItems {...props} />);
    const addMenuItemButton = container.getByText('Add Menu Item');
    userEvent.click(addMenuItemButton);
    const addMenuModal = container.getByText('Add a menu item');
    expect(addMenuModal).toBeInTheDocument();
    const cancelButton = container.getByText('Cancel');
    userEvent.click(cancelButton);
  });

  it('should add a new menu item', () => {
    const container = render(<AddRemoveItems {...props} />);
    const addMenuItemButton = container.getByText('Add Menu Item');
    userEvent.click(addMenuItemButton);
    const addMenuModal = container.getByText('Add a menu item');
    expect(addMenuModal).toBeInTheDocument();

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
  });

  it('should click the delete menu item button ', () => {
    const container = render(<AddRemoveItems {...props} />);
    const deleteMenuItemButton = container.getByText('Remove Menu Items');
    userEvent.click(deleteMenuItemButton);
  });
});
