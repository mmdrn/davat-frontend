"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function usePostDetails() {
  const params = useParams();
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  // Fetch post details
  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}`
      );
      return data;
    },
  });

  // Fetch post comments
  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}/comments`
      );
      return data;
    },
  });

  // Mutation for submitting a new comment
  const submitComment = useMutation({
    mutationFn: async (content: string) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${params.id}/comments`,
        {
          parentCommentId: replyTo,
          author: process.env.NEXT_PUBLIC_USER_ID || "507f1f77bcf86cd799439011",
          content: content,
        }
      );
      return data;
    },
    onSuccess: () => {
      refetchComments();
      setNewComment("");
      setReplyTo(null);
    },
  });

  // Mutation for liking a comment
  const likeComment = useMutation({
    mutationFn: async (commentId: string) => {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${post.id}/comments/${commentId}/like`,
        {
          userId: process.env.NEXT_PUBLIC_USER_ID || "507f1f77bcf86cd799439011",
        }
      );
      return data;
    },
    onSuccess: () => {
      refetchComments();
    },
  });

  return {
    variables: {
      post,
      postError,
      postLoading,
      comments,
      commentsLoading,
      commentsError,
      submittingComment: submitComment.isPending,
      likingComment: likeComment.isPending,
      newComment,
      replyTo,
    },
    set: {
      setNewComment,
      setReplyTo,
    },
    methods: {
      submitComment: submitComment.mutate,
      likeComment: likeComment.mutate,
    },
  };
}
