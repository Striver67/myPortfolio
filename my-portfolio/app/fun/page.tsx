"use client";

import { useRouter } from "next/navigation";
import { useLogin } from "../context/LoginContext"; 
import { GoogleLogin } from "@react-oauth/google";

const categories = [
  { name: "System Design", slug: "system-design", emoji: "🧠" },
  { name: "Core Java", slug: "core-java", emoji: "☕" },
  { name: "JavaScript", slug: "javascript", emoji: "📜" },
  { name: "C++", slug: "cpp", emoji: "💻" },
];

export default function Fun() {
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useLogin();

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Please Sign in to access quizzes 🚀
        </h2>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log("Google login successful:", credentialResponse);
            setIsLoggedIn(true); // yeh localStorage update karega
          }}
          onError={(error : any) => {
            console.log("Google login failed:", error);
          }}
          useOneTap
        />
      </div>
    );
  }

  return (
    <div className="p-10">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">🎯 Choose Your Quiz</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.slug}
            className="cursor-pointer bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition hover:bg-blue-50"
            onClick={() => router.push(`/fun/${cat.slug}`)}
          >
            <div className="text-4xl mb-3">{cat.emoji}</div>
            <h3 className="text-xl font-semibold">{cat.name}</h3>
            <p className="text-sm text-gray-500">30 Questions · Timer based</p>
          </div>
        ))}
      </div>
    </div>
  );
}
