import { FaTrashAlt, FaEdit, FaEye } from "react-icons/fa"; // Import additional icons
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import useReviews from "../../Hooks/useReviews";
import { Link } from "react-router-dom";

const MYReviews = () => {
    const [comment, loading, refetch] = useReviews(); // Ensure refetch is correctly destructured
    const axiosSecure = useAxiosSecure();

    const handleDelete = id => {
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
                axiosSecure.delete(`/comment/${id}`)
                    .then(res => {
                        console.log(res);
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch(); // Ensure refetch is called correctly
                        }
                    })
            }
        });
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SectionTitle heading='---How many??---' subHeading='MY ALL REQUEST'></SectionTitle>
            <div className="bg-white md:m-10 md:p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL REQUESTS: {comment.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-[#D1A054] text-xl text-white">
                            <tr>
                                <th className="rounded-tl-2xl"></th>
                              
                                <th>EMAIL</th>
                                
                                <th> Title</th>
                                <th>Likes</th>
                                <th>Review</th>
                                <th>Actions</th>
                                <th className="rounded-tr-2xl"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {comment.map((requested, index) => (
                                <tr key={requested._id}>
                                    <th>{index + 1}</th>
                                  
                                    <td>{requested.email}</td>
                                    
                                    <td>{requested.title}</td>
                                    <td>{requested.likes}</td>
                                    <td>{requested.comment}</td>
                                    <th>
                                        <button onClick={() => handleEdit(requested._id)} className="mx-2">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(requested._id)} className="mx-2">
                                            <FaTrashAlt />
                                        </button>
                                        <button className="">
                                            <Link to={`/meal/${requested.mealId}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
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

export default MYReviews;
