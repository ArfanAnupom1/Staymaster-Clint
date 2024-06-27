import React, { useState, useEffect } from 'react';
import useMeals from '../../Hooks/useMeals';
import MealItem from '../Shared/MealItem/MealItem';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import UpcomingItems from '../Shared/MealItem/UpcomingItems';

const AllMeals = () => {
    const [meals, loading] = useMeals();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredMeals, setFilteredMeals] = useState([]);
    const [upcomingMeals, setUpcomingMeals] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const { data: upcomingData, isLoading: upcomingLoading, error: upcomingError, refetch: refetchUpcoming } = useQuery({
        queryFn: () => fetch('https://hostel-server-seven.vercel.app/upcoming').then(res => res.json()),
        queryKey: "upcoming"
    });

    useEffect(() => {
        setFilteredMeals(meals);
    }, [meals]);

    useEffect(() => {
        if (upcomingData) {
            setUpcomingMeals(upcomingData);
        }
    }, [upcomingData]);

    const filterMeals = (query) => {
        const filtered = meals.filter(meal =>
            meal.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMeals(filtered);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterMeals(event.target.value);
    };

    const loadMoreMeals = () => {
        setTimeout(() => {
            setPage(page + 1);
            setFilteredMeals(prevMeals => [...prevMeals, ...meals.slice((page - 1) * 10, page * 10)]);
        }, 1000);
    };

    return (
        <div>
            <div className="hero h-[500px]" style={{ backgroundImage: 'url(https://i.ibb.co/5sbqPC1/istockphoto-1065524226-1024x1024.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-lg">
                        <h1 className="mb-5 text-5xl font-bold">Enjoy Your meals StayMaster</h1>
                        <p className="mb-5">
                            StayMaster is your all-in-one solution for efficient hostel management. Our platform simplifies booking, billing, and resident communication, allowing you to focus on providing a welcoming and comfortable environment for your guests.
                        </p>
                        <div className="mb-5">
                            <input
                                type="text"
                                className="input input-bordered w-full max-w-xs text-black"
                                placeholder="Search Your favorite meal"
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

                <h2 className="text-3xl font-bold my-8">All Meals</h2>
                <InfiniteScroll
                    dataLength={filteredMeals.length}
                    next={loadMoreMeals}
                    hasMore={hasMore}
                    loader={<h4 className='text-center font-bold my-4'>Loading...</h4>}
                    endMessage={<p>No more meals to load</p>}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {upcomingMeals.filter(item => item.likes >= 10).map(upItem => <UpcomingItems key={upItem.id} item={upItem} />)}
                        {filteredMeals.map(item => <MealItem key={item.id} item={item} />)}
                    </div>

                </InfiniteScroll>
            </div>
        </div>
    );
};

export default AllMeals;
