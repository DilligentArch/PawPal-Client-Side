import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import usePets from './usePets';

const usePetDetails = (id) => {
    const axiosSecure = useAxiosSecure();
    
    const { refetch, data: petDetails = [] } = useQuery({
        queryKey: ['pet_details', id],
        enabled: !!id,
        queryFn: async () => {
            const res = await axiosSecure.get(`/pet-details/${id}`);
            return res.data;
        }
    });
    return [petDetails, refetch];
};

export default usePetDetails;