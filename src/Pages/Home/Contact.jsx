import Swal from 'sweetalert2';
import contact from '../../assets/contact.png';

const Contact = () => {
    const handleSubmit = (event) => {
        event.preventDefault();

        // Show SweetAlert alert
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Your message has been successfully sent.',
        });
    };

    return (
        <div className='flex md:flex-row flex-col mr-4 container mx-auto'>
            <div className='md:w-1/3 '>
                <form className="border border-[#003276] p-5  rounded-2xl space-y-3" onSubmit={handleSubmit}>
                    <h3 className="text-3xl font-poppins font-semibold text-center m-6">Send Email</h3>
                    <div className="space-y-1">
                        <p>Email Address</p>
                        <div className="input input-md outline-none input-bordered">
                            <input type="email" name="email" placeholder="Email Address" className="h-full border-none w-11/12 outline-none" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p>Your Message</p>
                        <textarea placeholder="Type Here..." className="textarea textarea-bordered textarea-lg w-full"></textarea>
                    </div>
                    <div>
                        <button type="submit" className="flex gap-2 justify-center items-center bg-[#003276] px-3 py-3 font-semibold rounded-md transition ease-in-out delay-150 text-white hover:scale-95 hover:bg-[#042656] duration-300 w-full">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path d="M20.13 5.41L18.72 4l-9.19 9.19-4.25-4.24-1.41 1.41 5.66 5.66zM5 18h14v2H5z"></path>
                            </svg>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            <div>
                <img src={contact} alt="" />
            </div>
        </div>
    );
};

export default Contact;
