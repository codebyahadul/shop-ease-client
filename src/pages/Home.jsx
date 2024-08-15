import { useState } from "react";
import Card from "../components/shared/Card";
import FilterSidebar from "../components/FilterSidebar";

const Home = () => {
    return (
        <div className="px-2 my-5 md:my-8">
            <div className="text-center my-3 pb-5 flex">
                <input type="text" className="border-y border-l focus:outline-none px-2 md:px-5 py-1 md:py-2 bg-primary/30 font-semibold text-black rounded-s-md text-sm md:text-lg" placeholder="Search your product" />
                <button className="border-y rounded-r-md py-1 md:py-2 px-1 md:px-4 font-semibold text-black bg-secondary/40 hover:bg-secondary/80 text-sm md:text-lg">Search</button>
            </div>
            <div className=" flex gap-5 md:gap-10 p-5 border rounded-lg shadow-md">
                <FilterSidebar />
                <div>
                    <div className="flex flex-col md:flex-row justify-end gap-2 items-center mb-4 text-xs md:text-lg font-medium border-b pb-4">
                        <span >Sort By: </span>
                        <select className="border rounded-md font-normal">
                            <option value="default">Price</option>
                            <option value="low"> Price Low to High</option>
                            <option value="low"> Price High to Low</option>
                        </select>
                        <select className="border rounded-md font-normal">
                            <option value="default">Date Added</option>
                            <option value="low">Newest first</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center w-full">
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;