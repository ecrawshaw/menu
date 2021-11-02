import React, { useState } from 'react';
import './App.scss';
import menuItemsData from './menuItems.json';
import MenuItemsContext from './containers/menu/MenuItemContext';
import Menu from './containers/menu/Menu';

function App() {
  const [menuItems, setMenuItems] = useState(menuItemsData.menuItemsToDisplay);
  return (
    <div className="app">
      <MenuItemsContext.Provider value={{ menuItems, setMenuItems }}>
        <Menu />
      </MenuItemsContext.Provider>
    </div>
  );
}

export default App;
