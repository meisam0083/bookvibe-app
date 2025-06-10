// مسیر فایل: app/book/[id]/page.tsx
'use client'; 

import { useState } from 'react';
import { books } from '../../../data/books';
import { notFound } from 'next/navigation';

// تعریف دقیق پراپ‌ها برای حل مشکل Type Error
type BookDetailPageProps = {
  params: {
    id: string;
  };
};

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const book = books.find(b => b.id === parseInt(params.id));

  if (!book) {
    notFound();
  }

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setError('');
    setSummary('');

    try {
      const response = await fetch('/api/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: book.title, author: book.author }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate summary.');
      }

      const data = await response.json();
      setSummary(data.summary);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 sm:p-8">
      <div className="max-w-4xl mx-auto mt-8 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <img 
            src={book.imageUrl} 
            alt={`Cover of ${book.title}`}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold">{book.title}</h1>
          <p className="text-xl text-gray-400 mt-2">by {book.author}</p>
          <div className="mt-6">
            <span className="text-3xl font-bold text-blue-400">${book.price}</span>
          </div>
          <div className="mt-8">
            <button className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors duration-300">
              Buy Now & Download
            </button>
          </div>
          <div className="mt-10 border-t border-gray-700 pt-6">
            <h2 className="text-2xl font-bold">AI-Powered Summary</h2>
            <button 
              onClick={handleGenerateSummary}
              disabled={isLoading}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating...' : '✨ Generate with AI'}
            </button>
            {isLoading && <p className="mt-4 text-gray-400 animate-pulse">Please wait while our AI is reading the book for you...</p>}
            {error && <p className="mt-4 text-red-400">Error: {error}</p>}
            {summary && <p className="mt-4 text-gray-300 leading-relaxed whitespace-pre-wrap bg-gray-800/50 p-4 rounded-md">{summary}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}


// =======================================================================
// === کد اصلاح شده برای API Route ========================================
// =======================================================================
// مسیر فایل: app/api/generate-summary/route.ts
// این کد هم کمی بهبود داده شده تا خطاهای بهتری نمایش دهد
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  const { title, author } = await request.json();

  if (!title || !author) {
    return new Response(JSON.stringify({ error: "Title and author are required" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("GEMINI_API_KEY is not configured.");
    return new Response(JSON.stringify({ error: "API key is not configured on the server." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Write a compelling and insightful summary for the book "${title}" by ${author}. The summary should be engaging for someone who hasn't read the book. Start with a strong hook, explain the core ideas, and mention who would benefit most from reading it. Keep it concise, around 150-200 words. Format it in a few paragraphs.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    return new Response(JSON.stringify({ summary }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("Error generating summary:", error);
    return new Response(JSON.stringify({ error: "Failed to generate summary from the AI model." }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
