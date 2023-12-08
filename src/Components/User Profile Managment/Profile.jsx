
import { useState, useEffect } from 'react'
import axios from 'axios'


export const Profile = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const userID = "0RraVrFmb3RtnlrVIoSF6JitkaV2"

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3002/userProfile/${userID}`);
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
        const response = await axios.post(`http://localhost:3002/updateProfile/${userID}`, {
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
