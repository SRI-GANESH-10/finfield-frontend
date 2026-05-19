import Image from "next/image";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

import { Post } from "@/features/feed";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function getInitials(name: string) {
  if (!name?.trim()) return "?";
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const FeedCard = ({ posts }: { posts: Post }) => {
  return (
    <Card className="w-full mb-4">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar size="lg">
              <AvatarImage src={posts.avatar} alt={posts.authorName} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getInitials(posts.authorName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-foreground leading-tight">
                {posts.authorName}
              </span>
              <span className="text-xs text-muted-foreground">
                {formatDate(posts.timeOfPosting)}
              </span>
            </div>
          </div>
          <Button variant="ghost" size="icon-sm" className="text-muted-foreground">
            <MoreHorizontal />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-4 flex flex-col gap-3">
        <p className="text-sm text-foreground leading-relaxed">
          {posts.description}
        </p>
        {posts.image && (
          <div className="relative overflow-hidden rounded-lg ring-1 ring-border h-72">
            <Image
              src={posts.image}
              alt={`Photo shared by ${posts.authorName}`}
              fill
              className="object-cover"
              sizes="(max-width: 672px) 100vw, 672px"
            />
          </div>
        )}

        <div className="flex items-center gap-4 pt-1">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <ThumbsUp className="size-2.5" />
            </span>
            {posts.likes}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {posts.comments.length}{" "}
            {posts.comments.length === 1 ? "comment" : "comments"}
          </span>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="bg-transparent border-t-0 px-4 py-2 gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          <ThumbsUp />
          Like
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          <MessageCircle />
          Comment
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 text-muted-foreground hover:text-primary hover:bg-primary/10"
        >
          <Share2 />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};
