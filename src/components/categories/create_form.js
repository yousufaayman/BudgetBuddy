import React, { useState } from 'react';
import firebase from 'firebase';

const CreateCategoryForm = ({ onCategoryCreated }) => {
  const [categoryName, setCategoryName] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('');

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleIconChange = (e) => {
    setSelectedIcon(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // add new category to Firebase
    const categoriesRef = firebase.database().ref('categories');
    const newCategory = await categoriesRef.push({
      name: categoryName,
      icon: selectedIcon,
    });

    // inform parent component new category created
    onCategoryCreated({
      id: newCategory.key,
      name: categoryName,
      icon: selectedIcon,
    });

    // reset fields
    setCategoryName('');
    setSelectedIcon('');
  };

  return (
    <div>
      <h2>Create New Category</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Category Name:
          <input type="text" value={categoryName} onChange={handleCategoryNameChange} required />
        </label>
        <label>
          Select Icon:
          <input type="text" value={selectedIcon} onChange={handleIconChange} required />
        </label>
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategoryForm;
