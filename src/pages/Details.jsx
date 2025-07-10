import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Nav from '../components/Nav';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FavoriteButton from '../components/FavoriteButton';
import { fetchPostDetail, fetchComments, createComment, deleteComment } from '../api';

function Details() {
  const { id } = useParams();

  // 게시글 상세 정보 상태
  const [animal, setAnimal] = useState(null);
  // 댓글 목록 상태
  const [comments, setComments] = useState([]);

  // 컴포넌트 마운트 시 게시글 상세와 댓글 목록을 API로부터 불러옴
  useEffect(() => {
    // 게시글 상세 정보 불러오기
    fetchPostDetail(id).then(data => setAnimal(data));
    // 댓글 목록 불러오기
    fetchComments(id).then(data => setComments(Array.isArray(data) ? data : []));
  }, [id]);

  // 댓글 추가 시 서버에 등록 후 목록 갱신
  const handleAddComment = async (text) => {
    // createComment는 { post, text } 형태로 데이터 전달 필요
    const newComment = await createComment({ post: id, text });
    setComments(prev => [...prev, newComment]);
  };

  // 댓글 삭제 시 서버에 삭제 요청 후 목록 갱신
  const handleDeleteComment = async (commentId) => {
    await deleteComment(commentId);
    setComments(prev => prev.filter(comment => comment.id !== commentId));
  };

  // 게시글 데이터가 없을 때 예외 처리
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
              이미지<br />미리보기
            </div>
            <div className="details-info">
              <div>나이: {animal.age}살</div>
              <div>성별: {animal.gender}</div>
              <div>종: {animal.type}</div>
              <div>지역: {animal.region}</div>
            </div>
          </div>
          <div className="details-main-content">
            {/* 게시글 본문 내용 출력 */}
            {animal.content}
          </div>
        </div>
        <div className="comments-box">
          {/* 댓글이 없을 때와 있을 때 분기 */}
          {comments.length === 0 ? (
            <div className="no-comments">아직 댓글이 없습니다</div>
          ) : (
            <CommentList comments={comments} onDelete={handleDeleteComment} />
          )}
          {/* 댓글 작성 폼 */}
          <CommentForm onAdd={handleAddComment} />
        </div>
      </div>
    </div>
  );
}

export default Details;