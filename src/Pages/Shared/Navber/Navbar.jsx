import { Link } from "react-router-dom";
import logo from '/logo.png'
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useMyRequest from "../../../Hooks/useMyRequest";
import UseAdmin from "../../../Hooks/UseAdmin";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
    const [isAdmin] = UseAdmin();
    const [requestedMeal, refetch] = useMyRequest();
    const { user, logOut } = useContext(AuthContext);
    const [showUserInfo, setShowUserInfo] = useState(false);

    const { data: requestedMeals = [], isLoading: commentsLoading, error: commentsError, refetch: refetchComments } = useQuery({
        queryFn: () => fetch('https://hostel-server-seven.vercel.app/requestedMeal').then(res => res.json()),
        queryKey: ["requestedMeals"]
    });

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
    }

    const toggleUserInfo = () => {
        setShowUserInfo(!showUserInfo);
    }

    const nav = (
        <>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allmeals">All Meals</Link></li>
            {isAdmin ? (
                <li><Link to="/dashboard/serveMeals">
                    <button className="">
                        Requested Meal
                        <div className="badge badge-secondary">
                            {requestedMeals.length}
                        </div>
                    </button>
                </Link></li>
            ) : (
                <li><Link to="/dashboard/requestedMeal">
                    <button className="">
                        Requested Meal
                        <div className="badge badge-secondary">
                            {requestedMeal.length}
                        </div>
                    </button>
                </Link></li>
            )}
            <li><Link to="/upcomingMeals">Upcoming Meals</Link></li>
        </>

    );

    return (
        <div className="navbar fixed z-10 bg-opacity-40 max-w-screen-xl rounded-b-xl bg-white text-black">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {nav}
                    </ul>
                </div>
                <img className="w-10 h-10" src={logo} alt="" />
                <a className="btn btn-ghost text-xl">StayMaster</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu flex justify-center items-center menu-horizontal px-1">
                    {nav}
                </ul>
            </div>
            <div className="navbar-end mr-10">
                <div>
                    {user ? (
                        <div className="relative inline-block">
                            <img
                                onClick={toggleUserInfo}
                                className="w-10 rounded-full cursor-pointer"
                                src={user.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                                alt="Profile"
                            />
                            {showUserInfo && (
                                <div className="absolute rounded-2xl right-0 top-12 bg-white border border-gray-200 p-2 shadow-lg">
                                    <p className="text-2xl font-bold text-center">{user.displayName}</p>
                                    <p className="text-center">{user.email}</p>
                                    <button className="btn btn-ghost"><Link to="/dashboard">Dashboard</Link></button>
                                    <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <li><Link to="/login">Login</Link></li>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;