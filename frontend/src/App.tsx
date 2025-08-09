import { Fragment } from 'react'
import { Route, Routes } from "react-router";
import './App.css';
import Navigation from './pages/navigation';

function App() {

    return (
        <Fragment>
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Navigation />
                            {/* <NotifPanel />
              <Notifications /> */}
                        </>
                    }
                >

                </Route>
            </Routes>
        </Fragment>
    )
}

export default App
