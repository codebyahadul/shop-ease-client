/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const Card = ({ product }) => {
    const { productName, productImage, description, price, category, creationDateTime, ratings, brandName } = product;
    return (
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg max-w-[300px] cursor-pointer">
            <div>
                <img className="rounded-lg object-cover w-[250px] h-[230px] hover:scale-105 transition-all duration-300" src={productImage} alt="card navigate ui" />
            </div>
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h1 className="text-sm font-semibold ">{productName}</h1>
                    <h1 className="text-sm font-semibold ">{category}</h1>
                </div>
                <p className="text-xs text-gray-500">{description.slice(0, 100)}</p>
                <div className="text-sm font-semibold flex justify-between items-center">
                    <p>Price: ${price}</p>
                    <p>Ratings: {ratings}</p>
                </div>
            </div>
            <div className="flex gap-4 text-xs">
                <button className="rounded-lg bg-slate-800 px-3 py-2 font-semibold text-white duration-300">Add to Cart</button>
                <button className="rounded-md border border-black px-4 py-2  duration-300 hover:bg-gray-200">View Details</button>
            </div>
        </div>
    );
};

export default Card;