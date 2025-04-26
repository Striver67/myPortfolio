"use client";

import { useLogin } from "../context/LoginContext";
import { GoogleLogin } from "@react-oauth/google";

export default function Resume() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Please Sign in to access your resume 🚀
        </h2>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google login successful:", credentialResponse);
            setIsLoggedIn(true);
          }}
          onError={(error) => {
            console.log("Google login failed:", error);
          }}
          useOneTap
        />
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col items-center justify-center gap-6">
      <h2 className="text-3xl font-bold text-blue-700 mb-4">📄 My Resume</h2>
      <p className="mb-4 text-center text-gray-700">View or download my resume below:</p>

      {/* View Resume */}
      <a
        href="/Ashish_Mishra_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold transition-all"
      >
        👀 View Resume
      </a>

      {/* Download Resume */}
      <a
        href="/Ashish_Mishra_Resume.pdf"
        download
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold transition-all"
      >
        ⬇️ Download Resume
      </a>
    </div>
  );
}
