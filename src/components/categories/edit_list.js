import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import EditCategoryForm from './EditCategoryForm';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  useEffect(() => {
    // Fetch categories from Firebase
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
      // clean remove event listener when component is empty
      categoriesRef.off('value');
    };
  }, []);

  const handleEditCategory = (category) => {
    setSelectedCategory(category);
    setEditModalVisible(true);
  };

  const handleCloseEditModal = () => {
    setSelectedCategory(null);
    setEditModalVisible(false);
  };

  const handleCategoryUpdated = (updatedCategory) => {
    // update category in the local state
    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category.id === updatedCategory.id ? { ...category, ...updatedCategory } : category
      )
    );

    // inform parent category has been updated
    onSelectCategory(updatedCategory);
  };

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            {category.name}{' '}
            <button onClick={() => handleEditCategory(category)}>Edit</button>
          </li>
        ))}
      </ul>

      {editModalVisible && selectedCategory && (
        <EditCategoryForm
          category={selectedCategory}
          onClose={handleCloseEditModal}
          onCategoryUpdated={handleCategoryUpdated}
        />
      )}
    </div>
  );
};

export default CategoryList;
