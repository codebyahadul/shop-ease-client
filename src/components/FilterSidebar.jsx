/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FilterSidebar = ({ toggle, setFilterUrl, filterReload, searchReload }) => {
    const [showBrandName, setShowBrandName] = useState(false)
    const [showCategoryName, setShowCategoryName] = useState(false)

    const handleFilter = async (e) => {
        filterReload()
        searchReload()
        e.preventDefault();

        const form = e.target;

        // Get the selected brand names
        const brandNames = Array.from(form.brandName)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);

        // Get the price range
        const lowPrice = form.low.value;
        const highPrice = form.high.value;

        // Get the selected category names
        const categoryNames = Array.from(form.categoryName)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.id);
        fetchProducts(brandNames, lowPrice, highPrice, categoryNames);
    };

    const fetchProducts = (brandNames, lowPrice, highPrice, categoryNames) => {
        const params = new URLSearchParams();
        if (brandNames.length > 0) params.append('brandNames', brandNames.join(','));
        if (categoryNames.length > 0) params.append('categoryNames', categoryNames.join(','));
        if (lowPrice) params.append('lowPrice', lowPrice);
        if (highPrice) params.append('highPrice', highPrice);
        // fetch(`/products/filter?${params.toString()}`)
        return setFilterUrl(params);
    };
    return (
        <div className={`min-w-48 ${toggle ? 'block' : 'hidden'} md:block space-y-2 text-center overflow-y-auto z-40`}>
            <form onSubmit={handleFilter} className="w-full rounded-sm pt-2 text-sm md:text-lg">
                {/* Brand Name */}
                <div className="flex bg-gray-100 items-center justify-between border-b pb-2 p-1">
                    <h3 className="text-lg font-medium">Brand Name: </h3>
                    <div onClick={() => setShowBrandName(!showBrandName)}>
                        {
                            showBrandName ? <IoIosArrowUp size={20} className="cursor-pointer" /> : <IoIosArrowDown size={20} className="cursor-pointer" />
                        }
                    </div>
                </div>
                <div className={`bg-gray-100 min-h-20 ${showBrandName ? 'block' : 'hidden'} mb-3`}>
                    <div className="text-start pl-3 space-y-2 flex flex-col gap-2">
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="brandName" id="Havit" />
                            <label htmlFor="Havit">Havit</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="brandName" id="HP" />
                            <label htmlFor="HP">HP</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="brandName" id="Dell" />
                            <label htmlFor="Dell">Dell</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="brandName" id="Corsair" />
                            <label htmlFor="Corsair">Corsair</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="brandName" id="Montac" />
                            <label htmlFor="Montac">Montac</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="brandName" id="Bengal" />
                            <label htmlFor="Bengal">Bengal</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="brandName" id="Walton" />
                            <label htmlFor="Walton">Walton</label>
                        </div>
                    </div>
                </div>
                {/* Price Range */}
                <div className="bg-gray-100 border-b pb-2 p-1 my-3">
                    <h1 className="text-lg font-medium text-start">Price Range: </h1>
                    <div className="flex justify-between my-2">
                        <div className="flex flex-col">
                            <input type="number" name="low" min={0} defaultValue={0} className="border max-w-20 p-1 text-sm font-medium rounded-md" />
                            <label className="text-sm font-medium">Low</label>
                        </div>
                        <div className="flex flex-col">
                            <input type="number" name="high" max={100000} defaultValue={100000} className="border max-w-20 p-1 text-sm font-medium rounded-md" />
                            <label className="text-sm font-medium">High</label>
                        </div>
                    </div>
                </div>
                {/* Category Name */}
                <div className="flex bg-gray-100 items-center justify-between border-b pb-2 px-1 mt-4 p-1">
                    <h3 className="text-lg font-medium">Category Name: </h3>
                    <div onClick={() => setShowCategoryName(!showCategoryName)}>
                        {
                            showCategoryName ? <IoIosArrowUp size={20} className="cursor-pointer" /> : <IoIosArrowDown size={20} className="cursor-pointer" />
                        }
                    </div>
                </div>
                <div className={`bg-gray-100 min-h-20 ${showCategoryName ? 'block' : 'hidden'}`}>
                    <div className="text-start pl-3 space-y-2 flex flex-col gap-2">
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="categoryName" id="Electronics" />
                            <label htmlFor="Electronics">Electronics</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="categoryName" id="Accessories" />
                            <label htmlFor="Accessories">Accessories</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="categoryName" id="Home & Office" />
                            <label htmlFor="Home & Office">Home & Office</label>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                            <input type="checkbox" name="categoryName" id="Wearables" />
                            <label htmlFor="Wearables">Wearables</label>
                        </div>
                    </div>
                </div>
                <div className="my-3">
                    <button type="submit" className="border w-full py-1 rounded-sm bg-primary/80 text-lg font-semibold text-black">Filter</button>
                </div>
            </form>
        </div>
    );
};

export default FilterSidebar;
