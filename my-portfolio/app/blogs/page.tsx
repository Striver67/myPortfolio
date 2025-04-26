"use client";

import { useState } from "react";
import { useLogin } from "../context/LoginContext";
import { GoogleLogin } from "@react-oauth/google";
import { FaHeart, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation"; // for back button

interface Blog {
  id: number;
  title: string;
  description: string;
  content: string;
}

const blogsData: Blog[] = [
  { id: 1, title: "🚀 Scaling Systems", description: "Scaling apps from hundreds to millions of users...", content: "Detailed content for scaling systems..." },
  { id: 2, title: "🧠 Load Balancers", description: "Critical for high-availability systems.", content: "Deep dive into load balancers..." },
  { id: 3, title: "⚡ Caching Strategies", description: "Master caching to speed up apps.", content: "Write-through, write-around explained..." },
  { id: 4, title: "🔒 Security Best Practices", description: "Secure your apps from vulnerabilities.", content: "JWTs, encryption, API security tips..." },
  { id: 5, title: "📈 Database Scaling", description: "Vertical vs Horizontal Scaling...", content: "Sharding, replication strategies..." },
  { id: 6, title: "🌐 Microservices vs Monolith", description: "When to use which?", content: "Comparison with deployment strategies..." },
  { id: 7, title: "📚 Event-Driven Systems", description: "Use events to decouple services.", content: "Apache Kafka, RabbitMQ explained..." },
  { id: 8, title: "🖥️ WebSockets Explained", description: "Real-time communication in web apps.", content: "Deep dive into WebSocket protocol..." },
];

export default function Blogs() {
  const { isLoggedIn, setIsLoggedIn } = useLogin();
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5;
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});
  const router = useRouter();

  const totalPages = Math.ceil(blogsData.length / blogsPerPage);
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogsData.slice(indexOfFirstBlog, indexOfLastBlog);

  const handleLike = (id: number) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [id]: (prevLikes[id] || 0) + 1
    }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-10 bg-gray-100">
      {/* Fixed Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed left-5 bottom-5 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg z-50"
      >
        ⬅️ Back
      </button>

      {!isLoggedIn ? (
        <div className="flex flex-col items-center space-y-6">
          <h2 className="text-2xl font-bold text-blue-700">Please Sign In to View Blogs 📚</h2>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              console.log("Login Success:", credentialResponse);
              setIsLoggedIn(true);
              alert("Login Successful!");
            }}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
      ) : (
        <div className="w-full max-w-5xl">
          <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">📚 Tech Blogs</h2>

          {/* Blog Tiles */}
          <div className="grid gap-6">
            {currentBlogs.map((blog) => (
              <div
                key={blog.id}
                className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg cursor-pointer transition"
                onClick={() => setSelectedBlog(blog)}
              >
                <h3 className="text-xl font-bold text-gray-800">{blog.title}</h3>
                <p className="text-gray-600 mt-2">{blog.description}</p>

                <div className="flex items-center mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(blog.id);
                    }}
                    className="flex items-center space-x-2 text-red-500 hover:text-red-600"
                  >
                    <FaHeart />
                    <span>{likes[blog.id] || 0}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-center space-x-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className={`px-4 py-2 rounded-full font-semibold ${
                currentPage === 1 ? "bg-gray-300 text-gray-500" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              ⬅️ Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-full ${
                  page === currentPage
                    ? "bg-blue-700 text-white font-bold"
                    : "bg-white text-blue-700 border hover:bg-blue-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className={`px-4 py-2 rounded-full font-semibold ${
                currentPage === totalPages ? "bg-gray-300 text-gray-500" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              Next ➡️
            </button>
          </div>

          {/* Blog Modal */}
          {selectedBlog && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              onClick={() => setSelectedBlog(null)}
            >
              <div
                className="relative bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                  onClick={() => setSelectedBlog(null)}
                >
                  <FaTimes size={24} />
                </button>

                <h3 className="text-2xl font-bold mb-4">{selectedBlog.title}</h3>
                <p className="text-gray-700">{selectedBlog.content}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
