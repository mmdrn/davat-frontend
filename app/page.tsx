"use client";

import { CircleX } from "lucide-react";
import { IPost } from "./types/post";
import Post from "@/components/post";
import PostSkeleton from "@/components/post-skeleton";
import usePosts from "@/hooks/usePosts";

export default function Home() {
  const { variables, methods } = usePosts();

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

  // Show loading skeleton or error message while data is loading or if there's an error
  if (variables.isLoading || variables.error) {
    return (
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Generate 9 skeleton posts while loading */}
        {[...Array(9)].map((_, index) => (
          <PostSkeleton bg={bgColors[index % bgColors.length]} key={index} />
        ))}

        {/* Display error message overlay if there's an error */}
        {variables.error && (
          <div className="absolute w-dvw h-dvh bg-white/70 flex items-center justify-center flex-col text-red-600">
            <CircleX className="size-20 mb-12" />
            <p className="text-2xl font-black text-center leading-11">
              An error occurred while loading the content.
              <br />
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        )}
      </div>
    );
  }

  // Render the actual posts grid when data is loaded successfully
  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {/* Map through posts array and render each post with alternating background colors */}
      {variables.posts.map((post: IPost, index: number) => (
        <Post
          post={post}
          key={index}
          background={bgColors[index % bgColors.length]}
          onLike={() => methods.likePost(post.id)}
        />
      ))}
    </div>
  );
}
