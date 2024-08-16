import Card from "../components/shared/Card";
import FilterSidebar from "../components/FilterSidebar";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
    const [toggle, setToggle] = useState(false)

    // pagination related
    const { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0)
    const [name, setName] = useState(null);
    const [sortField, setSortField] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const page = 10
    const numberOfPage = Math.ceil(count / page)
    const pageNumber = [...Array(numberOfPage).keys()]

    // pagination & sorting
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', currentPage, sortField, sortOrder],
        queryFn: async () => {
            const { data } = await axios.get(`http://localhost:5000/products?page=${currentPage}&size=${page}&sortField=${sortField}&sortOrder=${sortOrder}`);
            return data;
        }
    });

    // search products
    const { data: searchResults = [] } = useQuery({
        queryKey: ['search', name, currentPage, sortField, sortOrder],
        queryFn: async () => {
            if (!name) return [];
            const { data } = await axios.get(`http://localhost:5000/search?value=${name}`);
            return data.searchResult;
        },
        enabled: !!name,
    });

    const updateCurrentPage = (num) => {
        if ((num > (page - 1)) || (0 > num)) { return setCurrentPage(0) }
        setCurrentPage(num)
    }

    // search 
    const handleSearch = e => {
        e.preventDefault();
        const name = e.target.name.value;
        if (!name) {
            return toast.error("Please write the product name");
        }
        setName(name);
        setCurrentPage(0);
        refetch();
    };

    if (isLoading) {
        return <div>loading</div>
    }
    return (
        <div className="px-2 my-5 md:my-8">
            <form onSubmit={handleSearch} className="text-center my-3 pb-5 flex">
                <input type="text" name="name" className="border-y border-l focus:outline-none px-2 md:px-5 py-1 md:py-2 bg-gray-200 font-semibold text-black rounded-s-md text-sm md:text-lg" placeholder="Search your product" />
                <button type="submit" className="border-y rounded-r-md py-1 md:py-2 px-1 md:px-4 font-semibold text-black bg-gray-400/40 hover:bg-secondary/80 text-sm md:text-lg">Search</button>
            </form>
            <div className=" flex flex-col md:flex-row gap-5 md:gap-10 p-5 border rounded-lg shadow-md">
                <FilterSidebar toggle={toggle} />
                <div className="block md:hidden">
                    <h1 onClick={() => setToggle(!toggle)}>Filter</h1>
                </div>
                <div>
                    <div className="flex flex-col md:flex-row justify-end gap-2 items-center mb-4 text-xs md:text-lg font-medium border-b pb-4">
                        <span>Sort By: </span>
                        <select
                            className="border rounded-md font-normal"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'low') {
                                    setSortField('price');
                                    setSortOrder('asc');
                                } else if (value === 'high') {
                                    setSortField('price');
                                    setSortOrder('desc');
                                }
                                // setCurrentPage(0);
                                refetch();
                            }}
                        >
                            <option value="default">Price</option>
                            <option value="low">Price Low to High</option>
                            <option value="high">Price High to Low</option>
                        </select>
                        <select
                            className="border rounded-md font-normal"
                            onChange={(e) => {
                                const value = e.target.value;
                                if (value === 'newest') {
                                    setSortField('createdAt');
                                    setSortOrder('desc');
                                } else {
                                    setSortField('createdAt');
                                    setSortOrder('asc');
                                }
                                // setCurrentPage(0);
                                refetch();
                            }}
                        >
                            <option value="default">Date Added</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center w-full">
                        {!searchResults.length && products.map((product) => <Card key={product._id} product={product} />)}
                        {searchResults.map((product) => <Card key={product._id} product={product} />)}
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center px-5">
                <div className='flex justify-center items-center gap-5 bg-gray-200 text-black p-2 shadow-lg rounded-md mx-auto select-none my-5'>
                    {/* left arrow */}
                    <div onClick={() => { updateCurrentPage(currentPage - 1) }} className='text-[12px] cursor-pointer font-semibold px-1 py-1'>
                        PREV
                    </div>
                    <div className='flex justify-center items-center gap-2 '>
                        {pageNumber.map((item, ind) => <div key={item} onClick={() => { setCurrentPage(item) }} className={`cursor-pointer hover:scale-110  border-b-2  text-sm scale-100 transition-all duration-200 px-3 ${currentPage === item ? 'border-sky-300' : 'border-white'}   font-semibold text-gray-700   py-[6px] `} >
                            {item + 1}
                        </div>)}
                    </div>
                    {/* right arrow */}
                    <div onClick={() => { updateCurrentPage(currentPage + 1) }} className='text-[12px] cursor-pointer font-semibold px-1 py-1'>
                        NEXT
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;