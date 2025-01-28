import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useDonation from './useDonation';

const useDonationByPetName = () => {
    const axiosSecure = useAxiosSecure();
    const {donation}=useDonation();
    
    
    const { refetch, data: pet = [] } = useQuery({
        queryKey: ['pet'],
        queryFn: async () => {
            
            // Make sure we're using the exact field name as in MongoDB
            const res = await axiosSecure.get(`/petName?petName=${donation.petName}`);
            return res.data;
        },
       
    });

    return [pet, refetch];
};

export default useDonationByPetName;