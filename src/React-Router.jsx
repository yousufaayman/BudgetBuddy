import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {LandingPage} from './Components/LandingPage'
import {RegestrationPage} from './Components/RegestrationPage'

export function BudgetBuddyApp() {
    return(
        <div className="budget-buddy-app">
            <Router>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/regestration-page" element={<RegestrationPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default BudgetBuddyApp;