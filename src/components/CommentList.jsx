import React from 'react';
import './CommentList.css';

function CommentList({ comments, onDelete }) {
  // comments: [{ id, text, author, created_at, ... }]
  // onDelete: (commentId) => {}

  return (
    <div>
      {comments.map(comment => {
        console.log(comment);
        return (
          <div className="details-comment" key={comment.id}>
            <div className="comment-meta">
              <span className="comment-author">{comment.user?.nick_name || '익명'}</span>
              <span className="comment-date">{comment.create_at ? comment.create_at.slice(0, 16).replace('T', ' ') : ''}</span>
            </div>
            <div className="comment-text">{comment.contents}</div>
            <button
              className="comment-delete-btn"
              onClick={() => onDelete(comment.id)}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default CommentList;