import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import useHistory from "../../Hooks/useHistory";

const History = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);

    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['payments', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?page=${currentPage}&limit=10`);
            return res.data;
        }
    });

    const handleDeletePayment = async (paymentId) => {
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
                axiosSecure.delete(`/payments/${paymentId}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your payment request has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    });
            }
        });
    };

    const totalPages = Math.ceil(payments.length / 10);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SectionTitle heading='---How many??---' subHeading='MY ALL REQUEST'></SectionTitle>
            <div className="bg-white m-10 p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL REQUESTS: {payments.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-[#D1A054] text-xl text-white">
                            <tr>
                                <th className="rounded-tl-2xl"></th>
                                <th>Price</th>
                                <th>Email</th>
                                <th>Transaction ID</th>
                                <th>Status</th>
                                <th className="rounded-tr-2xl">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <th>{index + 1}</th>
                                    <td>{payment.price}</td>
                                    <td>{payment.email}</td>
                                    <td>{payment.transactionId}</td>
                                    <td>{payment.status}</td>
                                    <td>
                                        <button onClick={() => handleDeletePayment(payment._id)} className="btn btn-ghost btn-xs">
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

export default History;
