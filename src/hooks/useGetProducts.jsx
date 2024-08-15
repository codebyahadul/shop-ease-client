import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useGetProducts = () => {
    const { data: products = [], refetch } = useQuery({
        queryKey: ['products'],
        queryFn: async() => {
            const {data} = await axios.get('http://localhost:5000/products')
            return data
        }
    })
    return [products, refetch];
};

export default useGetProducts;