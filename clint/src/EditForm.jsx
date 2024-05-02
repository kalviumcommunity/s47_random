import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './EditForm.css'; // Import CSS file for styling
import Cookies from 'js-cookie';

const EditForm = () => {
    const location = useLocation();
    const user = location?.state?.user;
    const navigate = useNavigate();

    const [userName, setUserName] = useState(user?.name);
    const [userEmail, setUserEmail] = useState(user?.email);
    const token = Cookies.get('token');
    console.log(token);


    const updateuser = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if (name === 'name') {
            setUserName(value);
        } else {
            setUserEmail(value);
        }
        console.log(userName, userEmail);
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        axios.put(`http://localhost:2000/users/${user._id}`, { name: userName, email: userEmail }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                console.log(res.data)
                navigate('/users')})
            .catch(err => {
                console.log(err)
                alert(err.response?.data.message)
            });
    }

    return (
        <div className="update-form-container">
            <form className="update-form" onChange={updateuser} onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username:</label>
                <input className="input-field" type="text" name='name' value={userName} autoFocus /><br /><br />
                <label htmlFor="email">Email:</label>
                <input className="input-field" type="text" name='email' value={userEmail} />
                <br /><br />
                <button className="submit-btn">Save</button>
            </form>
        </div>
    )
}

export default EditForm;