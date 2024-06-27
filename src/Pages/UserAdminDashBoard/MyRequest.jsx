import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useMyRequest from "../../Hooks/useMyRequest";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";

const MyRequest = () => {
    const [requestedMeal, loading, refetch] = useMyRequest(); // Ensure refetch is correctly destructured
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
                axiosSecure.delete(`/requestedmeal/${id}`)
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
                    <h2 className="text-3xl">TOTAL REQUESTS: {requestedMeal.length}</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead className="bg-[#D1A054] text-xl text-white">
                            <tr>
                                <th className="rounded-tl-2xl"></th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>Status</th>
                                <th className="rounded-tr-2xl">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestedMeal.map((requested, index) => (
                                <tr key={requested._id}>
                                    <th>{index + 1}</th>
                                    <td>{requested.title}</td>
                                    <td>{requested.email}</td>
                                    <td>{requested.status}</td>

                                    <th>
                                        <button onClick={() => handleDelete(requested._id)}>
                                            <FaTrashAlt />
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

export default MyRequest;
