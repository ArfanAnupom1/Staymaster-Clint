import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const UseComing = () => {
    const axiosPublic = useAxiosPublic();


    const { data: menu = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['UpComing'],
        queryFn: async () => {
            const res = await axiosPublic.get('/UpComing');
            return res.data;
        }
    })
    return [menu, loading, refetch]
};

export default UseComing;