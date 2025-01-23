import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRequest = () => {
    const axiosSecure=useAxiosSecure();
    const {refetch,data:request=[]} =useQuery({
        queryKey:['request'],
        queryFn: async()=>{
            const res =await axiosSecure.get("/request");
            return res.data;
        }
    })
    return [request,refetch];
};

export default useRequest;