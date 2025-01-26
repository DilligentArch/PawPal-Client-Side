import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";



const useAllPets = () => {
  const axiosSecure=useAxiosSecure();
    const {refetch,data:pet=[]} =useQuery({
        queryKey:['pet'],
        queryFn: async()=>{
            const res =await axiosSecure.get("/all-pets");
            return res.data;
        }
    })
    return [pet,refetch];
};

export default useAllPets;