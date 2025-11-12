import AddUser from './components/users/AddUser';

import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom';
import LoginUser from "./components/users/LoginUser";

function App() {
    return (
        <div>
            <BrowserRouter>
                <h1>Navigation</h1>
                <nav>
                    <NavLink to={"/login"}>Login</NavLink> |{' '}
                    <NavLink to={"/signup"}>Sign Up</NavLink>
                </nav>
                <Routes>
                    <Route path="/login" element={<LoginUser />} />
                    <Route path="/signup" element={<AddUser />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;