import React, { useContext } from 'react';
import MenuCard from '../../components/menuCard';
import './menu.scss';
import MenuItemsContext from './MenuItemContext';

const Menu = () => {
  const menuItemsContext = useContext(MenuItemsContext);
  const { menuItemsToDisplay } = menuItemsContext;

  const menuItemRenderer = () => menuItemsToDisplay.map((item) => (
    <MenuCard
      key={item.key}
      title={item.title}
      description={item.description}
      price={item.price}
      imageUrl={item.imageUrl}
    />
  ));

  return (
    <div className="menu-item-container">
      <h1 className="menu-title">Halloween Menu</h1>
      {menuItemRenderer()}
    </div>
  );
};

export default Menu;
