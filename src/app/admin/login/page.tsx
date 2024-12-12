"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/helpers/appwrite";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      router.push("/admin"); // Redirect to the admin dashboard
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-[calc(100vh-100px)]">
      <form
        onSubmit={handleLogin}
        className="bg-custom-fg-light shadow-lg rounded-lg p-8 max-w-[60vw] max-h-[80vh] overflow-auto max-w-4xl flex flex-col gap-4 text-2xl"
      >
        <h1 className="text-custom-bg-light">Admin Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="tw-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]ext"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="tw-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]ext"
          required
        />
        <button
          type="submit"
          className="w-full text-custom-fg-light py-2 rounded-lg bg-custom-bg-light"
        >
          Login
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
