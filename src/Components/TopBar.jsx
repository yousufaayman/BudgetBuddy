import React from 'react';
import './Styles/TopBar.Module.css'

export function LandingTopBar() {

    return (
        <div className="TopBar">
            <img className="dollarIcon" src= './DollarCoin.svg' alt="Dollar Icon"/>
            <img className="euroIcon" src="./EuroCoin.svg" alt="Euro Icon" />
            <h1 className="budgetBuddy">Budget Buddy</h1>
        </div>
    )
};