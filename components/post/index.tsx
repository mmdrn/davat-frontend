import Link from "next/link";
import { IPost } from "@/types/post";
import { Heart, HeartHandshake, MessageCircle } from "lucide-react";

interface PostProps {
  post: IPost;
  background: string;
  onLike: () => void;
}

// Component that displays a single post with like and comment functionality
export default function Post({ post, background, onLike }: PostProps) {
  // Link component that wraps the entire post and navigates to post details
  return (
    <Link
      href={`/${post.id}`}
      className={`flex flex-col items-start justify-start overflow-hidden h-[calc(100vh/3)] relative hover:pt-7 transition-all duration-500 ${background}`}
    >
      <div className="flex flex-col items-start justify-start gap-4 p-6 text-white">
        {/* Post title */}
        <h2 className="font-black text-2xl transition-colors font-EB-Garamond truncate">
          {post.title}
        </h2>
        {/* Post content */}
        <p className="px-8">{post.content}</p>
        {/* Like and comment section */}
        <div className="flex items-center gap-8 text-white absolute bottom-6 left-6 font-EB-Garamond font-bold">
          <button
            className="flex items-center justify-start gap-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onLike();
            }}
          >
            {/* Show different heart icon based on like status */}
            {post.likes.includes(
              process.env.NEXT_PUBLIC_USER_ID || "507f1f77bcf86cd799439011"
            ) ? (
              <HeartHandshake />
            ) : (
              <Heart />
            )}
            {post.likes.length} Likes
          </button>
          <span className="flex items-center justify-start gap-2">
            <MessageCircle />
            {post.comments.length} Comments
          </span>
        </div>
      </div>
    </Link>
  );
}
