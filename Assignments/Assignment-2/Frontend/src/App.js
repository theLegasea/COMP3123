import React from 'react';
import AddUser from './components/users/AddUser';
import LoginUser from "./components/users/LoginUser";
import EmployeeList from './components/employees/EmployeeList';
import AddEmployee from './components/employees/AddEmployee';
import {BrowserRouter, NavLink, Route, Routes, useNavigate} from 'react-router-dom';



function Container() {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('token'));

    const token = localStorage.getItem('token');
    if (token) {
        console.log('User is logged in');
    } else {
        console.log('User is not logged in');
    }
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
                <Route path="/" element={<EmployeeList/>}/>
                <Route path="/login" element={<LoginUser/>}/>
                <Route path="/signup" element={<AddUser/>}/>
                <Route path="/add-employee" element={<AddEmployee/>}/>
                <Route path="*" element={<h2>Page Not Found</h2>}/>
            </Routes>
        </div>
    );
}

export default function App() {
    return (
        <BrowserRouter>
            <Container/>
        </BrowserRouter>
    );
}