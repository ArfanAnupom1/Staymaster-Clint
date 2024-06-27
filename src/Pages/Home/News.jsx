import Swal from 'sweetalert2';

const NewsletterSubscription = () => {
    const handleSubscribe = () => {
        // Show toast message for successful subscription
        Swal.fire({
            title: 'Subscribed!',
            text: 'Thank you for subscribing to our newsletter.',
            icon: 'success',
            confirmButtonText: 'OK'
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Subscribe to our Newsletter</h2>
            <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
                <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="email" placeholder="Enter your email address" />
                <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" onClick={handleSubscribe}>Subscribe</button>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
