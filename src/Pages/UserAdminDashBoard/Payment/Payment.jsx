import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { loadStripe } from "@stripe/stripe-js";
import ChackOut from "./ChackOut";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = () => {
    const { id } = useParams();
    const { data: packages, isLoading: mealLoading, error: mealError } = useQuery({
        queryFn: () => fetch(`https://hostel-server-seven.vercel.app/package/${id}`).then(res => res.json()),
        queryKey: ["packages", id]
    });

    if (mealLoading) return <div>Loading...</div>;
    if (mealError) return <div>Error: {mealError.message}</div>;
    if (!packages) return null; // Or handle the case when packages is undefined

    return (
        <div>
            <SectionTitle heading="---What's new?---" subHeading="Pay here"></SectionTitle>
            <div>
                <div>

                    <Elements stripe={stripePromise} >
                        <ChackOut packages={packages}></ChackOut>
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
