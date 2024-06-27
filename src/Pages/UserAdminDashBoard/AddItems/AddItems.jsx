import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const image_Hosting = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting}`;

const AddItems = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const currentTime = new Date().toISOString();
    const onSubmit = async (data) => {
        console.log(data)
        // upload the image in imagebb
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_Hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            // now send the meals with the image api link
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
            }
            // send the data to the meals database
            const mealsRes = await axiosSecure.post('/meals', mealsItem);
            console.log(mealsRes.data);
            if (mealsRes.data.insertedId) {
                // show aleart
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title} has been added in the meals List`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };
    return (
        <div>
            <SectionTitle heading="---What's new?---" subHeading="ADD AN UPCOMING ITEM"></SectionTitle>
            <div className="border bg-white p-10 m-10">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Title*</span>

                            </div>
                            <input
                                {...register('title', { required: true })}
                                type="text"
                                placeholder="title"
                                className="input input-bordered w-full " />

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
                                    className="input input-bordered w-full" />
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
                                    className="input input-bordered w-full" />
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
                                    className="input input-bordered w-full" />
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
                                className="textarea textarea-bordered h-24" placeholder="ingredients"></textarea>

                        </label>
                    </div>
                    <div className="mt-6 mb-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>




                    <button className="btn"> ADD ITEMS <FaUtensils></FaUtensils></button>
                </form>

            </div>
        </div>
    );
};

export default AddItems;