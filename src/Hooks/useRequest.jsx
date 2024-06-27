import { useContext } from "react";
import { AuthContext } from "../Pages/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const useRequest = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const { refetch, data: request = [] } = useQuery({
        queryKey: ['request', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/requestedMeal?email=${user.email}`)
            return res.data;
        }
    })
    return [request, refetch]
};

export default useRequest;