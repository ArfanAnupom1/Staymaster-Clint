import { useEffect, useState } from "react";
import UseComing from "../../Hooks/UseComing";
import InfiniteScroll from "react-infinite-scroll-component";
import UpcomingItems from "../Shared/MealItem/UpcomingItems";



const UpComingMeals = () => {
    const [meals, loading] = UseComing();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    useEffect(() => {
        setFilteredMeals(meals.slice(0, 10));
    }, [meals]);

    const filterMeals = (query) => {
        const filtered = meals.filter(meal =>
            meal.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMeals(filtered.slice(0, 10));
        setPage(1);
        setHasMore(filtered.length > 10);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterMeals(event.target.value);
    };

    const loadMoreMeals = () => {
        const newPage = page + 1;
        const newMeals = meals.slice(0, newPage * 10);
        setFilteredMeals(newMeals);
        setPage(newPage);
        if (newMeals.length >= meals.length) {
            setHasMore(false);
        }
    };

    return (
        <div>
            <div className="hero h-[500px]" style={{ backgroundImage: 'url(https://i.ibb.co/5sbqPC1/istockphoto-1065524226-1024x1024.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Enjoy Your Meals at StayMaster</h1>
                        <p className="mb-5">
                            StayMaster is your all-in-one solution for efficient hostel management. Our platform simplifies booking, billing, and resident communication, allowing you to focus on providing a welcoming and comfortable environment for your guests.
                        </p>
                        <div className="mb-5">
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs text-black"
                                placeholder="Search Your Favorite Meal"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <button className="btn btn-primary ml-2" onClick={() => filterMeals(searchQuery)}>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container mx-auto my-8">
                <InfiniteScroll
                    dataLength={filteredMeals.length}
                    next={loadMoreMeals}
                    hasMore={hasMore}
                    loader={<h4 className='text-center font-bold my-4'>Loading...</h4>}
                    endMessage={<p className='text-center font-bold my-4'>No more meals to load</p>}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredMeals.map(item => <UpcomingItems key={item.id} item={item} />)}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
};

export default UpComingMeals;
