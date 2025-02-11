import Image from 'next/image';
import Link from 'next/link';
import { FaHome, FaCompass, FaRocket, FaSignOutAlt } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className=" inset-y-0 left-0 w-48 bg-white shadow-lg hidden sm:block h-full">
      {/* Logo */}
      <div className="flex items-center justify-center ">
         <Image src="/conarc.png" alt="Logo" width={130} height={120 } className='py-5'/>
         
      </div>

      {/* Navigation Links */}
      <nav className="mt-6">
        <Link href="/dashboard">
          <div className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer">
            <FaHome className="w-5 h-5" />
            <span className="ml-3">Home</span>
          </div>
        </Link>

        <Link href="/dashbord/explore">
          <div className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer">
            <FaCompass className="w-5 h-5" />
            <span className="ml-3">Explore</span>
          </div>
        </Link>

        <Link href="/dashboard/upgrade">
          <div className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer">
            <FaRocket className="w-5 h-5" />
            <span className="ml-3">Upgrade</span>
          </div>
        </Link>
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-0 w-full">
        <div className="flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 cursor-pointer">
          <FaSignOutAlt className="w-5 h-5" />
          <span className="ml-3">Logout</span>
        </div>
      </div>
    </div>
  );
}