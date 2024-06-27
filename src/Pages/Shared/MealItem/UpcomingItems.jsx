import React from "react";
import { Link } from "react-router-dom";

const UpcomingItems = ({ item }) => {
    const { _id, title, category, price, rating, image, likes } = item;
    return (
        <div>
            <div className="relative w-96 bg-base-100 shadow-xl overflow-hidden rounded-2xl">
                <div className="group overflow-hidden">
                    <figure className="w-full h-48 overflow-hidden">
                        <img src={image} alt="Shoes" className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110" />
                    </figure>
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-100">

                    </div>
                </div>
                <div className="px-4 py-2">
                    <h2 className="text-lg font-bold">{title}</h2>
                    <p className="text-sm">{category}</p>
                    <div className="flex justify-between mt-2">
                        <div className="badge badge-outline">{rating}*</div>
                        <div className="badge badge-outline">Price :  {price}bdt</div>
                        <div className="badge badge-outline">Likes :  {likes}</div>

                    </div>
                </div>

            </div>
            <div className="flex justify-center mt-3">
                <Link to={`/UpComing/${_id}`}><button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    View Details
                </button></Link>
            </div>
        </div>
    );
};

export default UpcomingItems;
