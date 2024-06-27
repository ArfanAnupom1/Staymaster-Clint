

const Banner = () => {


    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: 'url(https://i.ibb.co/5sbqPC1/istockphoto-1065524226-1024x1024.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-lg">
                    <h1 className="mb-5 text-5xl font-bold">Hi Welcome to StayMaster</h1>
                    <p className="mb-5">
                        StayMaster is your all-in-one solution for efficient hostel management. Our platform simplifies booking, billing, and resident communication, allowing you to focus on providing a welcoming and comfortable environment for your guests.
                    </p>
                    <div className="mb-5">
                        <input
                            type="text"
                            className="input input-bordered w-full max-w-xs"
                            placeholder="Search Your favorite meal"


                        />
                        <button
                            className="btn btn-primary ml-2"

                        >
                            Search
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Banner;
