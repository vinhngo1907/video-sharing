import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './pages/navigation';
import Login from './Components/Authentication/Login';
import Register from './Components/Authentication/Register';

function App() {
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Navigation />
                            </>
                        }
                    >
                        <Route path="auth">
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </Fragment>
    );
}

export default App;
