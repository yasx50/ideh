"use client";

import React, { useState, createContext } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";
import Sidebar from "@/app/components/Sidebar/Sidebar";
// import Sidebar from "@/components/Sidebar/Sidebar";

export const ThemeContext = createContext();

export default function Layout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    const toggleTheme = () => setDarkMode(!darkMode);

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch("/api/get-user-data", {
                    method: "GET",
                    credentials: "include",
                });

                if (response.ok) {
                    router.push("/dashboard/views/home");
                    return;
                }

                const data = await response.json();
                console.log("User data:", data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user data:", error);
                router.push("/login");
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            {children}
        </>
    );
}
