"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/app/components/Loader/Loader";

export default function Layout({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/get-user-data", {
          method: "GET",
          credentials: "include", // Include cookies for session token
        });
        console.log(response);

        if (!response.ok) {
          // Redirect to login if user is not authenticated
          router.push("/login");
          return;
        }

        const data = await response.json();
        console.log("User data:", data); // Debugging purposes

        setLoading(false); // Stop loading once user data is retrieved
      } catch (error) {
        console.error("Error fetching user data:", error);
        router.push("/login"); // Redirect on error
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <Loader></Loader> // Show a loading screen until data is fetched
    // <Loader></Loader>
  }

  return <>{children}</>;
}
