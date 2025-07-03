"use client"
import axios from 'axios';
import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

function ProfilePage() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Profile</h1>
      <button onClick={handleLogout} className='bg-blue-500 text-white p-2 rounded-md'>Logout</button>
    </div>
  )
}

export default ProfilePage