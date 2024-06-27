import { Link } from "react-router-dom";
import usePackage from "../../../Hooks/usePackage";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";


const Package = () => {

    const [packages, loading, refetch] = usePackage();


    return (
        <div>
            <SectionTitle heading="---What's new?---" subHeading="Buy A Package"></SectionTitle>
            <div className="flex flex-wrap justify-center">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    packages.map((pkg, index) => (
                        <div
                            key={index}
                            className="max-w-sm w-full rounded-lg overflow-hidden shadow-lg m-4 border border-gray-300 hover:bg-gray-100 transition duration-300 ease-in-out"
                        >
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{pkg.name}</div>
                                <p className="text-gray-700 text-base">
                                    Price: ${pkg.price}
                                </p>
                                <ul className="mt-2">
                                    {pkg.features.map((feature, index) => (
                                        <li key={index} className="text-sm text-gray-600">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="px-6 py-4">
                                <Link to={`/dashboard/payment/${pkg._id}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Buy Now
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Package;
