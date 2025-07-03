"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Link from "next/link";

// Define a User type for type safety
interface User {
  _id: string;
  username?: string;
  email?: string;
  // Add other fields as needed
}

function ProfilePage() {
  const router = useRouter();
  const [user, setUserDetails] = useState<User | null>(null);
  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log('Unknown error');
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  const fetchUserDetails = async () => {
    const response = await axios.get("/api/users/profile");
    setUserDetails(response?.data?.user || null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>Profile</h1>
      <button
        onClick={handleLogout}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Logout
      </button>

      <hr />
      <div className="mt-10">
        <h3>Profile details</h3>
        <h5>{user ? user._id : "No user details"}</h5>
        <Link href={`/profile/${user ? user._id : ""}`}>User details</Link>
      </div>
    </div>
  );
}

export default ProfilePage;
