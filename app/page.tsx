import { Heart, MessageCircle, ScrollText } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js",
      description:
        "Learn the basics of Next.js and start building modern web applications.",
      date: "2024-01-20",
    },
    {
      id: 2,
      title: "Understanding React Hooks",
      description:
        "Deep dive into React Hooks and how to use them effectively.",
      date: "2024-01-19",
    },
    {
      id: 3,
      title: "Building with Shadcn UI",
      description:
        "Learn how to use Shadcn UI components to build beautiful interfaces.",
      date: "2024-01-18",
    },
  ];

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <div
          className="flex flex-col items-start justify-start rounded-2xl shadow-sm overflow-hidden"
          key={index}
        >
          <Link
            href={`/posts/${post.id}`}
            className="flex items-center justify-center w-full py-14 bg-gray-100"
          >
            <ScrollText className="size-20 text-gray-500" strokeWidth={1} />
          </Link>
          <div className="flex flex-col items-start justify-start gap-4 p-6">
            <Link
              href={`/posts/${post.id}`}
              className="font-bold text-black textlg hover:text-cyan-600 transition-colors"
            >
              {post.title}
            </Link>
            <p className="">{post.description}</p>
            <div className="flex items-center gap-8 text-sm text-gray-500">
              <span className="flex items-center justify-start gap-2">
                <Heart /> 42 likes
              </span>
              <span className="flex items-center justify-start gap-2">
                <MessageCircle /> 12 comments
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
