"use client";

import axios from "axios";
import Link from "next/link";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart, HeartHandshake, MessageCircle } from "lucide-react";
import { IPost } from "./types/post";

export default function Home() {
  const queryClient = useQueryClient();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/posts");
      return response.data;
    },
  });

  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const userId = "507f1f77bcf86cd799439011";
      return axios.post(`http://localhost:3000/api/posts/${postId}/like`, {
        userId,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error liking post:", error);
    },
  });

  const handleLike = (postId: string) => {
    likeMutation.mutate(postId);
  };

  const bgColors = [
    "bg-[#5f0f40]",
    "bg-[#9a031e]",
    "bg-[#fb8b24]",
    "bg-[#e36414]",
    "bg-[#414833]",
    "bg-[#7f4f24]",
    "bg-[#2d3047]",
    "bg-[#419d78]",
    "bg-[#2d5362]",
    "bg-[#6b0504]",
    "bg-[#264653]",
    "bg-[#2a9d8f]",
  ];
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading posts</div>;

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post: IPost, index: number) => (
        <Link
          href={`/posts/${post.id}`}
          className={`flex flex-col items-start justify-start overflow-hidden h-[calc(100vh/3)] relative hover:pt-7 transition-all duration-500 ${
            bgColors[index % bgColors.length]
          }`}
          key={index}
        >
          <div className="flex flex-col items-start justify-start gap-4 p-6 text-white">
            <h2 className="font-black text-2xl transition-colors font-EB-Garamond truncate">
              {post.title}
            </h2>
            <p className="px-8">{post.content}</p>
            <div className="flex items-center gap-8 text-white absolute bottom-6 left-6 font-EB-Garamond font-bold">
              <button
                className="flex items-center justify-start gap-2 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleLike(post.id);
                }}
              >
                {post.likes.includes("507f1f77bcf86cd799439011") ? (
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
      ))}
    </div>
  );
}
