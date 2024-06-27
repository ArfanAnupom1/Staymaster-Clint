import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Pages/providers/AuthProvider";

const useHistory = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);

    const { data: payment = [], isLoading: loading, refetch } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                return [];
            }
            const res = await axiosPublic.get(`/payments`, {
                params: { email: user.email }
            });
            return res.data.filter(meal => meal.email === user.email);
        },
        enabled: !!user?.email,
    });

    return [payment, loading, refetch];
};

export default useHistory;
