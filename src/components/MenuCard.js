import React from 'react';
import {
  string, bool, func,
} from 'prop-types';
import {
  Button, Card, Input, Popconfirm, Tooltip,
} from 'antd';
import './MenuCard.scss';
import { DeleteOutlined } from '@ant-design/icons';
import {
  DESCRIPTION, IMAGE_URL, POP_CONFIRM_TEXT, PRICE, TITLE,
} from '../constants/MenuConstants';

const MenuCard = (props) => {
  const { Meta } = Card;

  const {
    itemKey,
    title,
    description,
    price,
    imageUrl,
    showDeleteIcon,
    removeMenuItems,
    saveEditedFields,
    editedMenuItemField,
    setEditedMenuItemField,
    editingField,
    setEditingField,
    editingFieldCardKey,
    setEditingFieldCardKey,
  } = props;

  const removeMenuItem = () => {
    removeMenuItems(itemKey);
  };

  const saveUpdatedField = (field) => {
    if (editedMenuItemField) {
      saveEditedFields(itemKey, field, editedMenuItemField);
    }
    setEditedMenuItemField();
    setEditingField(false);
  };

  const cancelFieldUpdate = () => {
    setEditedMenuItemField();
    setEditingField(false);
  };

  const getToolTip = (field) => (
    <div className="tooltip-button">
      <Button onClick={() => {
        setEditingField(field);
        setEditingFieldCardKey(itemKey);
      }}
      >
        Click To Edit
      </Button>
    </div>
  );

  const getFieldEditor = (field) => {
    let defaultValue;
    switch (field) {
      case TITLE:
        defaultValue = title;
        break;
      case DESCRIPTION:
        defaultValue = description;
        break;
      case PRICE:
        defaultValue = price;
        break;
      case IMAGE_URL:
        defaultValue = imageUrl;
        break;
      default:
        defaultValue = '';
        break;
    }
    return (
      <div className="edit-input">
        <Input
          defaultValue={defaultValue}
          onChange={(input) => setEditedMenuItemField(input.target.value)}
        />
        <Button onClick={() => saveUpdatedField(field)}>Save</Button>
        <Button onClick={cancelFieldUpdate}>Cancel</Button>
      </div>
    );
  };

  const getDescriptionAndPrice = () => {
    const elements = [];
    if (editingField === DESCRIPTION && editingFieldCardKey === itemKey) {
      elements.push(<div>{getFieldEditor(DESCRIPTION)}</div>);
    } else {
      elements.push(
        <div>
          <Tooltip placement="left" mouseEnterDelay=".8" title={getToolTip(DESCRIPTION)}>
            <span>
              {description}
            </span>
          </Tooltip>
        </div>,
      );
    }

    if (editingField === PRICE && editingFieldCardKey === itemKey) {
      elements.push(<div>{getFieldEditor(PRICE)}</div>);
    } else {
      elements.push(
        <div>
          <Tooltip placement="left" mouseEnterDelay=".8" title={getToolTip(PRICE)}>
            <span>
              $
              {price}
            </span>
          </Tooltip>
        </div>,
      );
    }
    return elements;
  };

  const getTitle = () => {
    if (editingField === TITLE && editingFieldCardKey === itemKey) {
      return (<div>{getFieldEditor(TITLE)}</div>);
    }
    return (
      <Tooltip placement="left" mouseEnterDelay=".8" title={getToolTip(TITLE)}>
        <span>{title}</span>
      </Tooltip>
    );
  };

  const getCoverImage = () => {
    if (editingField === IMAGE_URL && editingFieldCardKey === itemKey) {
      return (<div>{getFieldEditor(IMAGE_URL)}</div>);
    }
    return (
      <Tooltip placement="left" mouseEnterDelay=".8" title={getToolTip(IMAGE_URL)}>
        <img
          alt={title}
          src={imageUrl}
        />
      </Tooltip>
    );
  };

  return (
    <div className="menu-item-card" key={itemKey}>
      <Card
        hoverable
        cover={getCoverImage()}
      >
        <Meta
          title={getTitle()}
          description={getDescriptionAndPrice()}
        />
      </Card>
      <div className="delete-menu-item">
        { showDeleteIcon ? (
          <Popconfirm placement="topLeft" title={POP_CONFIRM_TEXT} onConfirm={removeMenuItem} okText="Yes" cancelText="No">
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
  saveEditedFields: func.isRequired,
  editedMenuItemField: string.isRequired,
  setEditedMenuItemField: func.isRequired,
  editingField: string.isRequired,
  setEditingField: func.isRequired,
  editingFieldCardKey: string.isRequired,
  setEditingFieldCardKey: func.isRequired,
};

export default MenuCard;
