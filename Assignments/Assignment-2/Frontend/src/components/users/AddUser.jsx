import React, { useState } from 'react'
import UserAPI from '../../api/users/UserAPI';

const INIT_USER = {
    username : '',
    email : '',
    password : '',
}
export default function AddUser() {
    const [user, setUser] = useState(INIT_USER);
    const handleInputChange = (e) => {
        const{name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User to be added:', user);
        UserAPI.signUp(user).then(response => {
            alert('User added successfully')
        console.log('User added successfully:', response);})
        .catch(error => {
            console.error('There was an error adding the user!', error);
        });
    }

    return(
        <div>
             <h2>Add new User</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Username: </label>
                        <input type="text" name="username" value={user.username} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="email" name="email" value={user.email} onChange={handleInputChange}/>
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" name="password" value={user.password} onChange={handleInputChange}/>
                    </div>
                    <button type="submit">Add User</button>
                </form>
        </div>
    )
}