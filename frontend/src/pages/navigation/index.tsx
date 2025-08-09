import { Outlet } from "react-router-dom";
import NavBar from "../../Components/Navbar";

const Navigation = () => {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    );
};

export default Navigation;