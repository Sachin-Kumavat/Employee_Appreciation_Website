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
  comments = []
}: FeedItemProps) {

  const [data] = useState({
    senderName: appreciation.from || "Anonymous",
    senderAvatar: appreciation.image_url || "https://i.pravatar.cc/100?img=5",
    receiverNames: appreciation.receiver_names || [],
    message: appreciation.message || "",
    timestamp: appreciation.date || new Date().toISOString(),
    reactions: appreciation.reactions || { like: 0, clap: 0 },
    likedBy: appreciation.likedBy || [],
    clappedBy: appreciation.clappedBy || [],
    comments: comments || [],
  });

  const [liked, setLiked] = useState(false);
  const [clapped, setClapped] = useState(false);
  const [reactions, setReactions] = useState({
    like: 0 ,
    clap: 0,
  });

  const [showComments, setShowComments] = useState(false);
  const [commentList, setCommentList] = useState<Comment[]>(data.comments || []);
  const [newComment, setNewComment] = useState("");

  const handleLike = () => {
    setLiked(prev => !prev);
    setReactions(prev => ({ ...prev, like: prev.like + (liked ? -1 : 1) }));
  };

  const handleClap = () => {
    setClapped(prev => !prev);
    setReactions(prev => ({ ...prev, clap: prev.clap + (clapped ? -1 : 1) }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj: Comment = {
      user: "Current User",
      text: newComment,
      avatar: "https://i.pravatar.cc/100?img=6"
    };

    setCommentList(prev => [...prev, newCommentObj]);
    setNewComment("");
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / 3600000);

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div
      className={`
        ${!compact && "p-6 border rounded-xl"}
        ${darkMode ? "border-neutral-700 bg-neutral-900" : "border-neutral-200 bg-white"}
        transition-colors duration-200
      `}
    >
      <div className="flex items-start gap-3 w-full">

        {/* Sender Avatar */}
        <img
          src={data.senderAvatar}
          alt={data.senderName}
          className="w-10 h-10 rounded-full object-cover"
        />

        {/* Right Side Content */}
        <div className="flex-1 min-w-0">

          {/* Header */}
          <div className="mb-2">
            <p className={darkMode ? "text-white" : "text-neutral-900"}>
              <span className="font-medium">{data.senderName}</span>
              <span className={darkMode ? "text-neutral-400" : "text-neutral-600"}>
                {" "}appreciated{" "}
              </span>

              {data.receiverNames.map((name, index) => (
                <span key={index}>
                  <span className="font-medium text-blue-600">{name}</span>
                  {index < data.receiverNames.length - 1 && ", "}
                </span>
              ))}
            </p>

            <p className={`text-xs ${darkMode ? "text-neutral-400" : "text-neutral-500"}`}>
              {formatTimeAgo(data.timestamp)}
            </p>
          </div>

          {/* MESSAGE FIXED HERE */}
          <p
            className={`
              ${darkMode ? "text-neutral-300" : "text-neutral-700"}
              mb-4
              whitespace-pre-wrap
              break-words
              leading-relaxed
            `}
          >
            {data.message}
          </p>

          {/* Reactions */}
          <div className="flex items-center gap-4 mb-3">
            <button
              onClick={handleLike}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all
                ${liked
                  ? "bg-blue-100 text-blue-600"
                  : darkMode
                    ? "hover:bg-neutral-700 text-neutral-400"
                    : "hover:bg-neutral-100 text-neutral-600"}
              `}
            >
              <ThumbsUp className="w-4 h-4" /> {reactions.like}
            </button>

            <button
              onClick={handleClap}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all
                ${clapped
                  ? "bg-green-100 text-green-600"
                  : darkMode
                    ? "hover:bg-neutral-700 text-neutral-400"
                    : "hover:bg-neutral-100 text-neutral-600"}
              `}
            >
              👏 {reactions.clap}
            </button>
          </div>

          {/* Toggle Comments */}
          <button
            onClick={() => setShowComments(prev => !prev)}
            className={`
              flex items-center gap-1.5 mb-3 text-sm
              ${darkMode ? "text-neutral-400 hover:text-neutral-200" : "text-neutral-600 hover:text-neutral-900"}
            `}
          >
            <MessageCircle className="w-4 h-4" />
            {commentList.length} comments
          </button>

          {/* COMMENT SECTION */}
          {showComments && (
            <div
              className={`
                mt-4 p-4 rounded-xl border space-y-3
                ${darkMode ? "bg-neutral-800 border-neutral-700" : "bg-neutral-50 border-neutral-200"}
              `}
            >
              {commentList.map((comment, index) => (
                <div key={index} className="flex items-start gap-3">
                  <img
                    src={comment.avatar || `https://i.pravatar.cc/100?img=${index + 10}`}
                    alt={comment.user}
                    className="w-8 h-8 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{comment.user}</p>
                    <p className={`text-sm ${darkMode ? "text-neutral-300" : "text-neutral-700"}`}>
                      {comment.text}
                    </p>
                  </div>
                </div>
              ))}

              {/* Add new comment */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className={`
                    flex-1 px-3 py-2 rounded-lg border
                    ${darkMode
                      ? "bg-neutral-700 border-neutral-600 text-white"
                      : "bg-white border-neutral-300"}
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  `}
                />
                <button
                  onClick={handleAddComment}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
