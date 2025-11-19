import React, {useContext} from 'react';
import AddUser from './components/users/AddUser';
import LoginUser from "./components/users/LoginUser";
import EmployeeList from './components/employees/EmployeeList';
import AddEmployee from './components/employees/AddEmployee';
import ViewEmployee from './components/employees/ViewEmployee';
import UpdateEmployee from './components/employees/UpdateEmployee';
import {BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';
import {AuthProvider} from './auth/AuthContext';
import RequireAuth from './auth/RequireAuth';
import AuthContext from './auth/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/App.css';

function Container() {
    const {isAuthenticated, logout} = useContext(AuthContext);
    const navigate = useNavigate();


    const linkClass = ({isActive}) => 'nav-link' + (isActive ? ' active' : '');

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
                <div className="container">
                    <NavLink to="/" className="navbar-brand text-muted fw-semibold">Employees</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav"
                            aria-controls="mainNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mainNav">
                        <ul className="navbar-nav ms-auto align-items-center">
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <button className="btn btn-link nav-link logout-btn" onClick={logout}>Logout
                                        </button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" className={linkClass}>Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/signup" className={linkClass}>Sign Up</NavLink>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container py-4">
                <Routes>
                    <Route path="/login" element={<LoginUser/>}/>
                    <Route path="/signup" element={<AddUser/>}/>
                    <Route path="/" element={<RequireAuth> <EmployeeList/> </RequireAuth>}/>
                    <Route path="/add-employee" element={<RequireAuth> <AddEmployee/> </RequireAuth>}/>
                    <Route path="/view-employee/:employeeId" element={<RequireAuth> <ViewEmployee/> </RequireAuth>}/>
                    <Route path="/update-employee/:employeeId"
                           element={<RequireAuth> <UpdateEmployee/> </RequireAuth>}/>
                </Routes>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Container/>
            </BrowserRouter>
        </AuthProvider>
    );
}
