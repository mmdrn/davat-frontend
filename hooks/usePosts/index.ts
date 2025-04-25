"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function usePosts() {
  const queryClient = useQueryClient();

  // Mutation hook for handling post likes
  const likeMutation = useMutation({
    mutationFn: async (postId: string) => {
      const userId = "507f1f77bcf86cd799439011"; // Hardcoded user ID for testing
      return axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/like`,
        {
          userId,
        }
      );
    },
    onSuccess: () => {
      // Invalidate and refetch posts after successful like to update UI
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      console.error("Error liking post:", error);
    },
  });

  // Query hook for fetching all posts
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts`
      );
      return response.data;
    },
  });

  return {
    variables: {
      posts,
      isLoading,
      error,
    },
    methods: {
      likePost: likeMutation.mutate,
    },
  };
}
