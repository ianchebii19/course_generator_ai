import Navbar from "@/components/page/Navbar";


export default function Dashboard() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-blue-900">Dashboard</h1>
        <p className="text-gray-600 mt-4">
          Welcome to your dashboard! Start generating courses now.
        </p>
      </div>
    </div>
  );
}