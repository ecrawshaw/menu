import React from 'react';
import { fireEvent, prettyDOM, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MenuCard from '../MenuCard';
import {DESCRIPTION, IMAGE_URL, PRICE, TITLE} from '../../constants/MenuConstants';

const props = {
  key: 'Snickers',
  itemKey: 'Snickers',
  title: 'Snickers',
  description: 'Hungry, why wait?',
  price: '3.99',
  imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Snickers-broken.png',
  showDeleteIcon: false,
  removeMenuItems: jest.fn(),
  setEditedMenuItemField: jest.fn(),
  setEditingField: jest.fn(),
  saveEditedFields: jest.fn(),
};

describe('Testing the menuCard component', () => {
  let container;

  it('Should render a menu item card', () => {
    container = render(
      <MenuCard {...props} />,
    );
    expect(container.getByText(props.title)).toBeInTheDocument();
    expect(container.getByText(props.description)).toBeInTheDocument();
    expect(container.getByText('$3.99')).toBeInTheDocument();
  });

  it('Should render a menu item card and delete it', () => {
    props.showDeleteIcon = true;
    container = render(
      <MenuCard {...props} />,
    );

    const deleteIcon = container.getByRole('button', { label: 'delete' });
    expect(container.getByText(props.title)).toBeInTheDocument();
    expect(container.getByText(props.description)).toBeInTheDocument();
    expect(container.getByText('$3.99')).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();
    userEvent.click(deleteIcon);
    const deleteConfirm = container.getByText('Yes');
    userEvent.click(deleteConfirm);
    props.showDeleteIcon = false;
  });

  it('Should edit and save the card title', () => {
    props.editingField = TITLE;
    props.editingFieldCardKey = 'Snickers';
    props.editedMenuItemField = 'Milky Way';
    container = render(
      <MenuCard {...props} />,
    );
    const input = container.getByDisplayValue('Snickers');
    fireEvent.change(input, { target: { value: 'Milky Way' } });
    expect(input.value).toBe('Milky Way');
    const saveButton = container.getByText('Save');
    fireEvent.click(saveButton);

    expect(props.setEditedMenuItemField).toHaveBeenCalledWith('Milky Way');
    expect(props.setEditingField).toHaveBeenCalledWith(false);
    expect(props.saveEditedFields).toHaveBeenCalledWith('Snickers', TITLE, 'Milky Way');
  });

  it('Should edit and save the card description', () => {
    props.editingField = DESCRIPTION;
    props.editingFieldCardKey = 'Snickers';
    props.editedMenuItemField = 'Milky Way Description';
    container = render(
      <MenuCard {...props} />,
    );
    const input = container.getByDisplayValue('Hungry, why wait?');
    fireEvent.change(input, { target: { value: 'Milky Way Description' } });
    expect(input.value).toBe('Milky Way Description');
    const saveButton = container.getByText('Save');
    fireEvent.click(saveButton);

    expect(props.setEditedMenuItemField).toHaveBeenCalledWith('Milky Way Description');
    expect(props.setEditingField).toHaveBeenCalledWith(false);
    expect(props.saveEditedFields).toHaveBeenCalledWith('Snickers', DESCRIPTION, 'Milky Way Description');
  });

  it('Should edit and cancel saving changes', () => {
    props.editingField = DESCRIPTION;
    props.editingFieldCardKey = 'Snickers';
    props.editedMenuItemField = 'Milky Way Description';
    container = render(
        <MenuCard {...props} />,
    );
    const input = container.getByDisplayValue('Hungry, why wait?');
    fireEvent.change(input, { target: { value: 'Milky Way Description' } });
    expect(input.value).toBe('Milky Way Description');
    const cancelButton = container.getByText('Cancel');
    fireEvent.click(cancelButton);

    expect(props.setEditedMenuItemField).toHaveBeenCalledWith('Milky Way Description');
    expect(props.setEditingField).toHaveBeenCalledWith(false);
  });

  it('Should edit and save the card price', () => {
    props.editingField = PRICE;
    props.editingFieldCardKey = 'Snickers';
    props.editedMenuItemField = '1';
    container = render(
        <MenuCard {...props} />,
    );
    const input = container.getByDisplayValue('3.99');
    fireEvent.change(input, { target: { value: '1' } });
    expect(input.value).toBe('1');
    const saveButton = container.getByText('Save');
    fireEvent.click(saveButton);

    expect(props.setEditedMenuItemField).toHaveBeenCalledWith('1');
    expect(props.setEditingField).toHaveBeenCalledWith(false);
    expect(props.saveEditedFields).toHaveBeenCalledWith('Snickers', PRICE, '1');
  });

  it('Should edit and save the card Image Url', () => {
    props.editingField = IMAGE_URL;
    props.editingFieldCardKey = 'Snickers';
    props.editedMenuItemField = 'url';
    container = render(
        <MenuCard {...props} />,
    );
    const input = container.getByDisplayValue('https://upload.wikimedia.org/wikipedia/commons/9/97/Snickers-broken.png');
    fireEvent.change(input, { target: { value: 'url' } });
    expect(input.value).toBe('url');
    const saveButton = container.getByText('Save');
    fireEvent.click(saveButton);

    expect(props.setEditedMenuItemField).toHaveBeenCalledWith('url');
    expect(props.setEditingField).toHaveBeenCalledWith(false);
    expect(props.saveEditedFields).toHaveBeenCalledWith('Snickers', IMAGE_URL, 'url');
  });

});
