import React from 'react';
import {
  Alert, Button, Input, Modal,
} from 'antd';
import {
  bool, func, string,
} from 'prop-types';
import './AddRemoveItems.scss';

const AddRemoveItems = (props) => {
  const {
    isModalVisible,
    setIsModalVisible,
    addMenuItems,
    setShowDeleteIcon,
    showDeleteIcon,
    newItemTitle,
    setNewItemTitle,
    newItemDescription,
    setNewItemDescription,
    newItemPrice,
    setNewItemPrice,
    newItemImageUrl,
    setNewItemImageUrl,
    showAlert,
    setShowAlert,
  } = props;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (newItemDescription && newItemTitle && newItemPrice && newItemImageUrl) {
      addMenuItems();
      setIsModalVisible(false);
      setShowAlert(false);
    } else {
      setShowAlert(true);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setShowAlert(false);
  };

  const showDelete = () => {
    setShowDeleteIcon(!showDeleteIcon);
  };

  const getModal = () => (
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
  );

  return (
    <div className="add-remove-buttons">
      <Button type="default" onClick={showModal}>
        Add Menu Item
      </Button>
      <Button type="default" onClick={showDelete}>
        {showDeleteIcon ? 'Done Deleting' : 'Remove Menu Items'}
      </Button>
      {getModal()}
    </div>
  );
};

AddRemoveItems.propTypes = {
  isModalVisible: bool.isRequired,
  setIsModalVisible: func.isRequired,
  addMenuItems: func.isRequired,
  setShowDeleteIcon: func.isRequired,
  showDeleteIcon: bool.isRequired,
  newItemTitle: string.isRequired,
  setNewItemTitle: func.isRequired,
  newItemDescription: string.isRequired,
  setNewItemDescription: func.isRequired,
  newItemPrice: string.isRequired,
  setNewItemPrice: func.isRequired,
  newItemImageUrl: string.isRequired,
  setNewItemImageUrl: func.isRequired,
  showAlert: bool.isRequired,
  setShowAlert: func.isRequired,
};
export default AddRemoveItems;
