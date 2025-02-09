import Link from 'next/link';
import { Button } from '../ui/button';
import Image from 'next/image';

export default function Header() {
  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/conlogo.png" alt="Logo" width={150} height={120}/>
            </Link>
            
          </div>

          {/* Dashboard Button */}
          <div>
            <Link href="/dashboard">
              <Button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}