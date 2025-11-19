import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import UserAPI from '../../api/users/UserAPI';
import AuthContext from '../../auth/AuthContext';
import '../../css/LoginUser.css'

const INIT_LOGIN = {
    username: '',
    password: '',
}

export default function LoginUser() {
    const [loginData, setLoginData] = useState(INIT_LOGIN);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
        setError('');
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        UserAPI.logIn(loginData)
            .then(response => {
                console.log('User logged in successfully:', response);

                // STORE TOKEN
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setIsAuthenticated(true);
                navigate('/');
            })
            .catch(error => {
                setError('Invalid username or password');
                console.error('There was an error logging in!', error);
            });
    }

    const handleSignUp = () => navigate('/signup');

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: 'calc(100vh - 200px)'}}>
            <div className="card login-user p-3">
                <div className="card-body">
                    <div className="text-center mb-3">
                        <h3 className="mb-1">Welcome</h3>
                        <p className="text-muted small mb-0">Please login to view the employee directory</p>
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
                                value={loginData.username}
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
                                value={loginData.password}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="d-grid gap-2 mb-3">
                            <button type="submit" className="btn btn-sm btn-primary">
                                Login
                            </button>
                        </div>

                        <div className="text-center">
                            <span className="text-muted small">Don't have an account? </span>
                            <button type="button" className="btn btn-link btn-sm p-0" onClick={handleSignUp}>
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}