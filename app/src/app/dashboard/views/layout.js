"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    return <div>Loading...</div>; // Show a loading screen until data is fetched
  }

  return <>{children}</>;
}
