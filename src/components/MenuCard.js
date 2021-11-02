import React, { useState } from 'react';
import {
  string, number, bool, func,
} from 'prop-types';
import {
  Button, Card, Input, Popconfirm, Tooltip,
} from 'antd';
import './MenuCard.scss';
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons';

const MenuCard = (props) => {
  const { Meta } = Card;
  const [editingTitle, setEditingTitle] = useState(false);
  const [menuItemField, setMenuItemField] = useState();
  const {
    itemKey, title, description, price, imageUrl, showDeleteIcon, removeMenuItems, changeItemFields,
  } = props;

  const popConfirmText = 'Are you sure to delete this item?';

  const getDescription = () => (
    <div>
      <div>
        {description}
      </div>
      <div>
        $
        {price}
      </div>
    </div>
  );

  const removeMenuItem = () => {
    removeMenuItems(itemKey);
  };

  const editTitle = () => {
    setEditingTitle(true);
  };

  const saveUpdatedField = () => {
    changeItemFields(itemKey, 'title', menuItemField);
    setEditingTitle(false);
  };

  const getToolTipTitle = () => (<Button onClick={editTitle}>Click To Edit</Button>);

  const getTitle = () => {
    if (editingTitle) {
      return (
        <div className="editInput">
          <Input
            defaultValue={title}
            onChange={(input) => setMenuItemField(input.target.value)}
          />
          <Button onClick={saveUpdatedField}>Save</Button>
          <Button>Cancel</Button>
        </div>
      );
    }
    return (
      <Tooltip title={getToolTipTitle()}>
        <span>{title}</span>
      </Tooltip>
    );
  };

  return (
    <div className="menu-item-card" key={itemKey}>
      <Card
        hoverable
        cover={(
          <img
            alt={title}
            src={imageUrl}
          />
              )}
      >
        <Meta
          title={getTitle()}
          description={getDescription()}
        />
      </Card>
      <div className="delete-menu-item">
        { showDeleteIcon ? (
          <Popconfirm placement="topLeft" title={popConfirmText} onConfirm={removeMenuItem} okText="Yes" cancelText="No">
            <DeleteOutlined className="delete-icon" />
          </Popconfirm>
        )
          : null}
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  itemKey: number.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  price: number.isRequired,
  imageUrl: string.isRequired,
  showDeleteIcon: bool.isRequired,
  removeMenuItems: func.isRequired,
  changeItemFields: func.isRequired,
};

export default MenuCard;
