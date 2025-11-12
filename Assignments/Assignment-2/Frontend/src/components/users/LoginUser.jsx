import React, { useState } from 'react'
import UserAPI from '../../api/users/UserAPI';

const INIT_LOGIN = {
    email : '',
    password : '',
}
export default function LoginUser() {
    const [loginData, setLoginData] = useState(INIT_LOGIN);
    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login data:', loginData);
        UserAPI.logIn(loginData).then(response => {
            alert('User logged in successfully')
            console.log('User logged in successfully:', response);})
        .catch(error => {
            console.error('There was an error logging in!', error);
            alert('Error logging in: ' + error.message);
        });
    }

    return(
        <div>
             <h2>Login User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username: </label>
                        <input type="username" name="username" value={loginData.username} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" value={loginData.password} onChange={handleInputChange}/>
                    </div>
                    <button type="submit">Login</button>
                </form>
        </div>
    )
}
