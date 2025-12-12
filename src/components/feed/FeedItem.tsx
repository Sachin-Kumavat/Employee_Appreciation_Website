import { useState } from 'react';
import { MessageCircle, ThumbsUp } from 'lucide-react';
import { Appreciation, Comment } from '../../types';

interface FeedItemProps {
  appreciation?: Partial<Appreciation>;
  compact?: boolean;
  darkMode?: boolean;
  comments?: Comment[];
}

export function FeedItem({
  appreciation = {},
  compact = false,
  darkMode = false,
  comments = [
    { user: "John Doe", text: "Awesome job! 👏", avatar: "https://i.pravatar.cc/100?img=1" },
    { user: "Sarah Miller", text: "Well deserved, great teamwork.", avatar: "https://i.pravatar.cc/100?img=2" },
    { user: "Michael Scott", text: "This is amazing! Keep it up!", avatar: "https://i.pravatar.cc/100?img=3" },
  ]
}: FeedItemProps) {

  const defaultData: Appreciation = {
    senderName: "Alice Johnson",
    senderAvatar: "https://i.pravatar.cc/100?img=5",
    receiverNames: ["Bob Smith", "Jane Doe"],
    message: "Great teamwork and exceptional effort on the project!",
    timestamp: new Date().toISOString(),
    commentCount: comments.length,
    reactions: { like: 12, clap: 7 },
    likedBy: ["John Doe", "Sarah Miller", "Priya N", "Mark W", "Michael Scott"],
    clappedBy: ["Ravi K", "Chris L", "Elena P", "Neha B", "Hannah Z"],
    userReaction: undefined,
    comments,
    ...appreciation
  };

  const data = defaultData;

  const [liked, setLiked] = useState(false);
  const [clapped, setClapped] = useState(false);

  const [reactions, setReactions] = useState({
    like: data.reactions.like,
    clap: data.reactions.clap,
  });

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>(data.comments);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(prev => !prev);
    setReactions(prev => ({
      ...prev,
      like: prev.like + (liked ? -1 : 1)
    }));
  };

  const handleClap = () => {
    setClapped(prev => !prev);
    setReactions(prev => ({
      ...prev,
      clap: prev.clap + (clapped ? -1 : 1)
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      user: "Current User",
      text: newComment,
      avatar: "https://i.pravatar.cc/100?img=6", // Placeholder avatar
    };

    setCommentList(prev => [...prev, newCommentObj]);
    setNewComment("");
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className={`${compact ? "" : "p-6"} ${darkMode ? "border-neutral-700" : "border-neutral-200"} ${!compact && "border rounded-xl"} transition-colors duration-200`}>
      <div className="flex items-start gap-3">
        <img src={data.senderAvatar} alt={data.senderName} className="w-10 h-10 rounded-full" />
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-2">
            <p className={darkMode ? "text-white" : "text-neutral-900"}>
              <span className="font-medium">{data.senderName}</span>
              <span className={darkMode ? "text-neutral-400" : "text-neutral-600"}>{" "}appreciated{" "}</span>
              {data.receiverNames.map((name, index) => (
                <span key={index}>
                  <span className="font-medium text-blue-600">{name}</span>
                  {index < data.receiverNames.length - 1 && ", "}
                </span>
              ))}
            </p>
            <p className={`text-xs ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}>{formatTimeAgo(data.timestamp)}</p>
          </div>

          {/* Message */}
          <p className={`${darkMode ? "text-neutral-300" : "text-neutral-700"} mb-4`}>{data.message}</p>

          {/* Reaction Buttons */}
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                liked
                  ? "bg-blue-100 text-blue-600"
                  : darkMode
                  ? "hover:bg-neutral-700 text-neutral-400"
                  : "hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span className="text-sm">{reactions.like}</span>
            </button>

            <button
              onClick={handleClap}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
                clapped
                  ? "bg-green-100 text-green-600"
                  : darkMode
                  ? "hover:bg-neutral-700 text-neutral-400"
                  : "hover:bg-neutral-100 text-neutral-600"
              }`}
            >
              👏 <span className="text-sm">{reactions.clap}</span>
            </button>
          </div>

          {/* Footer / Comments Toggle */}
          <div className="flex items-center gap-4 text-sm mb-3">
            <button
              onClick={() => setShowComments(prev => !prev)}
              className={`flex items-center gap-1.5 ${darkMode ? "text-neutral-400 hover:text-neutral-200" : "text-neutral-600 hover:text-neutral-900"} transition-colors`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>{commentList.length} comments</span>
            </button>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className={`mt-4 p-4 rounded-xl border ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-white border-neutral-200"} space-y-3`}>
              
              {/* Existing Comments */}
              {commentList.map((comment, index) => (
                <div key={index} className="flex items-start gap-3">
                  <img src={comment.avatar || `https://i.pravatar.cc/100?img=${index + 10}`} alt={comment.user} className="w-8 h-8 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{comment.user}</p>
                    <p className={`text-sm ${darkMode ? "text-neutral-300" : "text-neutral-700"}`}>{comment.text}</p>
                  </div>
                </div>
              ))}

              {/* Add New Comment */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className={`flex-1 px-3 py-2 rounded-lg border ${darkMode ? "bg-neutral-700 border-neutral-600 text-white" : "bg-neutral-100 border-neutral-300"} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
