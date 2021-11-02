import React, { useContext, useEffect, useState } from 'react';
import MenuCard from '../../components/MenuCard';
import './Menu.scss';
import MenuItemsContext from './MenuItemContext';
import AddRemoveItems from './AddRemoveItems';

const Menu = () => {
  const menuItemsContext = useContext(MenuItemsContext);
  const { menuItems, setMenuItems } = menuItemsContext;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [countOfMenuItems, setCountOfMenuItems] = useState(menuItems.length);

  useEffect(() => {
    setCountOfMenuItems(menuItems.length);
  }, [menuItems]);

  const addMenuItems = (menuItem) => {
    const updatedMenuItems = [...menuItems, menuItem];
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
        countOfMenuItems={countOfMenuItems}
      />
      {menuItemRenderer()}
    </div>
  );
};

export default Menu;
