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
import AuthContext from './auth/AuthContext'


function Container() {
    const navigate = useNavigate();
    const {isAuthenticated, setIsAuthenticated} = useContext(AuthContext);

    /* const token = localStorage.getItem('token');
    if (token) {
        console.log('User is logged in');
    } else {
        console.log('User is not logged in');
    } */
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        window.location.href = '/login';
    }

    return (
        <div>
            <h1>Navigation</h1>
            <nav>
                {isAuthenticated ? (
                    <>
                        <NavLink to="/">Employees</NavLink> |{' '}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <NavLink to="/login">Login</NavLink> |{' '}
                        <NavLink to="/signup">Sign Up</NavLink>
                    </>
                )}
            </nav>

            <Routes>
                <Route path="/login" element={<LoginUser/>}/>
                <Route path="/signup" element={<AddUser/>}/>
                <Route path="/" element={<RequireAuth> <EmployeeList /> </RequireAuth>}/>
                <Route path="/add-employee" element={<RequireAuth> <AddEmployee /> </RequireAuth>}/>
                <Route path="/view-employee" element={<RequireAuth> <ViewEmployee /> </RequireAuth>}/>
                <Route path="/update-employee" element={<RequireAuth> <UpdateEmployee /> </RequireAuth>}/>
            </Routes>
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