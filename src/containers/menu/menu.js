import React from 'react';
import MenuCard from '../../components/menuCard';
import './menu.scss';
import menuItems from '../../menuItems.json';

const Menu = () => {
  const { menuItemsToDisplay } = menuItems;

  const menuItemRenderer = () => menuItemsToDisplay.map((item) => (
    <MenuCard
      title={item.title}
      description={item.description}
      price={item.price}
      imageUrl={item.imageUrl}
    />
  ));

  return (
    <div className="menu-item-container">
      <h1>Halloween Menu</h1>
      {menuItemRenderer()}
    </div>
  );
};

export default Menu;
