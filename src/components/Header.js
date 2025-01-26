import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import axios from 'axios';


export default function Header() {
    const { authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post('auth/token/logout', null, {
                headers: { 'Authorization': `Token ${authToken}` }
            });
            logout();
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    return (
        <div className="absolute w-full max-w-[1890px] mx-auto z-10 px-4 py-3 lg:py-5 lg:px-10">
            <div className="relative flex justify-between items-center">
                <Link to="/" className="text-3xl font-extrabold text-blue-700 tracking-wider drop-shadow-lg">To Do</Link>

                {/* Burger Icon */}
                <button
                    className="text-3xl flex text-black lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>

                {/* Dropdown Menu */}
                <div
                    className={`${isMenuOpen ? "flex" : "hidden"
                        } absolute w-full shadow-lg flex-col p-3 text-center rounded-xl bg-[#fcfcfc] top-[53px] gap-3 lg:gap-6 lg:static lg:flex lg:flex-row lg:shadow-none lg:bg-transparent lg:w-auto lg:p-0 lg:text-white lg:font-bold`}>
                    {authToken ? (
                        <>
                            <Link to="/profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                Profile
                            </Link>
                            <hr className="lg:hidden" />
                            <button onClick={handleLogout}>
                                Log out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                Sign Up
                            </Link>
                            <hr className="lg:hidden" />
                            <Link to="/login" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                Log in
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
