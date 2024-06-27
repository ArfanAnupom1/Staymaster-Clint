import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AllMeals from "../Pages/AllMeals/AllMeals";
import Details from "../Pages/AllMeals/Details";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SingUp/SignUp";
import AdminUserDashBoard from "../Layout/AdminUserDashBoard";
import MyRequest from "../Pages/UserAdminDashBoard/MyRequest";
import Private from "../Pages/providers/Private";
import AllUsers from "../Pages/UserAdminDashBoard/AllUsers";
import AddItems from "../Pages/UserAdminDashBoard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../Pages/UserAdminDashBoard/ManageItems";
import UpdateItem from "../Pages/UserAdminDashBoard/UpdateItem";
import MealServe from "../Pages/UserAdminDashBoard/MealServe";
import MangeReviews from "../Pages/UserAdminDashBoard/MangeReviews";
import UpComingMeals from "../Pages/AllMeals/UpComingMeals";
import ComingDetails from "../Pages/AllMeals/ComingDetails";
import MangeUpComing from "../Pages/UserAdminDashBoard/AddItems/MangeUpComing";
import UpdateUpComing from "../Pages/UserAdminDashBoard/UpdateUpComing";
import MYReviews from "../Pages/UserAdminDashBoard/MYReviews";

import Payment from "../Pages/UserAdminDashBoard/Payment/Payment";
import Hisotry from "../Pages/UserAdminDashBoard/Hisotry";
import History from "../Pages/UserAdminDashBoard/Hisotry";




export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/allmeals',
                element: <AllMeals></AllMeals>
            },
            {
                path: '/meal/:id',
                element: <Private><Details></Details></Private>
            },
            {
                path: '/UpComing/:id',
                element: <ComingDetails></ComingDetails>
            },

            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/upcomingMeals',
                element: <UpComingMeals></UpComingMeals>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>,
            },
        ]
    },
    {
        path: "dashboard",
        element: <Private><AdminUserDashBoard></AdminUserDashBoard></Private>,
        children: [
            {
                path: 'requestedMeal',
                element: <MyRequest></MyRequest>

            },

            {
                path: 'users',
                element: <AllUsers></AllUsers>

            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>

            },
            {
                path: 'paymenthistory',
                element: <Hisotry></Hisotry>

            },
            {
                path: 'mangeComing',
                element: <MangeUpComing></MangeUpComing>

            },
            {
                path: 'mypayments',
                element: <History></History>

            },
            {
                path: 'myreviews',
                element: <MYReviews></MYReviews>

            },
            {
                path: 'addMeal',
                element: <AdminRoute><AddItems></AddItems></AdminRoute>

            },

            {
                path: 'reviews',
                element: <AdminRoute><MangeReviews></MangeReviews></AdminRoute>

            },
            {
                path: 'serveMeals',
                element: <AdminRoute><MealServe></MealServe></AdminRoute>

            },
            {
                path: 'allmeal',
                element: <AdminRoute><ManageItems></ManageItems></AdminRoute>

            },
            {
                path: "updateItem/:id",
                element: <AdminRoute><UpdateItem></UpdateItem></AdminRoute>,
                loader: ({ params }) => fetch(`https://hostel-server-seven.vercel.app/meals/${params.id}`)
            },
            {
                path: "updateComingItem/:id",
                element: <AdminRoute><UpdateUpComing></UpdateUpComing></AdminRoute>,
                loader: ({ params }) => fetch(`https://hostel-server-seven.vercel.app/UpComing/${params.id}`)
            }
        ]
    }
]);