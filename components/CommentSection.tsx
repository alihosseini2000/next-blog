'use client';

import { useState, useEffect } from 'react';
import User from '@/components/User';
import { IComment } from '@/utils/interface';

interface CommentSectionProps {
  postId: number;
  initialComments: IComment[];
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, initialComments }) => {
  const [comments, setComments] = useState<IComment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  // Fetch comments on component mount (if needed)
  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`http://localhost:8000/comments?id=${postId}`);
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      }
    }
    fetchComments();
  }, [postId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    const commentData = {
      postId,
      userId: 1, // Replace with actual logged-in user ID
      comment: newComment,
    };

    const response = await fetch('http://localhost:8000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    if (response.ok) {
      const addedComment = await response.json();
      setComments((prev) => [...prev, addedComment]); // Update state
      setNewComment(''); // Clear input field
    } else {
      console.error('Failed to add comment');
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Comments</h3>

      {/* Add Comment Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Comment
        </button>
      </div>

      {/* Display Comments */}
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mt-4 p-4 bg-gray-50 rounded-lg">
            <User userId={comment.userId} />
            <p className="text-gray-600 mt-2 text-sm">{comment.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 mt-4">No comments yet.</p>
      )}
    </div>
  );
};

export default CommentSection;