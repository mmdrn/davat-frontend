"use client";

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function PostDetail() {
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

  if (postLoading || commentsLoading) return <div>Loading...</div>;
  if (postError || commentsError) return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post?.title}</h1>
      <div className="prose max-w-none">
        <p>{post?.content}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={replyTo ? "Write a reply..." : "Write a comment..."}
          />
          <button
            onClick={() => submitComment.mutate(newComment)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={submitComment.isPending}
          >
            {submitComment.isPending
              ? "Submitting..."
              : replyTo
              ? "Submit Reply"
              : "Submit Comment"}
          </button>
          {replyTo && (
            <button
              onClick={() => setReplyTo(null)}
              className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel Reply
            </button>
          )}
        </div>
        {comments?.map(
          (comment: {
            _id: string;
            content: string;
            likesCount: number;
            replies?: { _id: string; content: string; likesCount: number }[];
          }) => (
            <div key={comment._id} className="mb-4 p-4 border rounded">
              <p>{comment.content}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setReplyTo(comment._id)}
                  className="text-sm text-blue-500"
                >
                  Reply
                </button>
                <button
                  onClick={() => likeComment.mutate(comment._id)}
                  className="text-sm text-blue-500"
                  disabled={likeComment.isPending}
                >
                  Like ({comment.likesCount || 0})
                </button>
              </div>
              {comment.replies && comment.replies.length > 0 && (
                <div className="ml-8 mt-4">
                  {comment.replies.map((reply) => (
                    <div
                      key={reply._id}
                      className="mb-2 p-3 border-l-2 border-gray-300"
                    >
                      <p>{reply.content}</p>
                      <button
                        onClick={() => likeComment.mutate(reply._id)}
                        className="mt-2 text-sm text-blue-500"
                        disabled={likeComment.isPending}
                      >
                        Like ({reply.likesCount || 0})
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        )}
      </div>
    </div>
  );
}
