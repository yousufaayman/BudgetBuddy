import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Styles/EditSelectedTransactions.css';
import { PopupInputStyled } from './Styles/PopupInputStyled';
import { StatusPopup } from './StatusPopup'
import {ExpenseCategoriesDropdown, IncomeCategoriesDropdown} from './UserCategoryDropdown'

export const EditSelectedTransactions = ({editSelectedTransaction, editRefreshTable}) => {
    const userID = 'fxAEXzfQSHf26vyOJFPFOtpcZyE3'
    const [showStatusPopup, setShowStatusPopup] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const [inputValues, setInputValues] = useState({
      title: editSelectedTransaction?.data?.title || '',
      amount: editSelectedTransaction?.data?.amount || '',
      category: editSelectedTransaction?.data?.category || '',
      date: editSelectedTransaction?.data?.date ? formatDate(editSelectedTransaction.data.date) : '',
      description: editSelectedTransaction?.data?.description || '',
      recurring: editSelectedTransaction?.data?.recurring || 'false',
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
      const inputName = name.replace('edit-', '');
      setInputValues({ ...inputValues, [inputName]: value });
    };

    const handleSubmit = async () => {
      const { title, amount, category, date, description, recurring } = inputValues;
      
      
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
        const response = await axios.put(`http://localhost:3002/user/updateTransaction/${userID}/${editSelectedTransaction.id}`, {
          title,
          amount,
          category,
          date,
          description,
          recurring,
        });
    
        if (response.status === 201 && response.data && response.data.success) {
          setInputValues({
            title: '',
            amount: '',
            category: '',
            description: '',
            date: '',
            recurring: 'false',
          });
          
          setShowStatusPopup(true);
          setIsSuccess(true);
          editRefreshTable(true)
  
          setTimeout(() => {
            setShowStatusPopup(false);
            setIsSuccess(false);
            editRefreshTable(false);
          }, 2000);
  
        } else {
          setErrorMessage("Error Adding Transaction! Please Try Again Later.");
          setShowStatusPopup(true);
          setIsSuccess(false);
          editRefreshTable(false);
  
          setTimeout(() => {
            setShowStatusPopup(false);
          }, 2000);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
  
    };

    const handleDelete = async () => {
      try {
        const response = await axios.delete(`http://localhost:3002/user/deleteTransaction/${userID}/${editSelectedTransaction.id}`, {});
    
        if (response.status === 201) {
          setInputValues({
            title: '',
            amount: '',
            category: '',
            description: '',
            date: '',
            recurring: 'false',
          });

          editRefreshTable(true)
  
          setTimeout(() => {
            editRefreshTable(false);
          }, 2000);
  
          } else {
            setErrorMessage("Error Adding Transaction! Please Try Again Later.");
            setShowStatusPopup(true);
            setIsSuccess(false);
            editRefreshTable(false);
    
            setTimeout(() => {
              setShowStatusPopup(false);
            }, 2000);
          }
          } catch (error) {
            console.error('Error:', error.message);
          }
  
    };
    
    function formatDate(dateString) {
      const [month, day, year] = dateString.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    useEffect(() => {
      setInputValues({
        title: editSelectedTransaction?.data?.title || '',
        amount: editSelectedTransaction?.data?.amount || '',
        category: editSelectedTransaction?.data?.category || '',
        date: editSelectedTransaction?.data?.date ? formatDate(editSelectedTransaction.data.date) : '',        
        description: editSelectedTransaction?.data?.description || '',
        recurring: editSelectedTransaction?.data?.recurring || 'false',
      });
    }, [editSelectedTransaction]);
    

    return (
      <div className='edit-selected-transactions'>
        <h1 className="edit-transaction-title">Edit Transaction</h1>

        <PopupInputStyled
        placeholder="Transaction Title"
        type="text"
        name="edit-title"
        value={inputValues.title}
        onChange={handleInputChange}
        gridarea= " 2 / 2 / 3 / 3 "
        className='edit-transaction-input'
        />

        <PopupInputStyled
        type= "number"
        min= "1"
        name= "edit-amount"
        value = {inputValues.amount}
        onChange= {handleInputChange}
        placeholder= "Amount"
        gridarea= '3 / 2 / 4 / 3 '
        className='edit-transaction-input'
        />

        <PopupInputStyled
        placeholder= "Description"
        type= "text"
        name= "description"
        value= {inputValues.description}
        onChange= {handleInputChange}
        gridarea = " 4 / 2 / 5 / 3 "
        className='edit-transaction-input'
        />

            {editSelectedTransaction?.data?.type === 'income' && (
              <IncomeCategoriesDropdown className="edit-category-dropdwon" userID={userID} onCategoryChange={handleCategoryChange} />
            )}

            {editSelectedTransaction?.data?.type === 'expense' && (
              <ExpenseCategoriesDropdown className="edit-category-dropdwon" userID={userID} onCategoryChange={handleCategoryChange} />
            )}

        <PopupInputStyled
        type= "date"
        name= "date"
        value= {inputValues.date}
        onChange= {handleInputChange}
        placeholder= "Date"
        gridarea = " 5 / 2 / 6 / 3 "
        className='edit-transaction-input'
        />

        <div className="edit-transaction-recurring-radio">
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
        
        <div id='edit-delete-submit-btns'>
          <button className='edit-transaction-btns' id="edit-transaction-submit-btn" onClick={handleSubmit}>
          Submit
          </button>

          <button className='edit-transaction-btns' id="edit-transaction-delete-btn" onClick={handleDelete}>
          Delete
          </button>
        </div>


        {showStatusPopup && <StatusPopup isSuccess={isSuccess} message={errorMessage} />}

    </div>        
  );
};

export default EditSelectedTransactions;
