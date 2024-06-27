
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import MealItem from "../../Shared/MealItem/MealItem";
import useMeals from "../../../Hooks/useMeals";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useState } from "react";
import { Link } from "react-router-dom";

const Meals = () => {
    const [tabIndex, setTabIndex] = useState(0)
    const [meals] = useMeals();
    
    const breakFast = meals.filter(item => item.category === 'Breakfast');
    const lunch = meals.filter(item => item.category === 'Lunch');
    const Dinner = meals.filter(item => item.category === 'Dinner');
    

    return (
        <section className="container mx-auto ">
            <SectionTitle heading='--hurry Up---' subHeading='Choose Your next meal'></SectionTitle>

            <div className="my-10">
                <Tabs defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                    <TabList className="flex justify-center mb-8">
                        <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md mr-2">All Meals</Tab>
                        <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md mr-2">Breakfast</Tab>
                        <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md mr-2">Lunch</Tab>
                        <Tab className="py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-md">Dinner</Tab>
                    </TabList>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {
                                meals.slice(0, 12).map(item => <MealItem key={item.id} item={item}></MealItem>)
                            }
                        </div>
                        <Link to='/allmeals'><div className="flex justify-center">
                            <button className="btn btn-outline px-8 mt-8">Show All</button>
                        </div></Link>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Render breakfast items */}
                            {breakFast.map(item => <MealItem key={item.id} item={item}></MealItem>)}

                            
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
                            {
                                lunch.map(item => <MealItem key={item.id} item={item}></MealItem>)
                            }

                        </div>
                    </TabPanel>
                    <TabPanel><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" >
                        {
                            Dinner.map(item => <MealItem key={item.id} item={item}></MealItem>)
                        }

                    </div></TabPanel>
                </Tabs>
            </div>



        </section>
    );
};

export default Meals;