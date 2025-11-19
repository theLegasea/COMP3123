import React, {useState} from 'react'
import UserAPI from '../../api/users/UserAPI';
import {useNavigate} from "react-router-dom";
import '../../css/AddUser.css'

const INIT_USER = {
    username: '',
    email: '',
    password: '',
}
export default function AddUser() {
    const navigate = useNavigate();
    const [user, setUser] = useState(INIT_USER);
    const [error, setError] = useState('');

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
        setError('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('User to be added:', user);
        UserAPI.signUp(user).then(response => {
            console.log('User added successfully:', response);
            navigate('/login');
        })
            .catch(error => {
                setError(error.message || 'There was an error creating your account');
                console.error('There was an error adding the user!', error);
            });
    }
    const handleCancel = () => navigate('/login');

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: 'calc(100vh - 200px)'}}>
            <div className="card add-user p-3">
                <div className="card-body">
                    <div className="text-center mb-3">
                        <h3 className="mb-1">Create Account</h3>
                        <p className="text-muted small mb-0">Sign up to get started</p>
                    </div>
                    {error && (
                        <div className="alert alert-danger alert-sm py-2 px-3 small mb-3" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Username</label>
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Email</label>
                            <input
                                type="email"
                                className="form-control form-control-sm"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Password</label>
                            <input
                                type="password"
                                className="form-control form-control-sm"
                                name="password"
                                value={user.password}
                                onChange={handleInputChange}
                                required
                                minLength="6"
                            />
                        </div>
                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-sm btn-primary">
                                Sign Up
                            </button>
                        </div>
                        <div className="text-center">
                            <span className="text-muted small">Already have an account? </span>
                            <button type="button" className="btn btn-link btn-sm p-0" onClick={handleCancel}>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}