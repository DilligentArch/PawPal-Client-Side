import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const usePetAddBy = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    
    const { refetch, data: pet = [] } = useQuery({
        queryKey: ['pet', user?.email],
        queryFn: async () => {
            if (!user?.email) {
                throw new Error('User email not found');
            }
            // Make sure we're using the exact field name as in MongoDB
            const res = await axiosSecure.get(`/addBy?addedBy=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email
    });

    return [pet, refetch];
};

export default usePetAddBy;