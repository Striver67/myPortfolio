"use client";

import { useLogin } from "../context/LoginContext";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

export default function Resume() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  const handleLoginSuccess = async (credentialResponse: any) => {
    console.log("Google login successful:", credentialResponse);

    if (credentialResponse.credential) {
      const decoded = jwtDecode(credentialResponse.credential) as {
        name: string;
        email: string;
      };

      console.log("Decoded user:", decoded);

      // Save user data to database
      try {
        const response = await fetch("/api/save-user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: decoded.name,
            email: decoded.email,
          }),
        });

        if (!response.ok) {
          console.error("Failed to save user to database");
        }
      } catch (error) {
        console.error("Error saving user:", error);
      }
    }

    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Please Sign in to access your resume 🚀
        </h2>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Google login failed:");
          }}
          useOneTap
        />
      </div>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">📄 My Resume</h2>
      <p className="mb-4">Click below to view or download my resume:</p>
      <a
        href="/Ashish_Mishra_Resume.pdf"
        target="_blank"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        download
      >
        Download Resume
      </a>
    </div>
  );
}
