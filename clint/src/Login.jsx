import { useState } from 'react';
import './Login.css'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [loginbool,setloginbool] = useState(true)
    const [logoutbool,setlogoutbool] = useState(false)
    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(`Username: ${username}, Email: ${email}`);
        axios.post('http://localhost:2000/login', { name:username, email }, { withCredentials: true })
            .then(response => {
                console.log(response.data.message);
                setloginbool(false)
                setlogoutbool(true)
                setUsername('');
                setEmail('');

            })
            .catch(error => {
                const errormessage = error?.response?.data?.errors?.map((error) => error?.message).join('\n ');
                if (errormessage) {
                    return alert(errormessage);
                }
                alert(error?.response?.data?.message);
                console?.error(error?.response?.data);
            });
    };

    const handlelogout = (event) =>{
        event.preventDefault();
        axios.get('http://localhost:2000/logout')
        .then(response => {
            console.log(response.data.message);
            setloginbool(true)
            setlogoutbool(false)
        })
        .catch(error => {
            console.error(error.response.data);
        });
    }

    return (
        <>
        {loginbool && 
                <div className="login-container">
                <h1>Login Page</h1>
                <form onSubmit={handleSubmit} className="login-form">
                    <label htmlFor="username" className="form-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="form-input"
                    />
    
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                    />
    
                    {loginbool && <><button type="submit" className="form-submit-btn">Login</button> <br /></>}
                </form>
            </div>
        }
        {logoutbool &&  <button onClick={handlelogout} className="form-submit-btn">Logout</button>}

        </>
    );
};

export default Login;