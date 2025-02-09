import Link from "next/link";
import { Button } from "../ui/button";

export default function Hero() {
    return (
      <div className="bg-blue-50 h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-blue-900 mb-4">
            Generate Courses with AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create personalized courses using the power of AI and curated content from YouTube.
          </p>
          <Link href="/dashboard">
            <Button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    );
  }