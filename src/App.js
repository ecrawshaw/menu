import React from 'react';
import './App.scss';
import menuItems from './menuItems.json';
import MenuItemsContext from './containers/menu/MenuItemContext';
import Menu from './containers/menu/menu';

function App() {
  return (
    <div className="app">
      <MenuItemsContext.Provider value={menuItems}>
        <Menu />
      </MenuItemsContext.Provider>
    </div>
  );
}

export default App;
