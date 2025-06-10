// file: components/BookCard.tsx
import Link from 'next/link';

type Book = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

export default function BookCard({ book }: { book: Book }) {
  return (
    <Link href={`/book/${book.id}`}>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg 
                     hover:shadow-blue-400/30 transition-all duration-300 
                     transform hover:-translate-y-1 cursor-pointer">
        <img 
          src={book.imageUrl} 
          alt={`Cover of ${book.title}`} 
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold text-white truncate">{book.title}</h3>
          <p className="mt-1 text-sm text-gray-400">{book.author}</p>
        </div>
      </div>
    </Link>
  );
}