import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const useRequestMeals = () => {
    const axiosPublic = useAxiosPublic();


    const { data: requestedMeal = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['requestedMeal'],
        queryFn: async () => {
            const res = await axiosPublic.get('/requestedMeal');
            return res.data;
        }
    })
    return [requestedMeal, loading, refetch]
};

export default useRequestMeals;