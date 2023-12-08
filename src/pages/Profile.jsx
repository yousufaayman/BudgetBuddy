//import '../Components/Styles/Dashboard.Module.css'
//import { useState } from 'react'
//import { useEffect } from 'react'
import { API_URL } from '../lib/const'
import axios from 'axios'
import { getCookie } from '../lib/CookieHandler'
// import {MainContent} from './DashboardMainContent'

export const Profile = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const user = getCookie("__tK__");
    const userID = user.uid

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/userProfile/${userID}`);
        console.log(data);
        if (data) {
          setFirstName(data.firstName)
          setLastName(data.lastName)
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


    const updateProfile = async (e) => {

      try {
        const response = await axios.post(`${API_URL}/updateProfile/${userID}`, {
          firstName,
          lastName
        });
        if (response) {
          fetchProfile()
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    useEffect(()=>{
      fetchProfile()
    }, [])


    console.log(firstName, lastName);

    // MainContent("3cZUJIvnx7OqOl5uXkSGfveaLHw2")
    return (
                <div className='profile'>
                  <h1>User Information</h1>
                  <form>
                    <div>
                        <label for="firstName">First name</label>
                        <input 
                          id="firstName"
                          type="text" 
                          defaultValue={firstName}
                          onChange={e=>setFirstName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label for="firstName">Last Name</label>
                        <input 
                          id="lastName"
                          type="text" 
                          defaultValue={lastName}
                          onChange={e=>setLastName(e.target.value)}
                        />
                    </div>
                    <div>
                      <button type="button" onClick={updateProfile}>Update</button>
                    </div>
                  </form>
                </div>
    );
  }
  
  export default Profile;
