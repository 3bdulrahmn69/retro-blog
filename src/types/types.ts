export interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  author: string;
  image?: string;
  createdAt: string;
  editedAt?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  comments?: Array<Comment>;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  userName: string;
  postId: number;
  createdAt: string;
}
