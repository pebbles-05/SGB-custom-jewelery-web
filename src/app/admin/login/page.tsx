"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/helpers/appwrite";
import Link from "next/link";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in by calling account.get()
    const checkLoginStatus = async () => {
      try {
        await account.get();
        setIsLoggedIn(true); // User is logged in
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false); // No active session
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      setIsLoggedIn(true); // User is logged in
      router.push("/admin"); // Redirect to the admin dashboard
    } catch (err) {
      setError("Invalid credentials");
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await account.deleteSession("current"); // Log out the current session
      setIsLoggedIn(false); // Update state to reflect that user is logged out
      router.push("/admin/login"); // Redirect to the login page
    } catch (err) {
      alert("Error logging out");
      console.error("Error logging out", err);
    }
  };

  return (
    <div className="text-custom-bg-light font-sans flex flex-col items-center justify-center w-screen h-[calc(100vh-100px)]">
      <form
        onSubmit={handleLogin}
        className="bg-custom-fg-light shadow-lg rounded-lg p-8 max-w-[60vw] max-h-[80vh] overflow-auto max-w-4xl flex flex-col gap-4 text-2xl"
      >
        <h1>Admin Login</h1>

        {/* If logged in, show a logout button */}
        {isLoggedIn ? (
          <div className="flex flex-col">
            <p>You are logged in</p>
            <span>Go to:</span>
            <div className="flex gap-4 items-center text-2xl mb-2">
              <Link className="underline" href="/admin">
                Product
              </Link>
              <Link className="underline" href="/admin/type">
                Type
              </Link>
              <Link className="underline" href="/admin/category">
                Category
              </Link>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="w-full text-custom-fg-light py-2 rounded-lg bg-custom-bg-light"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-custom-black w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-custom-black w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-[#f8ede3]"
              required
            />
            <button
              type="submit"
              className="w-full text-custom-fg-light py-2 rounded-lg bg-custom-bg-light"
            >
              Login
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLogin;
