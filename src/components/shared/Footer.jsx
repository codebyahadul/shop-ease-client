import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-200">
            <div className="max-w-7xl mx-auto py-5 md:py-8 lg:py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-center items-center *:flex *:flex-col *:mx-auto border-b border-b-white border-t-2">
                <div className="text-center space-y-5">
                    <h3 className="text-xl md:text-2xl lg:text-3xl text-primary font-bold text-opacity-100 ">Shop<span className="text-secondary">Ease</span></h3>
                    <div>
                        <p className="text-xs md:text-sm font-semibold text-opacity-80">
                            123 Dhanmondi , Dhanmondi City, Dhaka
                            Phone: +123-456-7890
                            Email: info@servenest.com</p>
                        <div className="flex items-center justify-center mt-3 gap-3">
                            <FaFacebook size={25} className="hover:text-primary cursor-pointer" />
                            <FaInstagram size={25} className="hover:text-rose-400 cursor-pointer" />
                            <FaLinkedinIn size={25} className="hover:text-primary cursor-pointer" />
                        </div>
                    </div>
                </div>
                <div>
                    <h6 className="mb-5 uppercase text-lg font-bold text-opacity-80">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <h6 className="mb-5 uppercase text-lg font-bold text-opacity-80">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </div>
                <div>
                    <h6 className="mb-5 uppercase text-lg font-bold text-opacity-80">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </div>
            </div>
            <div className=" text-center py-2 bg-gray-400">
                <aside>
                    <p className="text-sm">Copyright © 2024 - All right reserved by ShopEasy</p>
                </aside>
            </div>
        </footer>
    );
};

export default Footer;