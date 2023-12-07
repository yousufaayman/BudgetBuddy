import React, { useState } from 'react';
import CreateCategoryForm from './CreateCategoryForm';
import CategoryList from './CategoryList';

const TransactionManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryCreated = (newCategory) => {
    // add new category to list
    setSelectedCategory(newCategory);
  };

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
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
        </div>
      )}
    </div>
  );
};

export default TransactionManagement;
