import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();

    const { data: comments, isLoading: commentsLoading, error: commentsError, refetch: refetchComments } = useQuery({
        queryFn: () => fetch('https://hostel-server-seven.vercel.app/comment').then(res => res.json()),
        queryKey: ["comments"]
    });

    const handleDeleteComment = item => {
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
                axiosSecure.delete(`/comment/${item._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetchComments();
                        }
                    });
            }
        });
    };

    return (
        <div>
            <SectionTitle heading='---How many??---' subHeading='MANAGE ALL REVIEWS' />
            <div className="bg-white md:m-10 md:p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL REVIEWS: {comments ? comments.length : 0}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-[#D1A054] text-xl text-white">
                            <tr>
                                <th className="rounded-tl-2xl"></th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>Review</th>
                                <th>Likes</th>

                                <th className="rounded-tr-2xl">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comments && comments.map((item, index) => (
                                <tr key={item._id}>
                                    <th>{index + 1}</th>
                                    <td>{item.title}</td>
                                    <td>{item.email}</td>



                                    <td>{item.comment}</td>
                                    <td>{item.likes}</td>
                                    <th>
                                        <button onClick={() => handleDeleteComment(item)} className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-600 text-xl" />
                                        </button>
                                    </th>
                                    <th>
                                        <button className="">
                                            <Link to={`/meal/${item.mealId}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                View Details
                                            </button></Link>
                                        </button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageReviews;
