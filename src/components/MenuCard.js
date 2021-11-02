import React from 'react';
import {
  string, bool, func,
} from 'prop-types';
import { Card, Popconfirm } from 'antd';
import './MenuCard.scss';
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons';

const MenuCard = (props) => {
  const { Meta } = Card;
  const {
    itemKey, title, description, price, imageUrl, showDeleteIcon, removeMenuItems,
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
          title={title}
          description={getDescription(description, price)}
        />
      </Card>
      <div className="delete-menu-item">
        { showDeleteIcon ? (
          <Popconfirm placement="topLeft" title={popConfirmText} onConfirm={removeMenuItem} okText="Yes" cancelText="No">
            <DeleteOutlined role="button" />
          </Popconfirm>
        )
          : null}
      </div>
    </div>
  );
};

MenuCard.propTypes = {
  itemKey: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  price: string.isRequired,
  imageUrl: string.isRequired,
  showDeleteIcon: bool.isRequired,
  removeMenuItems: func.isRequired,
};

export default MenuCard;
