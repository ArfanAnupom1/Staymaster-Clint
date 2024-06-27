import { useForm } from "react-hook-form";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../Shared/SectionTitle/SectionTitle";
import { FaEdit } from "react-icons/fa";

const image_Hosting = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_Hosting_api = `https://api.imgbb.com/1/upload?key=${image_Hosting}`;

const UpdateUpComing = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const { title, _id, category, price, ingredients, description, rating } = useLoaderData();

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
            // now send the menu with the image api link
            const mealItem = {
                title: data.title,
                category: data.category,
                rating: data.rating,
                price: parseFloat(data.price),
                description: data.description,
                ingredients: data.ingredients,
                name: data.name,
                image: res.data.data.display_url
            }
            // send the data to the menu database
            const mealRes = await axiosSecure.patch(`/UpComing/${_id}`, mealItem);
            console.log(mealRes.data);
            if (mealRes.data.modifiedCount > 0) {
                // show aleart
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.title}  is updated successfully`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        console.log('with image url', res.data);
    };
    return (
        <div>
            <SectionTitle heading='---Be CareFull---' subHeading='UPDATE ITEM'></SectionTitle>
            <div className="border bg-white md:p-10 md:m-10">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Title*</span>

                            </div>
                            <input
                                {...register('title', { required: true })}
                                defaultValue={title}
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
                                <select defaultValue={category} {...register('category', { required: true })}
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
                                    defaultValue={price}
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
                                    defaultValue={description}
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
                                    defaultValue={rating}
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
                                defaultValue={ingredients}
                                className="textarea textarea-bordered h-24" placeholder="ingredients"></textarea>

                        </label>
                    </div>
                    <div className="mt-6 mb-6">
                        <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>




                    <button className="btn"> Update the Item <FaEdit></FaEdit></button>
                </form>

            </div>
        </div>
    );
};

export default UpdateUpComing;