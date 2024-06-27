import { useContext } from "react";
import { MdComment, MdNoMeals, MdPayment } from "react-icons/md";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../Pages/providers/AuthProvider";
import { FaHome, FaNewspaper, FaReact, FaServicestack, FaUser, FaUtensilSpoon } from "react-icons/fa";

import { CiLogout } from "react-icons/ci";
import UseAdmin from "../Hooks/UseAdmin";
import useMyRequest from "../Hooks/useMyRequest";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const AdminUserDashBoard = () => {
    const { user, loading, logOut } = useContext(AuthContext);
    const [requestedMeal] = useMyRequest();


    const { data: users = [], isLoading: usersLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await useAxiosPublic.get('/users');
            return res.data;
        }
    })
    const filteredUsers = users.filter(u => u.email === user.email);

    const navigate = useNavigate();
    const [isAdmin] = UseAdmin();
    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.log(error));
        navigate('/login');
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>Error: User not found</div>;
    }


    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-72 md:min-h-screen bg-[#0f172a] text-[#eaf0ff] font-semibold">
                <ul className="md:p-10">
                    {
                        isAdmin ? <>
                            <p className="text-center text-green-400">
                                {filteredUsers.map(user => (
                                    <span key={user.id}>
                                        <p>{user.userRole}</p>
                                    </span>
                                ))}
                            </p>
                            <div className="flex justify-center mt-10">
                                <img className="rounded-full w-28" src={user.photoURL} alt="User Profile" />
                            </div>
                            <p className="text-center mt-4">{user.displayName}</p>
                            <p className="text-center">{user.email}</p>


                            <li className="flex items-center space-x-4">
                                <FaUtensilSpoon></FaUtensilSpoon>
                                <NavLink to="/dashboard/addMeal" className="nav-link hover:text-red-400 focus:text-red-400">Add Meals</NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaUtensilSpoon></FaUtensilSpoon>
                                <NavLink to="/dashboard/allmeal" className="nav-link hover:text-red-400 focus:text-red-400">All Meals</NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaUser></FaUser>
                                <NavLink to="/dashboard/users" className="nav-link hover:text-red-400 focus:text-red-400">Mange Users</NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaReact></FaReact>
                                <NavLink to="/dashboard/reviews" className="nav-link hover:text-red-400 focus:text-red-400">All reviews</NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaServicestack></FaServicestack>
                                <NavLink to="/dashboard/serveMeals" className="nav-link hover:text-red-400 focus:text-red-400">Serve Meals</NavLink>
                            </li>
                            <li className="flex items-center space-x-4">
                                <FaNewspaper></FaNewspaper>
                                <NavLink to="/dashboard/mangeComing" className="nav-link hover:text-red-400 focus:text-red-400">Upcoming Meals:</NavLink>
                            </li>

                        </>
                            : <>

                                <p className="text-center text-green-400">
                                    {filteredUsers.map(user => (
                                        <span key={user.id}>
                                            <p>{user.role}</p>
                                        </span>
                                    ))}
                                </p>
                                <div className="flex justify-center mt-10 ">
                                    <img className="rounded-full w-28" src={user.photoURL} alt="User Profile" />
                                </div>
                                <p className="text-center mt-4">{user.displayName}</p>
                                <p className="text-center ">{user.email}</p>

                                <li className="flex items-center space-x-4 mt-10">
                                    <MdNoMeals />
                                    <NavLink to="/dashboard/requestedMeal" className="nav-link hover:text-red-400 focus:text-red-400">My Requested meal : <span className="text-red-400">({requestedMeal.length})</span></NavLink>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <MdComment />
                                    <NavLink to="/dashboard/myreviews" className="nav-link hover:text-red-400 focus:text-red-400">My Reviews</NavLink>
                                </li>
                                <li className="flex items-center space-x-4">
                                    <MdPayment />
                                    <NavLink to="/dashboard/paymenthistory" className="nav-link hover:text-red-400 focus:text-red-400">Payment History</NavLink>
                                </li>
                                <div className="h-px bg-white my-10"></div>

                            </>
                    }
                    <div className="h-px bg-white my-10"></div>
                    <li className="flex items-center space-x-4">
                        <FaHome />
                        <NavLink to="/" className="nav-link hover:text-red-400 focus:text-red-400">Home</NavLink>
                    </li>
                    <li className="flex items-center space-x-4">
                        <MdNoMeals />
                        <NavLink to="/allmeals" className="nav-link hover:text-red-400 focus:text-red-400">All Meals</NavLink>
                    </li>
                    <div className="flex items-center space-x-2">
                        <CiLogout></CiLogout>
                        <button onClick={handleLogOut} className="btn btn-ghost">LogOut</button>
                    </div>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet />
            </div>
        </div>
    );
};

export default AdminUserDashBoard;
