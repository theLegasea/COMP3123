import AddUser from './components/users/AddUser';

import {BrowserRouter, Navlink, Route, Routes} from 'react-router-dom';

function App() {
    return (
        <div>
            <BrowserRouter>
                <h1>Navigation</h1>
                <nav>
                    <NavLink to={"/user"}>User</NavLink> |{' '}
                </nav>
                <Routes>
                    <Route path="/user" element={<AddUser />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default App;