"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function usePostDetails() {
  const params = useParams();
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery({
    queryKey: ["post", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/posts/${params.id}`
      );
      return data;
    },
  });

  const {
    data: comments,
    isLoading: commentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useQuery({
    queryKey: ["comments", params.id],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:3000/api/posts/${params.id}/comments`
      );
      return data;
    },
  });

  const submitComment = useMutation({
    mutationFn: async (content: string) => {
      const { data } = await axios.post(
        `http://localhost:3000/api/posts/${params.id}/comments`,
        {
          parentCommentId: replyTo,
          author: "6809e7025e7e0b0399ecc081",
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

  const likeComment = useMutation({
    mutationFn: async (commentId: string) => {
      const { data } = await axios.post(
        `http://localhost:3000/api/posts/680a841ba7262572a51e0a17/comments/${commentId}/like`,
        {
          userId: "6809e7025e7e0b0399ecc081",
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
