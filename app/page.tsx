// file: app/page.tsx
import BookCard from '../components/BookCard';
import { books } from '../data/books';

export default function HomePage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold">Discover Your Next Great Read</h2>
        <p className="text-lg text-gray-400 mt-2">
          Explore our hand-picked collection of best-selling digital books.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}