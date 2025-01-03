import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";


export default function Footer() {

    return (
        <footer className="bg-[#969d9e] text-white py-8 rtl">
            <div className="max-w-screen-xl mx-auto px-4">
                {/* Flex container to hold sections */}
                <div className="flex flex-col sm:flex-row-reverse justify-between items-center">
                    {/* Company Info Section */}
                    <div className="flex flex-col items-center sm:items-center mb-6 sm:mb-0">
                        <Link to="/" className="pt-3">
                            <img src={logo} className="w-[180px]" />
                        </Link>
                        <div className="mt-4 text-white text-center sm:text-center">
                            <p>الهاتف</p>
                            <p>+966 555 360 417</p>
                            <p>البريد الإلكتروني</p>
                            <p>thmrtech@gmail.com</p>
                        </div>
                    </div>

                    {/* Social Media Links Section */}
                    <div className="flex space-x-6 mt-4 sm:mt-0 text-white">
                        <a href="#" className="hover:text-blue-500 transition duration-300">
                            <i className="fab fa-linkedin"></i> {/* Font Awesome icon for Facebook */}
                        </a>
                        <a href="#" className="hover:text-blue-500 transition duration-300">
                            <i className="fab fa-twitter"></i> {/* Font Awesome icon for Twitter */}
                        </a>
                        <a href="#" className="hover:text-pink-500 transition duration-300">
                            <i className="fab fa-instagram"></i> {/* Font Awesome icon for Instagram */}
                        </a>
                        <a href="#" className="hover:text-red-500 transition duration-300">
                            <i className="fab fa-youtube"></i> {/* Font Awesome icon for YouTube */}
                        </a>
                    </div>
                </div>

                {/* Additional Links Section (Optional) */}
                <div className="mt-6 border-t border-black pt-4 text-center">
                    <p className="text-white text-sm">
                        &copy; {new Date().getFullYear()} جميع الحقوق محفوظة
                    </p>
                </div>
            </div>
        </footer>
    );
}
