import React, { useState } from 'react';
import './Styles/popups.css';
import { GrClose } from 'react-icons/gr';
import { PopupInputStyled } from './Styles/PopupInputStyled';

export const TransactionPopup = ({ isOpen, onClose, type }) => {
  const [inputValues, setInputValues] = useState({
    title: '',
    amount: '',
    category: '',
    description: '',
    date: '',
    recurring: 'false'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = () => {
    setInputValues({
      title: '',
      amount: '',
      category: '',
      description: '',
      date: '',
      recurring: 'false', // reset radio button to default after submission
    });
  };

  return (
    <>
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="close-btn" onClick={onClose}>
              <GrClose style={{ color: '#670AAD' }} />
            </button>
            <h1 className="title">Add {type}</h1>

            <PopupInputStyled
              type="text"
              name="title"
              value={inputValues.title}
              onChange={handleInputChange}
              placeholder="Title"
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

            <PopupInputStyled
              type="text"
              name="category"
              value={inputValues.category}
              onChange={handleInputChange}
              placeholder="Category"
              gridarea="4 / 2 / 5 /3 "
            />

            <PopupInputStyled
              type="text"
              name="description"
              value={inputValues.description}
              onChange={handleInputChange}
              placeholder="Description"
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

            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TransactionPopup;
