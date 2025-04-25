import { IComment } from "@/types/comment";
import {
  Heart,
  HeartHandshake,
  MessageCircleReply,
  Reply,
  User,
} from "lucide-react";

export default function Comment({
  comment,
  replyTo,
  isLikingComment,
  onReply,
  onLike,
}: {
  comment: IComment;
  replyTo: string | null;
  isLikingComment: boolean;
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
}) {
  return (
    <div
      key={comment.id}
      className="mb-4 border border-zinc-300 rounded-xl p-4"
    >
      {/* User info section */}
      <div className=" flex items-center justify-between">
        <div className="flex items-center justify-start gap-2">
          <span className="p-3 rounded-full bg-zinc-100 border border-zinc-100">
            <User />
          </span>
          <p className="capitalize font-EB-Garamond font-black text-neutral-900">
            Anonymous user
          </p>
        </div>
      </div>
      {/* Comment content */}
      <p className="pl-[58px] font-medium text-neutral-900 text-sm mb-6 whitespace-pre-line">
        {comment.content}
      </p>
      {/* Action buttons */}
      <div className="flex gap-2 mt-2 pl-[58px] font-medium">
        {/* Reply button */}
        <button
          onClick={() => onReply(comment.id)}
          className={`text-sm text-sky-900 flex items-center justify-start gap-2 px-5 py-2 rounded-md cursor-pointer ${
            replyTo === comment.id ? "bg-sky-900 text-white" : "bg-sky-50/80"
          }`}
        >
          <Reply />
          Reply
        </button>
        {/* Like button with dynamic heart icon */}
        <button
          onClick={() => onLike(comment.id)}
          className={`text-sm text-sky-900 flex items-center justify-start gap-2 px-5 py-2 rounded-md cursor-pointer ${
            comment.likes.includes("507f1f77bcf86cd799439011")
              ? "bg-sky-900 text-white"
              : "bg-sky-50/80"
          }`}
          disabled={isLikingComment}
        >
          {comment.likes.includes("507f1f77bcf86cd799439011") ? (
            <HeartHandshake />
          ) : (
            <Heart />
          )}
          {comment.likes.length} Likes
        </button>
      </div>

      {comment.replies && comment.replies.length > 0 && (
        <>
          <p className="font-EB-Garamond font-black pl-[58px] mt-8 flex items-center justify-start gap-2">
            <MessageCircleReply />
            Replies
          </p>
          <div className="mt-4 pl-[91px] flex flex-col items-start justify-start gap-8">
            {comment.replies.map((reply) => (
              <div
                key={reply.id}
                className="mb-2 flex flex-col items-start justify-start gap-2 border-l-2 border-sky-100 pl-3"
              >
                <p className="text-sm font-medium ">{reply.content}</p>

                <button
                  onClick={() => onLike(reply.id)}
                  className={`text-sm text-sky-900 flex items-center justify-start gap-2 px-5 py-2 rounded-md cursor-pointer ${
                    reply.likes.includes("507f1f77bcf86cd799439011")
                      ? "bg-sky-900 text-white"
                      : "bg-sky-50/80"
                  }`}
                  disabled={isLikingComment}
                >
                  {reply.likes.includes("507f1f77bcf86cd799439011") ? (
                    <HeartHandshake />
                  ) : (
                    <Heart />
                  )}
                  {reply.likes.length} Likes
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
