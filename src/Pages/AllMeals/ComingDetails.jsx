import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";

const ComingDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    const { data: UpComing, isLoading: mealLoading, error: mealError, refetch: refetchMeal } = useQuery({
        queryFn: () => fetch(`https://hostel-server-seven.vercel.app/UpComing/${id}`).then(res => res.json()),
        queryKey: ["UpComing", id]
    });

    const { data: comments, isLoading: commentsLoading, error: commentsError, refetch: refetchComments } = useQuery({
        queryFn: () => fetch('https://hostel-server-seven.vercel.app/comment').then(res => res.json()),
        queryKey: ["comments"]
    });

    if (mealLoading || commentsLoading) return <div>Loading...</div>;
    if (mealError) return <div>Error loading meal details.</div>;
    if (commentsError) return <div>Error loading comments.</div>;
    if (!UpComing) return <div>No meal data found.</div>;

    const { _id, title, category, price, rating, image, description, likes } = UpComing;



    const handleLike = async (id) => {
        try {
            await axiosSecure.patch(`/UpComing/likes/${id}`);
            refetchMeal();
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    const onSubmit = async (data) => {
        if (!user || !user.email) {
            Swal.fire({
                title: "You are not Logged In",
                text: "Please Login to add comments",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
            return;
        }

        const comment = {
            mealId: _id,
            email: user.email,
            title: UpComing.title,
            comment: data.comment,
            userImage: user.photoURL,
            post_time: new Date().toISOString(),
            category: UpComing.category,
            price: UpComing.price,
            rating: UpComing.rating,
            likes: UpComing.likes,
            description: UpComing.description,
            image: UpComing.photoURL
        };
        const res = await axiosSecure.post('/comment', comment);
        if (res.data.insertedId) {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `Comment has been added to the comments list`,
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            refetchComments();
        }
    };

    return (
        <div className="container mx-auto p-4 flex justify-between">
            <div className="relative pt-20 pb-10 w-1/2 bg-base-100 shadow-xl overflow-hidden rounded-2xl mb-4">
                <figure className="w-full h-64 overflow-hidden">
                    <img src={image} alt={title} className="object-cover w-full h-full" />
                </figure>
                <div className="px-4 py-2">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-sm mb-2">{category}</p>
                    <div className="flex justify-between mt-2 mb-4">
                        <div className="badge badge-outline">{rating}*</div>
                        <div className="badge badge-outline">Price: {price} bdt</div>
                    </div>
                    <p>{description}</p>
                </div>
                <div className="flex justify-center gap-7">

                    <button className="btn btn-primary px-10" onClick={() => handleLike(_id)}>Like {likes}</button>
                </div>
            </div>
            <div className="flex-1 m-10">
                <div className="border p-6 my-10 rounded-2xl bg-blue-200 bg-opacity-50">
                    <p className="my-8 text-3xl text-center font-semibold underline">Give Your reviews</p>
                    <div className="flex items-center space-x-4 border border-black rounded-2xl p-4 mt-10">
                        <div>
                            {user?.photoURL ? (
                                <img src={user.photoURL} alt="User" className="w-12 h-12 rounded-full" />
                            ) : (
                                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="Default User" className="w-12 h-12 rounded-full" />
                            )}
                        </div>
                        <div className="flex-1">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1 className="text-xl font-semibold">{user?.email}</h1>
                                <div className="mt-2">
                                    <label className="block">
                                        <span className="text-gray-700 font-bold text-3xl">Add Your Comments here:</span>
                                        <input {...register("comment")} type="text" name="comment" placeholder="Write your comments here" className="form-input mt-1 h-12 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                                    </label>
                                    <div className="flex justify-center">
                                        <button className="mt-4 border w-1/2 bg-purple-500 p-2 rounded-2xl text-white font-bold transition duration-300 ease-in-out hover:bg-blue-600" type="submit">Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-8">
                        {Array.isArray(comments) && comments.length > 0 ? (
                            comments
                                .filter(comment => comment.mealId === _id)
                                .sort((a, b) => new Date(b.post_time) - new Date(a.post_time))
                                .map(comment => (
                                    <div key={comment._id} className="flex items-center space-x-4 border rounded-2xl p-4 mt-4">
                                        <div>
                                            {comment.userImage ? (
                                                <img src={comment.userImage} alt="User" className="w-12 h-12 rounded-full" />
                                            ) : (
                                                <img src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" alt="Default User" className="w-12 h-12 rounded-full" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h1 className="text-xl font-semibold">{comment.email}</h1>
                                            <p>{comment.comment}</p>
                                            <p>{new Date(comment.post_time).toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))
                        ) : (
                            <div>No comments available.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComingDetails;
