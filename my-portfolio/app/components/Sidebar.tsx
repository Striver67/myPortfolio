"use client";

import { useState } from "react";
import Link from "next/link";
import { FiMoreVertical, FiChevronLeft } from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside className="relative">
      {/* 3 dots button (only mobile) */}
      <button
        className="md:hidden p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMoreVertical size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg flex flex-col justify-between transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:static md:translate-x-0 md:h-screen md:z-50 md:border-r md:border-blue-100`}
      >
        {/* Top Content */}
        <div className="p-6 space-y-4">
          <h1 className="text-2xl font-bold text-blue-700 mb-6">Activities</h1>
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:bg-gray-200 text-gray-700 font-semibold text-lg px-2 py-1 rounded-md transition-colors duration-200"
            >
              🏠 Home
            </Link>
            <Link
              href="/fun"
              className="hover:bg-gray-200 text-gray-700 font-semibold text-lg px-2 py-1 rounded-md transition-colors duration-200"
            >
              🎯 Fun (MCQ)
            </Link>
            <Link
              href="/blogs"
              className="hover:bg-gray-200 text-gray-700 font-semibold text-lg px-2 py-1 rounded-md transition-colors duration-200"
            >
              📚 Tech Blogs
            </Link>
            <Link
              href="/resume"
              className="hover:bg-gray-200 text-gray-700 font-semibold text-lg px-2 py-1 rounded-md transition-colors duration-200"
            >
              📄 Resume
            </Link>
          </nav>
        </div>

        {/* Footer with collapse button */}
        <div className="p-4 border-t flex justify-center">
          <button
            className="text-gray-600 hover:text-blue-500"
            onClick={() => setIsOpen(false)}
          >
            <FiChevronLeft size={28} />
          </button>
        </div>
      </div>
    </aside>
  );
}
