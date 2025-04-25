import { IComment } from "@/types/comment";

export default function Comment({
  comment,
  isLikingComment,
  onReply,
  onLike,
}: {
  comment: IComment;
  isLikingComment: boolean;
  onReply: (commentId: string) => void;
  onLike: (commentId: string) => void;
}) {
  return (
    <div key={comment.id} className="mb-4 p-4 border rounded">
      <p>{comment.content}</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={() => onReply(comment.id)}
          className="text-sm text-blue-500"
        >
          Reply
        </button>
        <button
          onClick={() => onLike(comment.id)}
          className="text-sm text-blue-500"
          disabled={isLikingComment}
        >
          Like ({comment.likes.length || 0})
        </button>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-8 mt-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="mb-2 p-3 border-l-2 border-gray-300">
              <p>{reply.content}</p>
              <button
                onClick={() => onLike(reply.id)}
                className="mt-2 text-sm text-blue-500"
                disabled={isLikingComment}
              >
                Like ({reply.likes.length || 0})
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
