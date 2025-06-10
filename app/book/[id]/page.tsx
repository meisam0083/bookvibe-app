// file: app/book/[id]/page.tsx
import { books } from '../../../data/books';

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === parseInt(params.id));

  if (!book) {
    return <div className="text-center text-white p-10">Book not found!</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row gap-8 items-start">
        <img 
          src={book.imageUrl} 
          alt={`Cover of ${book.title}`}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold">{book.title}</h1>
          <p className="text-xl text-gray-400 mt-2">{book.author}</p>
          <p className="text-gray-300 mt-6">
            This is a placeholder description for the book. In a real application,
            this would contain a detailed summary, reviews, and more information
            to entice the buyer.
          </p>
          <div className="mt-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors">
              Buy Now for $12.99
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}