"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Replace with your Google Apps Script Web App URL
      const res = await fetch("https://script.google.com/macros/s/AKfycbxZOFA5j14DMT3-8KNW-bdhs9dE6E2Lkaymviu6o_0/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Error sending email", error);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 px-4">
      <motion.h1
        className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Contact Me
      </motion.h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Message</label>
          <textarea
            name="message"
            rows={5}
            className="w-full p-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition duration-300"
          disabled={loading}
        >
          {loading ? "Sending..." : (
            <>
              Send <FaPaperPlane className="ml-2" />
            </>
          )}
        </button>

        {success && (
          <motion.p
            className="text-green-500 text-center mt-4 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            🎉 Your message has been sent successfully!
          </motion.p>
        )}
      </form>
    </main>
  );
}
