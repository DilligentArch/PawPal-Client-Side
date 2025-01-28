import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useDonation = () => {
    const axiosSecure = useAxiosSecure(); // Corrected variable name
    const { refetch, data: donation = [] } = useQuery({
        queryKey: ['donation'],
        queryFn: async () => {
            const res = await axiosSecure.get("/donation");
            console.log(res.data);
            return res.data;
        },
    });

    return { donation, refetch }; 
};

export default useDonation;