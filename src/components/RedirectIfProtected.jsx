import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom/dist";

function RedirectIfProtected({ children }) {
    const navigate = useNavigate();

    const { user, isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn || user) {
            navigate("/");
        }
    }, [isLoggedIn, navigate, user]);

    return children;
}

export default RedirectIfProtected;