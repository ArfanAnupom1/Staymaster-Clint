import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { FaUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";


const ManagePayments = () => {
    const axiosSecure = useAxiosSecure();


    const { data: payment = [], refetch } = useQuery({
        queryKey: ['payment'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment`);
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



    return (
        <div>
            <SectionTitle heading='---How many??---' subHeading='MANAGE ALL Payments' />
            <div className="bg-white m-10 p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL Payments: {payment.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-[#D1A054] text-xl text-white">
                            <tr>
                                <th className="rounded-tl-2xl"></th>
                                
                                <th>EMAIL</th>
                                <th>Category</th>
                                <th>User ROLE</th>
                                <th className="rounded-tr-2xl">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payment.map((payments, index) => (
                                <tr key={payments._id}>
                                    <th>{index + 1}</th>
                                   
                                    <td>{payments.email}</td>
                                    <td>{payments.role}</td>
                                    <td>
                                        {payments.userRole === 'admin' ? 'admin' : (
                                            <button onClick={() => handleMakeAdmin(payment)} className="btn bg-[#D1A054] btn-xs">
                                                <FaUser className="text-red-600" />
                                            </button>
                                        )}
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
};

export default ManagePayments;
