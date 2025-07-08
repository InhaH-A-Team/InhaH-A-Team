import React from 'react';
import './CommentList.css';

function CommentList({ comments, onDelete }) {
  // API 연동 시 서버에서 댓글 리스트 받아오기 + onDelete도 서버에 삭제 요청하도록 수정

  return (
    <div>
      {comments.map(comment => (
        <div className="details-comment" key={comment.id}>
          {comment.text}
          <button
            className="comment-delete-btn"
            onClick={() => {
              // API 연동 시 서버에 댓글 삭제 요청
              onDelete(comment.id);
            }} 
          >
            삭제
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentList;