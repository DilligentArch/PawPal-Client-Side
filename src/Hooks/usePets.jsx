import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";


const usePets = () => {
    const axiosPublic=useAxiosPublic();
    const {refetch,data:pet=[]} =useQuery({
        queryKey:['pet'],
        queryFn: async()=>{
            const res =await axiosPublic.get("/pets");
            return res.data;
        }
    })
    return [pet]
};

export default usePets;