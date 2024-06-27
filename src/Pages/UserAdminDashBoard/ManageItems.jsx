import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ['meals', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals?page=${currentPage}&limit=10`);
            return res.data;
        }
    });

    const handleDeleteItem = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/meals/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.title} Deleted Successfully`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        });
    };

    const totalPages = Math.ceil(meals.length / 10);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SectionTitle heading='---Hurry Up!---' subHeading='MANAGE ALL ITEMS'></SectionTitle>
            <div className="bg-white md:m-10 md:p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL ITEMS: {meals.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-[#D1A054] text-xl text-white">
                            <tr>
                                <th className="rounded-tl-2xl"></th>
                                <th>Image</th>
                                <th>Item Name</th>
                                <th>Likes</th>
                                <th>Distributor</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th className="rounded-tr-2xl">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {meals.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item.image} alt="" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.title}</td>
                                    <td>{item.likes}</td>
                                    <td>{item.admin_name}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item._id}`}>
                                            <button className="btn btn-ghost btn-xs">
                                                <FaEdit className="text-red-600 text-xl" />
                                            </button>
                                        </Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-600 text-xl" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                <button onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1} className="btn btn-primary">Previous</button>
                <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={currentPage === totalPages} className="btn btn-primary">Next</button>
            </div>
        </div>
    );
};

export default ManageItems;
