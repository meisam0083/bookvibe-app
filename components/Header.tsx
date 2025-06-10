// file: components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-700 bg-gray-900 sticky top-0 z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          BookVibe
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="text-gray-300 hover:text-blue-400">
            Home
          </Link>
          <Link href="/categories" className="text-gray-300 hover:text-blue-400">
            Categories
          </Link>
        </nav>
      </div>
    </header>
  );
}