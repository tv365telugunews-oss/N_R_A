import { useState } from 'react';
import { X, Send, ThumbsUp, Reply, Flag, MoreVertical } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  isOpen: boolean;
  onClose: () => void;
  newsId: string;
  newsTitle: string;
}

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Rajesh Kumar',
    avatar: 'RK',
    content: 'Very informative article! Thanks for sharing this important news.',
    timestamp: '2 hours ago',
    likes: 24,
    replies: [
      {
        id: '1-1',
        author: 'Priya Sharma',
        avatar: 'PS',
        content: 'I agree! Great coverage.',
        timestamp: '1 hour ago',
        likes: 5
      }
    ]
  },
  {
    id: '2',
    author: 'Amit Patel',
    avatar: 'AP',
    content: 'This needs more attention. Everyone should know about this.',
    timestamp: '5 hours ago',
    likes: 18
  },
  {
    id: '3',
    author: 'Sneha Gupta',
    avatar: 'SG',
    content: 'खूब अच्छी खबर। धन्यवाद!',
    timestamp: '1 day ago',
    likes: 32
  }
];

export function CommentsSection({ isOpen, onClose, newsId, newsTitle }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());

  if (!isOpen) return null;

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'ME',
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };

    if (replyingTo) {
      // Add as reply
      setComments(comments.map(c => {
        if (c.id === replyingTo) {
          return {
            ...c,
            replies: [...(c.replies || []), comment]
          };
        }
        return c;
      }));
      setReplyingTo(null);
    } else {
      // Add as new comment
      setComments([comment, ...comments]);
    }

    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);
  };

  const CommentItem = ({ comment, isReply = false }: { comment: Comment; isReply?: boolean }) => {
    const isLiked = likedComments.has(comment.id);

    return (
      <div className={`${isReply ? 'ml-12 mt-3' : 'mb-4'}`}>
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            {comment.avatar}
          </div>
          <div className="flex-1">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sm text-[#212121] dark:text-white">
                  {comment.author}
                </span>
                <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                  <MoreVertical size={14} className="text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">{comment.content}</p>
            </div>
            
            <div className="flex items-center gap-4 mt-2 ml-3">
              <button
                onClick={() => handleLike(comment.id)}
                className={`flex items-center gap-1 text-xs font-medium ${
                  isLiked ? 'text-[#D32F2F]' : 'text-gray-500'
                }`}
              >
                <ThumbsUp size={14} fill={isLiked ? '#D32F2F' : 'none'} />
                {comment.likes + (isLiked ? 1 : 0)}
              </button>
              {!isReply && (
                <button
                  onClick={() => setReplyingTo(comment.id)}
                  className="flex items-center gap-1 text-xs font-medium text-gray-500"
                >
                  <Reply size={14} />
                  Reply
                </button>
              )}
              <button className="flex items-center gap-1 text-xs font-medium text-gray-500">
                <Flag size={14} />
                Report
              </button>
              <span className="text-xs text-gray-400">{comment.timestamp}</span>
            </div>

            {/* Replies */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-3">
                {comment.replies.map(reply => (
                  <CommentItem key={reply.id} comment={reply} isReply={true} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full h-[90vh] max-w-2xl bg-white dark:bg-[#1E1E1E] rounded-t-3xl shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
          <div>
            <h3 className="text-lg font-bold text-[#212121] dark:text-white">Comments</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{comments.length} comments</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4">
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))}

          {comments.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No comments yet. Be the first to comment!</p>
            </div>
          )}
        </div>

        {/* Comment Input */}
        <div className="border-t dark:border-gray-700 p-4 bg-white dark:bg-[#1E1E1E]">
          {replyingTo && (
            <div className="mb-2 flex items-center justify-between bg-blue-50 dark:bg-blue-900/20 px-3 py-2 rounded-lg">
              <span className="text-sm text-blue-600 dark:text-blue-400">
                Replying to {comments.find(c => c.id === replyingTo)?.author}
              </span>
              <button
                onClick={() => setReplyingTo(null)}
                className="text-blue-600 dark:text-blue-400"
              >
                <X size={16} />
              </button>
            </div>
          )}
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D32F2F] flex items-center justify-center text-white font-bold text-sm">
              ME
            </div>
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handlePostComment()}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#D32F2F] text-[#212121] dark:text-white"
              />
              <button
                onClick={handlePostComment}
                disabled={!newComment.trim()}
                className="w-10 h-10 rounded-full bg-[#D32F2F] hover:bg-[#B71C1C] disabled:bg-gray-300 flex items-center justify-center transition-colors"
              >
                <Send size={18} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
