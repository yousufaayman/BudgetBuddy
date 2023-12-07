import React, { useState } from 'react';
import CreateCategoryForm from './CreateCategoryForm';
import CategoryList from './CategoryList';
import { updateCategory, deleteCategory } from './api';

const TransactionManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryCreated = (newCategory) => {
    setSelectedCategory(newCategory);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleUpdateCategory = async () => {
    try {
      if (!selectedCategory) {
        console.error('No category selected for update.');
        return;
      }

      const { id, name } = selectedCategory;

      const updatedCategoryData = {
        name: 'Updated Category Name',
        // ... other properties
      };

      await updateCategory(id, updatedCategoryData);

      // Simulate call to updateCategory function
      console.log('Updating category:', id, updatedCategoryData);

      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const handleDeleteCategory = async () => {
    try {
      if (!selectedCategory) {
        console.error('No category selected for deletion.');
        return;
      }

      const { id } = selectedCategory;

      await deleteCategory(id);

      // Simulate call to deleteCategory function
      console.log('Deleting category:', id);

      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  return (
    <div>
      <CreateCategoryForm onCategoryCreated={handleCategoryCreated} />
      <CategoryList onSelectCategory={handleSelectCategory} />

      {selectedCategory && (
        <div>
          <h2>Selected Category</h2>
          <p>Name: {selectedCategory.name}</p>
          <button onClick={handleUpdateCategory}>Update Category</button>
          <button onClick={handleDeleteCategory}>Delete Category</button>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
