import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Pages/providers/AuthProvider"; 

const useReviews = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data: comment = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['comment', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            const res = await axiosPublic.get(`/comment`, {
                params: { email: user.email }
            });
            return res.data.filter(meal => meal.email === user.email);
        },
        enabled: !!user?.email, 
    });

    return [comment, loading, refetch];
};

export default useReviews;
