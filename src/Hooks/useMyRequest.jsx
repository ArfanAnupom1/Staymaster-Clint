import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Pages/providers/AuthProvider"; 

const useMyRequest = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data: requestedMeal = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['requestedMeal', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            const res = await axiosPublic.get(`/requestedMeal`, {
                params: { email: user.email }
            });
            return res.data.filter(meal => meal.email === user.email);
        },
        enabled: !!user?.email, 
    });

    return [requestedMeal, loading, refetch];
};

export default useMyRequest;
