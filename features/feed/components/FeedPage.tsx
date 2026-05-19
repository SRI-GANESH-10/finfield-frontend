import { FeedCard } from "@/components/shared/FeedCard";
import { Button } from "@/components/ui/button";

const postsResponse = [
    {
      "id": "post_001",
      "avatar": "https://i.pravatar.cc/150?img=1",
      "authorName": "Sarah Mitchell",
      "timeOfPosting": "2024-05-15T10:30:00Z",
      "description": "Just finished an amazing hike in the mountains! The view from the top was absolutely breathtaking. Nature never fails to inspire me. 🏔️✨",
      "image": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "likes": 142,
      "comments": [
        {
          "id": "comment_001",
          "authorName": "James Wilson",
          "avatar": "https://i.pravatar.cc/150?img=11",
          "comment": "Wow, that sounds incredible! Which trail did you take?",
          "likes": 8,
          "replies": [
            {
              "id": "reply_001",
              "authorName": "Sarah Mitchell",
              "avatar": "https://i.pravatar.cc/150?img=1",
              "reply": "It was the Eagle Peak Trail! Highly recommend it."
            },
            {
              "id": "reply_002",
              "authorName": "Mike Torres",
              "avatar": "https://i.pravatar.cc/150?img=33",
              "reply": "I've been there! The sunrise view is unbeatable."
            }
          ]
        },
        {
          "id": "comment_002",
          "authorName": "Emily Chen",
          "avatar": "https://i.pravatar.cc/150?img=5",
          "comment": "Your photos always make me want to go hiking! 😍",
          "likes": 12,
          "replies": [
            {
              "id": "reply_003",
              "authorName": "Sarah Mitchell",
              "avatar": "https://i.pravatar.cc/150?img=1",
              "reply": "Thank you! You should definitely join me next time!"
            }
          ]
        }
      ]
    },
    {
      "id": "post_002",
      "avatar": "https://i.pravatar.cc/150?img=12",
      "authorName": "Alex Rodriguez",
      "timeOfPosting": "2024-05-15T08:15:00Z",
      "description": "Finally launched my new coffee shop today! ☕ Thank you to everyone who came by for the grand opening. Your support means the world to me!",
      "likes": 287,
      "comments": [
        {
          "id": "comment_003",
          "authorName": "Lisa Thompson",
          "avatar": "https://i.pravatar.cc/150?img=9",
          "comment": "Congratulations! Can't wait to visit. What are your hours?",
          "likes": 15,
          "replies": [
            {
              "id": "reply_004",
              "authorName": "Alex Rodriguez",
              "avatar": "https://i.pravatar.cc/150?img=12",
              "reply": "Thanks! We're open 7 AM - 7 PM every day. See you soon!"
            }
          ]
        },
        {
          "id": "comment_004",
          "authorName": "David Park",
          "avatar": "https://i.pravatar.cc/150?img=14",
          "comment": "The espresso was amazing! Best I've had in years.",
          "likes": 22,
          "replies": [
            {
              "id": "reply_005",
              "authorName": "Alex Rodriguez",
              "avatar": "https://i.pravatar.cc/150?img=12",
              "reply": "That made my day! Thanks for stopping by, David! ❤️"
            },
            {
              "id": "reply_006",
              "authorName": "Maria Santos",
              "avatar": "https://i.pravatar.cc/150?img=20",
              "reply": "Now I HAVE to try it!"
            }
          ]
        },
        {
          "id": "comment_005",
          "authorName": "Rachel Green",
          "avatar": "https://i.pravatar.cc/150?img=23",
          "comment": "So proud of you! This has been your dream for years! 🎉",
          "likes": 31,
          "replies": []
        }
      ]
    }
  ];

export const FeedPage = () => {
  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* Fixed header — never scrolls */}
      <div className="shrink-0 bg-background">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">Feed</h1>
          <Button>Create Post</Button>
        </div>
      </div>

      {/* Only the cards scroll */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-5 flex flex-col gap-4">
          {postsResponse.map((post) => (
            <FeedCard key={post.id} posts={post} />
          ))}
        </div>
      </div>

    </div>
  );
};
