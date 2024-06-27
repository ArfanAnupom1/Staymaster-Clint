import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const ChackOut = ({ packages }) => {
    const { price, _id, name } = packages;
    const { user } = useContext(AuthContext);
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.post('/create-payment-intent', { price: price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
    }, [axiosSecure, price])

    const { data: users = [], isLoading: usersLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await useAxiosPublic.get('/users');
            return res.data;
        }
    })
    const filteredUsers = users.filter(u => u.email === user.email);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirm error:', confirmError);
            setError(confirmError.message);
        } else {
            console.log('payment intent:', paymentIntent);
            setError('');
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id ', paymentIntent.id)
                setTransactionId(paymentIntent.id);
                const payment = {
                    email: user.email,
                    price: price,
                    date: new Date(),
                    packageId: _id,
                    status: {name},
                    transactionId: paymentIntent.id
                }
                const res = await axiosSecure.post('/payment', payment);
                console.log('payment saved', res);
                if (res.data.insertedId) {

                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `payment is Successful`,
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
            }
        }
    }

    return (
        <form className="container mx-auto" onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button className="btn btn-primary px-8 mt-10" type="submit" disabled={!stripe}>
                Pay now
            </button>

            {price}
            <p className="text-red-400">{error}</p>
            {transactionId && <p className="bg-green-500 text-center font-bold rounded-2xl w-2/3 flex justify-center mx-auto mt-10">Your Transaction-Id :{transactionId}</p>}
        </form>
    );
};

export default ChackOut;
