import React from 'react';
import './CommentList.css';

function CommentList({ comments, onDelete }) {
  return (
    <div>
      {comments.map(comment => (
        <div className="details-comment" key={comment.id}>
          {comment.text}
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