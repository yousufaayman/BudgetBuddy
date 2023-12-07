import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

const CategoryList = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // fetch categories from firebase
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
      // clean event listerner when comonent is empty
      categoriesRef.off('value');
    };
  }, []);

  return (
    <div>
      <h2>Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => onSelectCategory(category)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
