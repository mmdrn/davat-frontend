"use client";

import usePostDetail from "@/hooks/usePostDetail";
import CommentComponent from "@/components/comment";
import { IComment } from "@/types/comment";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function PostDetail() {
  const { variables, set, methods } = usePostDetail();

  if (variables.postLoading || variables.commentsLoading)
    return <div>Loading...</div>;
  if (variables.postError || variables.commentsError)
    return <div>Error fetching data</div>;

  return (
    <div className="container mx-auto">
      <div className="bg-sky-200 text-sky-900 mb-4 py-5 w-full">
        <h1 className="text-3xl font-black font-EB-Garamond px-2 max-w-full w-[900px] mx-auto">
          {variables.post?.title}
        </h1>
      </div>
      <div className="max-w-full w-[900px] px-2 mx-auto font-medium">
        {variables.post?.description}
      </div>

      <div className="mt-8 max-w-full w-[900px] mx-auto">
        <h2 className="text-2xl font-bold mb-4 font-EB-Garamond flex items-center justify-start gap-2 text-sky-900">
          <MessageCircle strokeWidth={3} />
          Comments
        </h2>

        {variables.comments?.map((comment: IComment) => (
          <CommentComponent
            key={comment.id}
            comment={comment}
            isLikingComment={variables.likingComment}
            replyTo={variables.replyTo}
            onReply={(commentId: string) => {
              set.setReplyTo(commentId);
            }}
            onLike={(commentId: string) => {
              methods.likeComment(commentId);
            }}
          />
        ))}

        <div className="mb-4">
          <Textarea
            value={variables.newComment}
            onChange={(e) => set.setNewComment(e.target.value)}
            className="w-full p-2 border border-zinc-300 rounded-xl resize-none mb-4"
            rows={7}
            placeholder="Write a comment..."
          />

          <Button
            onClick={() => methods.submitComment(variables.newComment)}
            className="cursor-pointer"
            disabled={variables.submittingComment || !variables.newComment}
          >
            {variables.submittingComment
              ? "Submitting..."
              : variables.replyTo
              ? "Submit Reply"
              : "Submit Comment"}
          </Button>

          {variables.replyTo && (
            <Button
              onClick={() => set.setReplyTo(null)}
              className="ml-2 cursor-pointer"
            >
              Cancel Reply
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
