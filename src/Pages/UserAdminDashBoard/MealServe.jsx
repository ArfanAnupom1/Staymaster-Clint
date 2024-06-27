import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRequestMeals from "../../Hooks/useRequestMeals";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { FaTrashAlt } from "react-icons/fa";

const MealServe = () => {
    const [requestedMeal, loading, refetch] = useRequestMeals();
    const axiosSecure = useAxiosSecure();

    const handleServe = requested => {
        axiosSecure.patch(`/requestedMeal/${requested._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${requested.title} is served Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    const handleDeleteUser = requested => {
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
                axiosSecure.delete(`/requestedMeal/${requested._id}`)
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <SectionTitle heading='---How many??---' subHeading='MANAGE ALL REQUEST'></SectionTitle>
            <div className="bg-white md:m-10 md:p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL Requests: {requestedMeal.length}</h2>
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
                                    <td className={requested.status === 'Served' ? 'text-green-500' : ''}>
                                        {requested.status === 'Served' ? 'Served' : (
                                            <button onClick={() => handleServe(requested)} className="btn bg-[#D1A054] btn-xs">
                                                <span>{requested.status}</span>
                                            </button>
                                        )}
                                    </td>
                                    <th>
                                        <button onClick={() => handleDeleteUser(requested)} className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-600 text-xl" />
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

export default MealServe;
