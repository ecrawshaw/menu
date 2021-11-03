import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Menu.scss';
import MenuItemsContext from './MenuItemContext';
import AddRemoveItems from './AddRemoveItems';
import MenuCard from '../../components/MenuCard';

const Menu = () => {
  const menuItemsContext = useContext(MenuItemsContext);
  const { menuItems, setMenuItems } = menuItemsContext;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemDescription, setNewItemDescription] = useState('');
  const [newItemPrice, setNewItemPrice] = useState('');
  const [newItemImageUrl, setNewItemImageUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const addMenuItems = () => {
    const newItem = {
      key: uuidv4(),
      title: newItemTitle,
      description: newItemDescription,
      price: newItemPrice.replace(/[!@#$%^&*]/g, ''),
      imageUrl: newItemImageUrl,
    };
    const updatedMenuItems = [...menuItems, newItem];
    setMenuItems(updatedMenuItems);
  };

  const removeMenuItems = (menuItem) => {
    const updatedMenuItems = menuItems.filter((item) => item.key !== menuItem);
    setMenuItems(updatedMenuItems);
  };

  const changeItemFields = (itemKey, propertyName, newValue) => {
    const indexToUpdate = menuItems.findIndex((item) => item.key === itemKey);
    const updatedMenuItems = menuItems;
    updatedMenuItems[indexToUpdate][propertyName] = newValue;
    setMenuItems([...updatedMenuItems]);
  };

  const menuItemRenderer = () => menuItems.map((item) => (
    <MenuCard
      key={item.key}
      itemKey={item.key}
      title={item.title}
      description={item.description}
      price={item.price}
      imageUrl={item.imageUrl}
      showDeleteIcon={showDeleteIcon}
      removeMenuItems={removeMenuItems}
      changeItemFields={changeItemFields}
    />
  ));

  return (
    <div className="menu-item-container">
      <h1 className="menu-title">Halloween Menu</h1>
      <AddRemoveItems
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        addMenuItems={addMenuItems}
        setShowDeleteIcon={setShowDeleteIcon}
        showDeleteIcon={showDeleteIcon}
        newItemTitle={newItemTitle}
        setNewItemTitle={setNewItemTitle}
        newItemDescription={newItemDescription}
        setNewItemDescription={setNewItemDescription}
        newItemPrice={newItemPrice}
        setNewItemPrice={setNewItemPrice}
        newItemImageUrl={newItemImageUrl}
        setNewItemImageUrl={setNewItemImageUrl}
        showAlert={showAlert}
        setShowAlert={setShowAlert}
      />
      {menuItemRenderer()}
    </div>
  );
};

export default Menu;
