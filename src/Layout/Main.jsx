import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Pages/Shared/Navber/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";


const Main = () => {
    const currentLocation = useLocation();
    console.log(currentLocation);

    const noHeaderFooter = currentLocation.pathname.includes('login') || currentLocation.pathname.includes('signup')
    return (
        <div>
            {noHeaderFooter || <div className="container mx-auto">
                <Navbar></Navbar>
            </div>}

            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>
            }

        </div>
    );
};

export default Main;