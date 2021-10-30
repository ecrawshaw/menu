import React from 'react';
import { string, number } from 'prop-types';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import './menuCard.scss';
import 'antd/dist/antd.css';

const MenuCard = (props) => {
  const { Meta } = Card;
  const {
    title, description, price, imageUrl,
  } = props;

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
    </div>

  );
};

MenuCard.propTypes = {
  title: string.isRequired,
  description: string.isRequired,
  price: number.isRequired,
  imageUrl: string.isRequired,
};

export default MenuCard;
