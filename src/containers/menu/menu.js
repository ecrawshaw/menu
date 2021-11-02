import React, { useContext, useState } from 'react';
import MenuCard from '../../components/MenuCard';
import './menu.scss';
import MenuItemsContext from './MenuItemContext';
import AddRemoveItems from './addRemoveItems';

const Menu = () => {
  const menuItemsContext = useContext(MenuItemsContext);
  const { menuItems, setMenuItems } = menuItemsContext;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const addMenuItems = (menuItem) => {
    const updatedMenuItems = [...menuItems, menuItem];
    setMenuItems(updatedMenuItems);
  };

  const removeMenuItems = (menuItem) => {
    const updatedMenuItems = menuItems.filter((item) => item.key !== menuItem);
    setMenuItems(updatedMenuItems);
  };

  const menuItemRenderer = () => menuItems.map((item) => (
    <MenuCard
      key={item.key}
      title={item.title}
      description={item.description}
      price={item.price}
      imageUrl={item.imageUrl}
      showDeleteIcon={showDeleteIcon}
      removeMenuItems={removeMenuItems}
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
      />
      {menuItemRenderer()}
    </div>
  );
};

export default Menu;
