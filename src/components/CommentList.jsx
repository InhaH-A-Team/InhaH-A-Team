import React from 'react';
import './CommentList.css';

function CommentList({ comments, onDelete }) {
  // comments: [{ id, text, author, created_at, ... }]
  // onDelete: (commentId) => {}

  return (
    <div>
      {comments.map(comment => (
        <div className="details-comment" key={comment.id}>
          <div className="comment-meta">
            <span className="comment-author">{comment.author || '익명'}</span>
            <span className="comment-date">{comment.created_at ? comment.created_at.slice(0, 16).replace('T', ' ') : ''}</span>
          </div>
          <div className="comment-text">{comment.text || comment.content}</div>
          <button
            className="comment-delete-btn"
            onClick={() => onDelete(comment.id)}
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentList;