import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

const EditCategoryForm = ({ category, onClose, onCategoryUpdated }) => {
  const [newName, setNewName] = useState(category.name);
  const [newIcon, setNewIcon] = useState(category.icon);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleIconChange = (e) => {
    setNewIcon(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update category in firebase
      const categoryRef = firebase.database().ref(`categories/${category.id}`);
      await categoryRef.update({
        name: newName,
        icon: newIcon,
      });

      // inform parent category has been updated
      onCategoryUpdated({
        id: category.id,
        name: newName,
        icon: newIcon,
      });

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          New Category Name:
          <input type="text" value={newName} onChange={handleNameChange} required />
        </label>
        <label>
          New Icon:
          <input type="text" value={newIcon} onChange={handleIconChange} required />
        </label>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditCategoryForm;