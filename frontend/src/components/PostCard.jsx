import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const PostCard = ({ post, onLike, onAddComment, onDeleteComment }) => {
  const { authUser } = useAuthStore();
  const userId = authUser?._id;
  const [showAllComments, setShowAllComments] = useState(false);
  const commentsToShow = showAllComments ? post.comments : post.comments?.slice(-3);
  const liked = post.likes?.some(id => id === userId);

  return (
    <article className="bg-white rounded-2xl shadow-md border border-gray-200 mb-10 max-w-xl mx-auto transition-shadow duration-300 hover:shadow-lg">
      {/* Artist Header */}
      <header className="flex items-center justify-between p-5 border-b border-gray-100">
        <a
          href={`/artist/${post.artist._id}`}
          className="flex items-center space-x-4 group"
          aria-label={`Visit ${post.artist.fullname} profile`}
        >
          <img
            src={post.artist.profilePic || '/default-profile.png'}
            alt={post.artist.fullname}
            className="w-12 h-12 rounded-full object-cover border-2 border-teal-500 transition-transform group-hover:scale-105"
          />
          <span className="font-semibold text-gray-900 text-lg hover:text-teal-600 transition">{post.artist.fullname}</span>
        </a>
      </header>

      {/* Media */}
      <div className="bg-gray-900 rounded-b-2xl overflow-hidden max-h-[520px]">
        {post.mediaType === 'image' ? (
          <img
            src={post.mediaUrl}
            alt="Artist post media"
            className="w-full object-cover max-h-[500px] transition-transform hover:scale-105"
          />
        ) : (
          <video
            src={post.mediaUrl}
            controls
            className="w-full object-cover max-h-[500px] rounded-b-2xl"
          />
        )}
      </div>

      {/* Caption & Category */}
      <section className="p-5 space-y-1">
        <p className="text-gray-800 font-medium text-base leading-relaxed">{post.caption}</p>
        <p className="text-xs text-teal-600 italic font-semibold">#{post.category}</p>
      </section>

      {/* Action Buttons */}
      <section className="flex items-center justify-between px-5 pb-4">
        <button
          onClick={() => onLike(post._id)}
          className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
            liked ? 'text-teal-600' : 'text-gray-600 hover:text-teal-600'
          }`}
          title={authUser ? (liked ? 'Unlike' : 'Like') : 'Login to like'}
          aria-pressed={liked}
          aria-label={liked ? 'Unlike post' : 'Like post'}
        >
          <span className="text-lg">❤️</span> {post.likes?.length || 0}
        </button>

        <button
          onClick={() => onAddComment(post._id)}
          className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-teal-600 transition-colors"
          title={authUser ? 'Add comment' : 'Login to comment'}
          aria-label="Add comment"
        >
          <span className="text-lg">💬</span> {post.comments?.length || 0}
        </button>
      </section>

      {/* Comments Section */}
      <section className="px-5 pb-6">
        {post.comments?.length > 3 && (
          <button
            onClick={() => setShowAllComments(!showAllComments)}
            className="text-xs text-teal-500 hover:underline font-semibold mb-3"
            aria-expanded={showAllComments}
            aria-controls={`comments-${post._id}`}
          >
            {showAllComments ? 'Hide comments' : `View all ${post.comments.length} comments`}
          </button>
        )}

        <div id={`comments-${post._id}`} className="space-y-2 max-h-40 overflow-y-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-gray-100">
          {commentsToShow?.length > 0 ? (
            commentsToShow.map((comment, idx) => (
              <div
                key={comment._id || idx}
                className="flex justify-between items-start text-sm text-gray-700 bg-gray-50 rounded-lg p-2 shadow-sm"
              >
                <div>
                  <span className="font-semibold text-gray-900">{comment.user?.fullname || 'Unknown'}:</span>{' '}
                  <span>{comment.text}</span>
                </div>
                {comment.user?._id === userId && (
                  <button
                    onClick={() => onDeleteComment(post._id, comment._id)}
                    className="text-red-500 text-xs ml-3 hover:underline transition"
                    title="Delete comment"
                    aria-label="Delete comment"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic text-center text-sm">No comments yet</p>
          )}
        </div>
      </section>
    </article>
  );
};

export default PostCard;
