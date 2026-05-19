interface Reply {
  id: string;
  authorName: string;
  avatar: string;
  reply: string;
}

interface Comment {
  id: string;
  authorName: string;
  avatar: string;
  comment: string;
  likes: number;
  replies: Reply[];
}

interface Post {
  id: string;
  avatar: string;
  authorName: string;
  timeOfPosting: string;
  description: string;
  image?: string;
  likes: number;
  comments: Comment[];
}

interface SocialMediaData {
  posts: Post[];
}

export type { Reply, Comment, Post, SocialMediaData };