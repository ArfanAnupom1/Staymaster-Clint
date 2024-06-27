import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { FaTrashAlt, FaUser } from "react-icons/fa";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}&limit=10`);
            return res.data;
        }
    });

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleDeleteUser = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    return (
        <div>
            <SectionTitle heading='---How many??---' subHeading='MANAGE ALL USERS' />
            <div className="bg-white m-10 p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL USERS: {users.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-[#D1A054] text-xl text-white">
                            <tr>
                                <th className="rounded-tl-2xl"></th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>Category</th>
                                <th>User ROLE</th>
                                <th className="rounded-tr-2xl">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        {user.userRole === 'admin' ? 'admin' : (
                                            <button onClick={() => handleMakeAdmin(user)} className="btn bg-[#D1A054] btn-xs">
                                                <FaUser className="text-red-600" />
                                            </button>
                                        )}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDeleteUser(user)} className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-600 text-xl" />
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex justify-center space-x-2 mt-4">
                <button onClick={() => setCurrentPage(prevPage => prevPage - 1)} disabled={currentPage === 1} className="btn btn-primary">Previous</button>
                <button onClick={() => setCurrentPage(prevPage => prevPage + 1)} disabled={users.length < 10} className="btn btn-primary">Next</button>
            </div>
        </div>
    );
};

export default AllUsers;
