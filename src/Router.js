import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import PasswordForget from "./components/auth/PasswordForget";
import PasswordReset from "./components/auth/PasswordReset";
import AccountActivate from "./components/auth/AccountActivate";
import TodoPage from "./components/pages/TodoPage";
import UserProfile from "./components/UserProfile";

const Router = () => {
    const location = useLocation();
    const showHeader = !(location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/forget-password' || location.pathname === '/password/reset/confirm/:uid/:token');

    return (
        <div>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<PasswordForget />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<PasswordReset />} />
                <Route path="/activate/:uid/:token" element={<AccountActivate />} />
                <Route path="/todos" element={<TodoPage />} />
                <Route path="/profile" element={<UserProfile />} />
            </Routes>
        </div>
    );
};


export default Router;
