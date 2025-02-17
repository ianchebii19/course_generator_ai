import Link from 'next/link';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';

export default function Heaader() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className=' '>
              <Image 
                src="/conlogo.png" alt="Logo" width={80} height={60}/>
            </Link>
            
          </div>

          {/* Dashboard Button */}
          <div>
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}