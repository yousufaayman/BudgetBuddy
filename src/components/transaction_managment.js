import React, { useState } from 'react';
import CreateCategoryForm from './CreateCategoryForm';
import CategoryList from './CategoryList';

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

      const { id, /* other category properties */ } = selectedCategory;

      const updatedCategory = {
        // ... updated category data
      };

      // Simulate an API call or call your actual updateCategory function
      console.log('Updating category:', id, updatedCategory);

      // handle success
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  const handleDeleteCategory = async () => {
    try {
      if (!selectedCategory) {
        // Handle the case where no category is selected
        console.error('No category selected for deletion.');
        return;
      }

      const { id } = selectedCategory;

      // Simulate an API call or call your actual deleteCategory function
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
          <p>Icon: {selectedCategory.icon}</p>
          <button onClick={handleUpdateCategory}>Update Category</button>
          <button onClick={handleDeleteCategory}>Delete Category</button>
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
