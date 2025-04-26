"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { db, doc, getDoc, setDoc, updateDoc, increment } from "../firebase"; // firestore imports
import { FaJsSquare, FaNodeJs, FaReact, FaDatabase } from "react-icons/fa";
import { SiNextdotjs, SiSpring, SiMongodb } from "react-icons/si";


function TechIcon({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl hover:scale-110 transition-transform"
      whileHover={{ scale: 1.1 }}
    >
      <div className="text-5xl mb-2">{icon}</div>
      <div className="text-sm font-semibold">{name}</div>
    </motion.div>
  );
}

export default function Home() {
  const [visitorCount, setVisitorCount] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [width, height] = useWindowSize();

  useEffect(() => {
    const incrementVisitorCount = async () => {
      try {
        const visitorDocRef = doc(db, "visitorCounter", "countDoc");

        const docSnap = await getDoc(visitorDocRef);

        if (docSnap.exists()) {
          await updateDoc(visitorDocRef, {
            count: increment(1),
          });

          const updatedDocSnap = await getDoc(visitorDocRef);
          setVisitorCount(updatedDocSnap.data().count);
        } else {
          await setDoc(visitorDocRef, { count: 1 });
          setVisitorCount(1);
        }

        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      } catch (err) {
        console.error("Failed to update visitor count:", err);
      }
    };

    incrementVisitorCount();
  }, []);

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-800">
      {showConfetti && <Confetti width={width} height={height} />}
      
      {/* Navbar */}

<header className="w-full py-6 px-8 bg-white shadow-md flex justify-between items-center">
  <div>
    <motion.h1
      className="text-2xl md:text-3xl font-bold text-gray-800 whitespace-nowrap overflow-hidden border-r-4 border-blue-600 pr-2 animate-typing"
    >
      👋 Hi, Welcome here
    </motion.h1>
  </div>

  <div className="flex space-x-4">
    <a href="/contact" className="text-blue-500 hover:underline font-semibold">Contact</a>
    {/* <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
      <FaGithub size={24} className="text-gray-700 hover:text-blue-500" />
    </a> */}
    <a href="https://www.linkedin.com/in/ashish-mishra-917b79202/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin size={24} className="text-gray-700 hover:text-blue-500" />
    </a>
  </div>
</header>



      {/* About Section */}
<section className="flex-grow flex flex-col items-center justify-center text-center px-6 py-16">
  <motion.div
    className="flex flex-col md:flex-row items-center gap-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <div className="w-48 h-48 overflow-hidden shadow-lg border-4 border-blue-300 rounded-full">
      <img
        src="/photo/myphoto.jpg"
        alt="Ashish Mishra"
        className="w-full h-full object-cover"
      />
    </div>

    <div className="flex flex-col items-center md:items-start text-center md:text-left">
      <motion.h2
        className="text-4xl font-extrabold text-blue-700 mb-4 whitespace-nowrap overflow-hidden animate-typing border-r-4 border-blue-700 pr-2"
        style={{ animation: "typing 3s steps(30, end), blink-caret 0.75s step-end infinite" }}
      >
        Ashish Mishra
      </motion.h2>

      <motion.p
        className="max-w-xl text-lg leading-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Hi! I'm <span className="font-semibold">Ashish Mishra</span>, a passionate backend and system design enthusiast.
        I love creating scalable web applications and architecting high-performance systems. 🚀
        <br />
        On a mission to become a tech geek, inspire others, and build amazing projects!
      </motion.p>
    </div>
  </motion.div>

  {/* Tech Stack Section */}
  <motion.div
    className="mt-12 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
  >
    {/* Each tech stack item */}
    <TechIcon icon={<FaJsSquare className="text-yellow-400" />} name="JavaScript" />
    <TechIcon icon={<FaNodeJs className="text-green-500" />} name="Node.js" />
    <TechIcon icon={<FaReact className="text-blue-400" />} name="React" />
    <TechIcon icon={<SiNextdotjs className="text-black" />} name="Next.js" />
    <TechIcon icon={<SiMongodb className="text-green-600" />} name="MongoDB" />
    <TechIcon icon={<FaDatabase className="text-indigo-600" />} name="SQL" />
  </motion.div>
</section>

      {/* Visitor Count Section */}
      <motion.section
        className="w-full py-10 bg-white shadow-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <motion.h3
            className="text-2xl font-bold text-gray-700 mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            👀 Visitor Count
          </motion.h3>
          <motion.p
            className="text-5xl font-extrabold text-green-500"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            {visitorCount}
          </motion.p>
          <motion.p
            className="text-sm text-gray-500 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            Thanks for visiting!
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-4">
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <FaEnvelope size={20} className="inline mr-2" />
            Email me: <a href="mailto:ashish.mishra0717@gmail.com" className="text-blue-400 hover:underline">ashish.mishra0717@gmail.com</a>
          </motion.p>
          <motion.p
            className="text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            &copy; {new Date().getFullYear()} Ashish Mishra. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </main>
  );
}
