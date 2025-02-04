"use client";
import toast from "react-hot-toast";
import axios from "axios";
import Link from "next/Link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      toast.success("Logout Successfull");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  const getUserDetails = async () => {
    try {
      const response = await axios.get("/api/users/me");
      setData(response.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>Profile Page</p>
      <h2 className="p-4 bg-green-400 rounded-md">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        LogOut
      </button>

      <button
        onClick={getUserDetails}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        userDetails
      </button>
    </div>
  );
}
