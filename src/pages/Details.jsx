import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Nav from '../components/Nav';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FavoriteButton from '../components/FavoriteButton';
import { fetchPostDetail, fetchComments, createComment, deleteComment } from '../api';
import './Details.css';

function Details() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 📌 post 객체 안에 진짜 데이터 있음
    fetchPostDetail(id).then(res => {
      console.log("📦 Post detail API 응답:", res);
      if (res && res.post) {
        setAnimal(res.post);
      } else {
        setAnimal(null);
      }
    });

    // 📌 댓글은 post_id 기준
    fetchComments(id).then(res => {
      console.log("💬 Comments API 응답:", res);
      setComments(Array.isArray(res) ? res : []);
    });
  }, [id]);

  const handleAddComment = async (text) => {
    const newComment = await createComment({ post: id, text });
    setComments(prev => [...prev, newComment]);
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  if (!animal) {
    return (
      <div className="details-container">
        <Nav />
        <div className="details-inner">
          <div className="details-title">존재하지 않는 게시글입니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Nav />
      <div className="details-inner">
        <div className="details-title">
          {animal.title}
          <FavoriteButton animal={animal} />
        </div>
        <div className="details-content-row">
          <div className="details-left">
            <div className="details-image-preview">
              {animal.photo ? (
                <img src={animal.photo} alt="동물" />
              ) : (
                <>이미지<br />미리보기</>
              )}
            </div>
            <div className="details-info">
              <div>나이: {animal.age}살</div>
              <div>성별: {animal.gender}</div>
              <div>종: {animal.species}</div>
              <div>지역: {animal.address}</div>
            </div>
          </div>
          <div className="details-main-content">
            {animal.contents}
          </div>
        </div>
        <div className="comments-box">
          {comments.length === 0 ? (
            <div className="no-comments">아직 댓글이 없습니다</div>
          ) : (
            <CommentList comments={comments} onDelete={handleDeleteComment} />
          )}
          <CommentForm onAdd={handleAddComment} />
        </div>
      </div>
    </div>
  );
}

export default Details;
