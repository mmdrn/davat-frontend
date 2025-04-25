export interface IComment {
  id: string;
  postId: string;
  parentCommentId: string | null;
  authorId: string;
  content: string;
  likes: string[];
  replies: IComment[];
}
