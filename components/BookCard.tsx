// مسیر فایل: components/BookCard.tsx
// (محتوای این فایل را به طور کامل با کد زیر جایگزین کنید)

import Link from 'next/link';

// تعریف نوع داده کتاب برای استفاده مجدد
type Book = {
  id: number;
  title: string;
  author: string;
  imageUrl: string;
};

export default function BookCard({ book }: { book: Book }) {
  return (
    // لینک کل کارت را در بر می‌گیرد و از قابلیت group در Tailwind استفاده می‌کند
    <Link href={`/book/${book.id}`} className="block group rounded-lg">
      
      {/* کانتینر اصلی کارت با حاشیه نامرئی که در زمان هاور رنگی می‌شود */}
      <div className="bg-gray-800 rounded-lg overflow-hidden h-full flex flex-col
                     shadow-lg transition-all duration-300 transform 
                     group-hover:-translate-y-1 group-hover:shadow-blue-500/20 
                     border border-gray-700 group-hover:border-blue-500">
        
        {/* کانتینر عکس با پس‌زمینه و حالت object-contain */}
        <div className="relative w-full h-64 bg-black/20 p-4">
           <img 
            src={book.imageUrl} 
            alt={`Cover for ${book.title}`} 
            className="w-full h-full object-contain" // این خط عکس را کامل نمایش می‌دهد
          />
        </div>
        
        {/* کانتینر متن، کاملاً جدا از عکس */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-white truncate">{book.title}</h3>
          <p className="mt-1 text-sm text-gray-400">{book.author}</p>
        </div>
      </div>
    </Link>
  );
}
