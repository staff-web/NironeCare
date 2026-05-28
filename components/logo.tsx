// components/Logo.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 flex-shrink-0 group">
      {/* Replace with your actual logo image */}
      <div className="relative w-8 h-8">
        <Image
          src="/logo.png" // Fixed path - remove 'public/' prefix
          alt="NironCare Logo"
          fill
          className="object-contain"
        />
      </div>
      {/* Plain color - NO gradient */}
      <span className="font-bold text-lg hidden sm:inline text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-300">
        NironCare
      </span>
    </Link>
  );
}