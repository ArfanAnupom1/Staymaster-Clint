import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";


const SocialLogin = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const { googleSignIn } = useContext(AuthContext);
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user)
                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    role: 'bronze'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }
    return (
        <div className="form-control mt-4">
            <div className="divider"></div>
            <button onClick={handleGoogleSignIn} className="btn text-black rounded-2xl p-2 mb-10 w-full btn-primary bg-green-500 border-green-500"   >
                <div className="flex items-center ">
                    <div className="mr-4">
                        <FaGoogle />
                    </div>
                    <div>
                        Login With Google
                    </div>
                </div>
            </button>
        </div>
    );
};

export default SocialLogin;