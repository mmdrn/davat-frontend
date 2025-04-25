"use client";

import usePostDetail from "@/hooks/usePostDetail";
import CommentComponent from "@/components/comment";
import { IComment } from "@/types/comment";

export default function PostDetail() {
  const { variables, set, methods } = usePostDetail();

  if (variables.postLoading || variables.commentsLoading)
    return <div>Loading...</div>;
  if (variables.postError || variables.commentsError)
    return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">{variables.post?.title}</h1>
      <div className="prose max-w-none">
        <p>{variables.post?.content}</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className="mb-4">
          <textarea
            value={variables.newComment}
            onChange={(e) => set.setNewComment(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder={
              variables.replyTo ? "Write a reply..." : "Write a comment..."
            }
          />
          <button
            onClick={() => methods.submitComment(variables.newComment)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            disabled={variables.submittingComment}
          >
            {variables.submittingComment
              ? "Submitting..."
              : variables.replyTo
              ? "Submit Reply"
              : "Submit Comment"}
          </button>
          {variables.replyTo && (
            <button
              onClick={() => set.setReplyTo(null)}
              className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel Reply
            </button>
          )}
        </div>
        
        {variables.comments?.map((comment: IComment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            isLikingComment={variables.likingComment}
            onReply={(commentId: string) => {
              set.setReplyTo(commentId);
            }}
            onLike={(commentId: string) => {
              methods.likeComment(commentId);
            }}
          />
        ))}
      </div>
    </div>
  );
}
