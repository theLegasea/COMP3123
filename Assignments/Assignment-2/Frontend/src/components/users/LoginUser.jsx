import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserAPI from '../../api/users/UserAPI';

const INIT_LOGIN = {
    username: '',
    password: '',
}

export default function LoginUser() {
    const [loginData, setLoginData] = useState(INIT_LOGIN);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Login data:', loginData);
        UserAPI.logIn(loginData)
            .then(response => {
                console.log('User logged in successfully:', response);

                // STORE TOKEN
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error logging in!', error);
            });
    }

    return(
        <div>
            <h2>Login User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username: </label>
                    <input
                        type="text"
                        name="username"
                        value={loginData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        name="password"
                        value={loginData.password}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}