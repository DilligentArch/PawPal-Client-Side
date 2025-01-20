import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useCampaign = () => {
    const axiosPublic = useAxiosPublic(); // Corrected variable name
    const { refetch, data: camp = [] } = useQuery({
        queryKey: ['campaign'],
        queryFn: async () => {
            const res = await axiosPublic.get("/campaign");
            return res.data;
        },
    });

    return { camp, refetch }; // Return both `camp` and `refetch` for reusability
};

export default useCampaign;
