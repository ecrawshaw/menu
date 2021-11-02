import React from 'react';
import {
  string, number, bool, func,
} from 'prop-types';
import { Card, Popconfirm } from 'antd';
import './MenuCard.scss';
import 'antd/dist/antd.css';
import { DeleteOutlined } from '@ant-design/icons';

const MenuCard = (props) => {
  const { Meta } = Card;
  const {
    title, description, price, imageUrl, showDeleteIcon, removeMenuItems,
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
    removeMenuItems(title);
  };

  return (
    <div className="menu-item-card">
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
  title: string.isRequired,
  description: string.isRequired,
  price: number.isRequired,
  imageUrl: string.isRequired,
  showDeleteIcon: bool.isRequired,
  removeMenuItems: func.isRequired,
};

export default MenuCard;
