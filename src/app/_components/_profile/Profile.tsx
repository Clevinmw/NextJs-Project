import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export function Profile() {
  useEffect(() => {
    fetchUserDetails();
  });

  const router = useRouter();
  const [user, setUserDetails]: any = useState(null);

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
