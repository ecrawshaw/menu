import React, { useState } from 'react';
import {
  Alert, Button, Input, Modal,
} from 'antd';
import { bool, func, number } from 'prop-types';
import './AddRemoveItems.scss';

const AddRemoveItems = (props) => {
  const {
    isModalVisible,
    setIsModalVisible,
    addMenuItems,
    setShowDeleteIcon,
    showDeleteIcon,
    countOfMenuItems,
  } = props;
  const [newItemTitle, setNewItemTitle] = useState();
  const [newItemDescription, setNewItemDescription] = useState();
  const [newItemPrice, setNewItemPrice] = useState();
  const [newItemImageUrl, setNewItemImageUrl] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const clearModalValues = () => {
    setNewItemDescription();
    setNewItemPrice();
    setNewItemTitle();
    setNewItemImageUrl();
  };

  const handleOk = () => {
    if (newItemDescription && newItemTitle && newItemPrice && newItemImageUrl) {
      addMenuItems({
        key: countOfMenuItems + 1,
        title: newItemTitle,
        description: newItemDescription,
        price: newItemPrice,
        imageUrl: newItemImageUrl,
      });
      setIsModalVisible(false);
      setShowAlert(false);
      clearModalValues();
    } else {
      setShowAlert(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowAlert(false);
    clearModalValues();
  };

  const showDelete = () => {
    setShowDeleteIcon(!showDeleteIcon);
  };

  return (
    <div className="add-remove-buttons">
      <Button type="default" onClick={showModal}>
        Add Menu Item
      </Button>
      <Button type="default" onClick={showDelete}>
        {showDeleteIcon ? 'Done Deleting' : 'Remove Menu Items'}
      </Button>
      <Modal className="add-item-modal" title="Add a menu item" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        <div>
          <div className="add-menu-item-title">
            <Input placeholder="Title" onChange={(input) => setNewItemTitle(input.target.value)} />
          </div>
          <div className="add-menu-item-description">
            <Input placeholder="Description" onChange={(input) => setNewItemDescription(input.target.value)} />
          </div>
          <div className="add-menu-item-price">
            <Input placeholder="Price" onChange={(input) => setNewItemPrice(input.target.value)} />
          </div>
          <div className="add-menu-item-image-url">
            <Input placeholder="Image URL" onChange={(input) => setNewItemImageUrl(input.target.value)} />
          </div>
        </div>
        {showAlert ? <Alert message="Please note that all fields are required to add a new menu item" type="error" /> : null}
      </Modal>
    </div>
  );
};

AddRemoveItems.propTypes = {
  isModalVisible: bool.isRequired,
  setIsModalVisible: func.isRequired,
  addMenuItems: func.isRequired,
  setShowDeleteIcon: func.isRequired,
  showDeleteIcon: bool.isRequired,
  countOfMenuItems: number.isRequired,
};
export default AddRemoveItems;
