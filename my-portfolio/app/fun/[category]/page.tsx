"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Confetti from "react-confetti"; // Import Confetti
import { useWindowSize } from "@react-hook/window-size"; // For responsive size of confetti


type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

const quizData: Record<string, Question[]> = {
  "system-design": [
    {
      question: "What is a load balancer?",
      options: ["A firewall", "Distributes traffic", "Stores data", "Caches content"],
      correctAnswer: "Distributes traffic",
    },
    // Add more...
  ],
  "core-java": [
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["this", "extends", "implements", "super"],
      correctAnswer: "extends",
    },
    // Add more...
  ],
  "javascript": [
    {
      question: "What is `typeof null`?",
      options: ["object", "null", "undefined", "function"],
      correctAnswer: "object",
    },
    // Add more...
  ],
  "cpp": [
    {
      question: "Which of these is not a loop in C++?",
      options: ["for", "while", "repeat", "do-while"],
      correctAnswer: "repeat",
    },
    // Add more...
  ],
};

export default function QuizPage() {
  const { category } = useParams();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);
  const [isFinished, setIsFinished] = useState(false);
  const questions = quizData[category as string] || [];

  // Get the window size for confetti animation
  const [width, height] = useWindowSize();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          handleNext(); // Auto move to next
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [current]);

  const handleNext = () => {
    if (selected === questions[current]?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setSelected("");
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setTimeLeft(30);
    } else {
      setIsFinished(true);
    }
  };

  const handleFinish = () => {
    if (selected === questions[current]?.correctAnswer) {
      setScore((prev) => prev + 1);
    }
    setIsFinished(true);
  };

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setSelected("");
    setTimeLeft(30);
    setIsFinished(false);
  };

  if (!questions.length) {
    return <div className="p-10 text-red-500">Invalid category or no questions added yet.</div>;
  }

  if (isFinished || current >= questions.length) {
    return (
      <div className="p-10">
        {/* Show Confetti if full score achieved */}
        {score === questions.length && (
          <Confetti width={width} height={height} />
        )}

        <h2 className="text-3xl font-bold mb-4 text-green-600">✅ Quiz Completed!</h2>
        <p className="text-xl mb-6">Your Score: {score} / {questions.length}</p>
        <button
          onClick={handleRestart}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          🔁 Restart Quiz
        </button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="p-10 relative min-h-screen pb-20">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold">Q{current + 1}: {q.question}</h2>
        <div className="text-lg font-mono text-red-500">⏱ {timeLeft}s</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {q.options.map((opt) => (
          <button
            key={opt}
            onClick={() => setSelected(opt)}
            className={`border p-4 rounded-xl font-medium transition ${
              selected === opt ? "bg-blue-200 border-blue-600" : "hover:bg-gray-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
      <button
        onClick={handleNext}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        {current === questions.length - 1 ? "Finish" : "Next"}
      </button>

      {/* Finish button - always visible */}
      <button
        onClick={handleFinish}
        className="fixed bottom-5 right-5 bg-red-600 text-white px-5 py-2 rounded-full shadow-lg hover:bg-red-700 transition"
      >
        🚩 Finish Now
      </button>
    </div>
  );
}
