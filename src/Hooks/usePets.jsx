import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";


const usePets = () => {
    const axiosSecure=useAxiosSecure();
    const {refetch,data:pet=[]} =useQuery({
        queryKey:['pet'],
        queryFn: async()=>{
            const res =await axiosSecure.get("/pets");
            return res.data;
        }
    })
    return [pet]
};

export default usePets;