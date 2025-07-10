import React, { useState } from 'react';
import './CommentForm.css';

function CommentForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="댓글을 입력하세요"
        className="comment-input"
      />
      <button type="submit" className="comment-submit-btn">
        등록
      </button>
    </form>
  );
}

export default CommentForm;