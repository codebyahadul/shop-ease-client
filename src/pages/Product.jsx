import Card from "../components/shared/Card";
import FilterSidebar from "../components/FilterSidebar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../components/shared/Loading";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useLoaderData } from "react-router-dom";

const Product = () => {
    const [toggle, setToggle] = useState(false)
    // pagination related
    let { count } = useLoaderData();
    const [currentPage, setCurrentPage] = useState(0)
    const [name, setName] = useState(null);
    const [sortField, setSortField] = useState('price');
    const [sortOrder, setSortOrder] = useState('asc');
    const [filterUrl, setFilterUrl] = useState('')
    // every page number
    const page = 9

    // pagination & sorting
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', currentPage, sortField, sortOrder],
        queryFn: async () => {
            const { data } = await axios.get(`${import.meta.env.VITE_URL}/products?page=${currentPage}&size=${page}&sortField=${sortField}&sortOrder=${sortOrder}`);
            return data;
        }
    });

    // search products
    const { data: searchResults = [], isLoading: searchLoading, refetch: searchReload } = useQuery({
        queryKey: ['search', name, currentPage, sortField, sortOrder],
        queryFn: async () => {
            if (!name) return [];
            const { data } = await axios.get(`${import.meta.env.VITE_URL}/search?value=${name}&page=${currentPage}&size=${page}&sortField=${sortField}&sortOrder=${sortOrder}`);
            return data.searchResult;
        },
        enabled: !!name,
    });
    // filter products
    const { data: filterProducts = [], isLoading: filterLoading, refetch: filterReload } = useQuery({
        queryKey: ['search', filterUrl],
        queryFn: async () => {
            if (!filterUrl.toString()) return [];
            const { data } = await axios.get(`${import.meta.env.VITE_URL}/products/filter?${filterUrl.toString()}&page=${currentPage}&size=${page}&sortField=${sortField}&sortOrder=${sortOrder}`);
            return data;
        }
    });
    if(searchResults.length > 0){
        count = searchResults.length;
    }
    if(filterProducts.length > 0){
        count = filterProducts.length;
    }
    const numberOfPage = Math.ceil(count / page)
    const pageNumber = [...Array(numberOfPage).keys()]

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
        filterReload()
    };

    if (isLoading || searchLoading || filterLoading) {
        return <Loading />
    }
    return (
        <div className="px-2 my-5 md:my-8">
            <form onSubmit={handleSearch} className="text-center my-3 pb-5 flex">
                <input type="text" name="name" className="border-y border-l focus:outline-none px-2 md:px-5 py-1 md:py-2 bg-gray-200 font-semibold text-black rounded-s-md text-sm md:text-lg" placeholder="Search your product" />
                <button type="submit" className="border-y rounded-r-md py-1 md:py-2 px-1 md:px-4 font-semibold text-black bg-gray-400/40 hover:bg-primary/80 text-sm md:text-lg">Search</button>
            </form>
            <div className=" flex flex-col md:flex-row gap-5 md:gap-10 p-5 border rounded-lg shadow-md">
                {/* filter sidebar */}
                <FilterSidebar toggle={toggle} setFilterUrl={setFilterUrl} filterReload={filterReload} searchReload={searchReload} />
                <div className="block md:hidden">
                    <div onClick={() => setToggle(!toggle)}>{toggle ?<div className="flex items-center gap-2">
                       Hide Filter <IoIosArrowUp size={20} className="cursor-pointer" />
                    </div>  : 
                    <div className="flex items-center gap-2">
                        Show Filter<IoIosArrowDown size={20} className="cursor-pointer" />
                    </div>
                    }</div>
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
                                setCurrentPage(0);
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
                                setCurrentPage(0);
                                refetch();
                            }}
                        >
                            <option value="default">Date Added</option>
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center">
                        {/* show search result  */}
                        {(searchResults.length > 0 && filterProducts.length === 0) && searchResults.map((product) => (
                            <Card key={product._id} product={product} />
                        ))}
                        {/* show filter result */}
                        {(filterProducts.length > 0 && searchResults.length === 0) && filterProducts.map((product) => (
                            <Card key={product._id} product={product} />
                        ))}
                        {/* show product */}
                        {(searchResults.length === 0 && filterProducts.length === 0) && products.map((product) => (
                            <Card key={product._id} product={product} />
                        ))}
                        {/* show empty when no search result or filter result */}

                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center px-1 md:px-5 w-full">
                <div className='flex justify-center items-center gap-2 md:gap-5 bg-gray-200 text-black p-2 shadow-lg rounded-md mx-auto select-none my-5'>
                    {/* left arrow */}
                    <div onClick={() => { updateCurrentPage(currentPage - 1) }} className='text-xs cursor-pointer font-semibold px-1 py-1 w-fit'>
                        PREV
                    </div>
                    <div className='flex justify-center items-center gap-2 '>
                        {pageNumber.map((item) => <div key={item} onClick={() => { setCurrentPage(item) }} className={`cursor-pointer hover:scale-110 text-sm scale-100 transition-all duration-200 px-1 md:px-2 lg:px-3 hover:bg-primary ${currentPage === item ? ' bg-primary' : ''}   font-semibold text-gray-700   py-[6px] `} >
                            {item + 1}
                        </div>)}
                    </div>
                    {/* right arrow */}
                    <div onClick={() => { updateCurrentPage(currentPage + 1) }} className='text-xs cursor-pointer font-semibold px-1 py-1 w-fit'>
                        NEXT
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;