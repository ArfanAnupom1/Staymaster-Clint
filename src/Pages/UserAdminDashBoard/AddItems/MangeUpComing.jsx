import Swal from "sweetalert2";
import { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaUtensils } from "react-icons/fa";
import UseComing from "../../../Hooks/UseComing";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { AuthContext } from "../../providers/AuthProvider";

const image_Hosting = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting}`;

const ManageUpComing = () => {
    const { user } = useContext(AuthContext);
    const [meals, , refetch] = UseComing();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [publishing, setPublishing] = useState(false);
    const [publishedMeals, setPublishedMeals] = useState([]);
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        const fetchPublishedMeals = async () => {
            try {
                const response = await axiosSecure.get('/meals');
                setPublishedMeals(response.data);
            } catch (error) {
                console.error("Error fetching published meals:", error);
            }
        };

        fetchPublishedMeals();
    }, [axiosSecure]);

    const isPublished = (itemId) => {
        return publishedMeals.some(meal => meal.mealId === itemId);
    };

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
                const res = await axiosSecure.delete(`/UpComing/${item._id}`);
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

    const handlePublishItem = (item) => {
        if (isPublished(item._id)) {
            Swal.fire({
                icon: "info",
                title: "Already Published",
                text: "This item is already published."
            });
        } else {
            Swal.fire({
                title: 'Publish Item',
                html: `
                    <div class="relative w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
                        <img src="${item.image}" alt="${item.title}" class="object-cover w-full h-48" />
                        <div class="p-4">
                            <h2 class="text-lg font-bold">${item.title}</h2>
                            <p class="text-sm text-gray-600">${item.category}</p>
                            <div class="flex justify-between mt-2">
                                <span class="badge badge-outline">${item.rating}★</span>
                                <span class="badge badge-outline">Price: ${item.price} BDT</span>
                                <span class="badge badge-outline">Likes: ${item.likes}</span>
                            </div>
                        </div>
                    </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Publish',
                cancelButtonText: 'Cancel'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    setPublishing(true);
                    try {
                        const { _id, ...itemWithoutId } = item;
                        const itemWithMealId = { ...itemWithoutId, mealId: _id };

                        const res = await axiosSecure.post(`/meals`, itemWithMealId);

                        if (res.status === 200) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${item.title} Published Successfully`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch();
                            setPublishedMeals([...publishedMeals, itemWithMealId]);
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!"
                            });
                        }
                    } catch (error) {
                        console.error("Error publishing item:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!"
                        });
                    } finally {
                        setPublishing(false);
                    }
                }
            });
        }
    };

    const currentTime = new Date().toISOString();
    const onSubmit = async (data) => {
        console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_Hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });

        if (res.data.success) {
            const mealsItem = {
                title: data.title,
                category: data.category,
                price: parseFloat(data.price),
                rating: data.rating,
                ingredients: data.ingredients,
                image: res.data.data.display_url,
                admin_name: user.email,
                description: data.description,
                likes: 0,
                post_time: currentTime,
            };

            const mealsRes = await axiosSecure.post('/UpComing', mealsItem);
            console.log(mealsRes.data);
            if (mealsRes.data.insertedId) {
                reset();
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} has been added in the Upcoming Items List`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
    };

    return (
        <div>
            <SectionTitle heading="---Hurry Up!---" subHeading="MANAGE ALL Upcoming ITEMS"></SectionTitle>
            <div className="bg-white m-10 p-10">
                <div className="font-bold my-4">
                    <h2 className="text-3xl">TOTAL ITEMS: {meals.length}</h2>
                </div>
                <div className="mb-4">
                    <button
                        className="btn btn-primary"
                        onClick={() => document.getElementById('addItemModal').showModal()}
                    >
                        ADD UPCOMING MEAL <FaUtensils className="ml-2" />
                    </button>
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
                                <th className="rounded-tr-2xl">delete</th>
                                <th>Publish</th>
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
                                    <th>
                                        <Link to={`/dashboard/updateComingItem/${item._id}`}>
                                            <button className="btn btn-ghost btn-xs">
                                                <FaEdit className="text-red-600 text-xl" />
                                            </button>
                                        </Link>
                                    </th>
                                    <th>
                                        <button onClick={() => handleDeleteItem(item)} className="btn btn-ghost btn-xs">
                                            <FaTrashAlt className="text-red-600 text-xl" />
                                        </button>
                                    </th>
                                    <th>
                                        {isPublished(item._id) ? (
                                            <span className="text-green-600 font-bold">Published</span>
                                        ) : (
                                            <button
                                                onClick={() => handlePublishItem(item)}
                                                className={`btn btn-ghost btn-xs ${publishing ? "cursor-not-allowed" : ""}`}
                                                disabled={publishing}
                                            >
                                                {publishing ? "Publishing..." : "Publish"}
                                            </button>
                                        )}
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Upcoming Meal Modal */}
            <dialog id="addItemModal" className="modal">
                <form method="dialog" className="modal-box" onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="font-bold text-lg">Add New Upcoming Meal</h3>
                    <div>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Title*</span>
                            </div>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                placeholder="title"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-1/2 px-2">
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Category</span>
                                </label>
                                <select defaultValue='default' {...register('category', { required: true })}
                                    className="select select-bordered w-full">
                                    <option disabled value='default'>Select a category</option>
                                    <option value="Breakfast">Breakfast</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Dinner">Dinner</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Price*</span>
                                </label>
                                <input
                                    {...register('price', { required: true })}
                                    type="number"
                                    placeholder="Price"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap w-full">
                        <div className="w-full md:w-1/2 px-2">
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Description*</span>
                                </label>
                                <input
                                    {...register('description', { required: true })}
                                    type="text"
                                    placeholder="description"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 px-2">
                            <div className="form-control w-full my-6">
                                <label className="label">
                                    <span className="label-text">Rating*</span>
                                </label>
                                <input
                                    {...register('rating', { required: true })}
                                    type="number"
                                    placeholder="rating"
                                    className="input input-bordered w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="form-control">
                            <div className="label">
                                <span className="label-text">Ingredients</span>
                            </div>
                            <textarea
                                {...register('ingredients', { required: true })}
                                className="textarea textarea-bordered h-24"
                                placeholder="ingredients"
                            ></textarea>
                        </label>
                    </div>
                    <div className="mt-6 mb-6">
                        <input
                            {...register('image', { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs"
                        />
                    </div>
                    <div className="modal-action">
                        <button className="btn btn-primary" type="submit">ADD ITEMS <FaUtensils /></button>
                        <button className="btn" onClick={() => document.getElementById('addItemModal').close()}>Cancel</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default ManageUpComing;
