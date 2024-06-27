import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePackage = () => {
    const axiosPublic = useAxiosPublic();

    const { data: packages = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['package'],
        queryFn: async () => {
            const res = await axiosPublic.get('/package');
            return res.data;
        }
    });

    return [packages, loading, refetch];
};

export default usePackage;
