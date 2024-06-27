
import Banner from "../Banner/Banner";

import Meals from "../Meals/Meals";
import { Helmet } from 'react-helmet-async';
import Package from "../Pakage/Package";
import Contact from "../Contact";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import NewsletterSubscription from "../News";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    StayMaster | Home
                </title>
            </Helmet>
            <Banner></Banner>
            <Meals></Meals>
            <Package></Package>
            <SectionTitle heading='---Contact Us---' subHeading='send us mail'></SectionTitle>
            <Contact></Contact>
            <NewsletterSubscription></NewsletterSubscription>


        </div>
    );
};

export default Home;