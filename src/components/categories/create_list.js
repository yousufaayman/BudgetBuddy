import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import ConfirmDialog from 'src\components\categories\confirm_dialog.js';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);

  useEffect(() => {
    // fetch categories
    const categoriesRef = firebase.database().ref('categories');
    categoriesRef.on('value', (snapshot) => {
      const categoriesData = snapshot.val();
      const categoriesArray = [];
      for (let key in categoriesData) {
        categoriesArray.push({ id: key, ...categoriesData[key] });
      }
      setCategories(categoriesArray);
    });

    return () => {
      // clean remove remove when component is empty
      categoriesRef.off('value');
    };
  }, []);

  const handleDeleteCategory = (category) => {
    setSelectedCategory(category);
    setDeleteConfirmationVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete the category in Firebase
      const categoryRef = firebase.database().ref(`categories/${selectedCategory.id}`);
      await categoryRef.remove();

      // inform parent category has been deleted
      onSelectCategory(null);

      // close confirmation dialog
      setDeleteConfirmationVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelDelete = () => {
    // close confirmation dialog
    setDeleteConfirmationVisible(false);
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}{' '}
            <button onClick={() => handleDeleteCategory(category)}>Delete</button>
          </li>
        ))}
      </ul>

      {deleteConfirmationVisible && selectedCategory && (
        <ConfirmDialog
          title="Confirm Deletion"
          message={`Are you sure you want to delete the category "${selectedCategory.name}"?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default CategoryList;
