import React, { useState, useContext } from 'react';
import './Styles/popups.css';
import { GrClose } from 'react-icons/gr';
import { PopupInputStyled } from './Styles/PopupInputStyled';
import axios from 'axios';
import { StatusPopup } from './StatusPopup'
import {ExpenseCategoriesDropdown, IncomeCategoriesDropdown} from './UserCategoryDropdown'
import UserContext from '../UserContext';




export const TransactionPopup = ({ isOpen, onClose, type }) => {
  const { user, walletId} = useContext(UserContext);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');


  const [inputValues, setInputValues] = useState({
    title: '',
    amount: '',
    category: '',
    date: '',
    description: '',
    recurring: 'false',
    type: type,
  });

  const validateTitle = (title) => {
    return title.trim().length > 0;
  };
  
  const validateAmount = (amount) => {
    return parseFloat(amount) > 0;
  };
  
  const validateDate = (date) => {
    return date.trim().length > 0;
  };
  
  const validateCategory = (category) => {
    return category.trim().length > 0;
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    setInputValues({ ...inputValues, category: selectedCategory });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async () => {
    const { title, amount, category, date, description, recurring, type } = inputValues;
    
    
    const isTitleValid = validateTitle(title);
    const isAmountValid = validateAmount(amount);
    const isDateValid = validateDate(date);
    const isCategoryValid = validateCategory(category);

    if (!isTitleValid || !isAmountValid || !isDateValid || !isCategoryValid) {
      let errorMessage = '';
  
      if (!isTitleValid) errorMessage += 'Title is required. ';
      if (!isAmountValid) errorMessage += 'Amount should be greater than 0. ';
      if (!isDateValid) errorMessage += 'Date is required. ';
      if (!isCategoryValid) errorMessage += 'Category is required. ';
  
      setErrorMessage(errorMessage.trim());
      setShowStatusPopup(true);
      setIsSuccess(false);
  
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3002/user/transaction/${user}/${walletId}`, {
        title,
        amount,
        category,
        date,
        description,
        recurring,
        type,
      });
  
      if (response.status === 201 && response.data && response.data.success) {
        setInputValues({
          title: '',
          amount: '',
          category: '',
          description: '',
          date: '',
          recurring: 'false',
          type: '',
        });
        
        setShowStatusPopup(true);
        setIsSuccess(true);

        setTimeout(() => {
          setShowStatusPopup(false);
          setIsSuccess(false);
          onClose();
        }, 2000);

      } else {
        setErrorMessage("Error Adding Transaction! Please Try Again Later.");
        setShowStatusPopup(true);
        setIsSuccess(false);

        setTimeout(() => {
          setShowStatusPopup(false);
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }

  };
  
  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">

            <button id="close-btn" onClick={onClose}>
              <GrClose style={{ color: '#7b0dcf' }} />
            </button>
            <h1 className="title">Add {type}</h1>

            <PopupInputStyled
              placeholder="Transaction Title"
              type="text"
              name="title"
              value={inputValues.title}
              onChange={handleInputChange}
              gridarea="2 / 2 / 3 /3 "
            />

            <PopupInputStyled
              type="number"
              min="1"
              name="amount"
              value={inputValues.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              gridarea="3 / 2 / 4 /3 "
            />

            {type === 'income' && (
              <IncomeCategoriesDropdown className="category-dropdwon" onCategoryChange={handleCategoryChange} />
            )}

            {type === 'expense' && (
              <ExpenseCategoriesDropdown className="category-dropdwon" onCategoryChange={handleCategoryChange} />
            )}

            <PopupInputStyled
              placeholder="Description"
              type="text"
              name="description"
              value={inputValues.description}
              onChange={handleInputChange}
              gridarea="5 / 2 / 6 /3 "
            />

            <PopupInputStyled
              type="date"
              name="date"
              value={inputValues.date}
              onChange={handleInputChange}
              placeholder="Date"
              gridarea="6 / 2 / 7 /3 "
            />

            <div className="recurring-radio">
              <label className="radio-text" htmlFor="recurring-true">
                Recurring:
              </label>

              <input
                type="radio"
                id="recurring-true"
                name="recurring"
                value="true"
                className="radio-btn"
                checked={inputValues.recurring === 'true'}
                onChange={handleInputChange}
              />
              <label className="radio-text" htmlFor="recurring-true">
                Yes
              </label>

              <input
                type="radio"
                id="recurring-false"
                name="recurring"
                value="false"
                className="radio-btn"
                checked={inputValues.recurring === 'false'}
                onChange={handleInputChange}
              />
              <label className="radio-text" htmlFor="recurring-false">
                No
              </label>
            </div>

            <button id="submit-btn" onClick={handleSubmit}>
              Submit
            </button>

            {showStatusPopup && <StatusPopup isSuccess={isSuccess} message={errorMessage} />}

          </div>

        </div>
      )}
    </>
  );
};

export default TransactionPopup;
