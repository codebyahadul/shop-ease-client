const Card = () => {
    return (
        <div className="space-y-4 rounded-lg bg-white p-6 shadow-lg max-w-[300px]">
            <div>
                <img className="rounded-lg object-cover" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="card navigate ui" />
            </div>
            <div className="grid gap-2">
                <h1 className="text-lg font-semibold ">Product Name</h1>
                <p className="text-xs text-gray-500">This is a brief description of the product. It highlights the key features and benefits.</p>
                <div className="text-lg font-semibold">
                    Price: $99.99
                    
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