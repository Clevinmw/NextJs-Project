import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// Define a User type for type safety
interface User {
  _id: string;
  username?: string;
  email?: string;
  // Add other fields as needed
}

export function Profile() {
  useEffect(() => {
    fetchUserDetails();
  });

  const [user, setUserDetails] = useState<User | null>(null);

  const fetchUserDetails = async () => {
    const response = await axios.get("/api/users/profile");
    setUserDetails(response?.data?.user || null);
  };

  return (
    <>
      <h5>{user ? user?._id : "No user details"}</h5>
      <Link href={`/profile/${user ? user._id : null}`}>User details</Link>
    </>
  );
}
