import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Nav from '../components/Nav';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FavoriteButton from '../components/FavoriteButton';

// 추후 API 연동시 서버 데이터로 대체
const mockData = [
  { id: 1, title: '2살 수컷 고양이 분양합니다', type: '고양이', region: '서울', gender: '수컷', age: 2 },
  { id: 2, title: '4살 암컷 강아지 분양합니다', type: '강아지', region: '경기도', gender: '암컷', age: 4 },
  { id: 3, title: '1살 수컷 기타 분양합니다', type: '기타', region: '부산', gender: '수컷', age: 1 },
  { id: 4, title: '9살 암컷 고양이 분양합니다', type: '고양이', region: '서울', gender: '암컷', age: 9 },
  { id: 5, title: '3살 수컷 강아지 분양합니다', type: '강아지', region: '대전', gender: '수컷', age: 3 },
  { id: 6, title: '5살 암컷 기타 분양합니다', type: '기타', region: '광주', gender: '암컷', age: 5 },
  { id: 7, title: '10살 수컷 고양이 분양합니다', type: '고양이', region: '인천', gender: '수컷', age: 10 },
  { id: 8, title: '6살 암컷 강아지 분양합니다', type: '강아지', region: '제주도', gender: '암컷', age: 6 },
];

function Details() {
  const { id } = useParams();

  // API 연동 시 animal을 서버에서 받아온 데이터로 설정
  const animal = mockData.find((item) => String(item.id) === id);

  // API 연동 시 댓글도 서버에서 받아오고, 저장 및 삭제도 서버로 요청
  const getStoredComments = () => {
    const saved = localStorage.getItem(`comments_${id}`);
    return saved ? JSON.parse(saved) : [];
  };

  const [comments, setComments] = useState(getStoredComments);

  useEffect(() => {
    // API 연동 시 서버로 댓글 저장 요청
    localStorage.setItem(`comments_${id}`, JSON.stringify(comments));
  }, [comments, id]);

  const handleAddComment = (text) => {
    // API 연동 시 서버로 댓글 추가 요청
    setComments(prev => [
      ...prev,
      { id: Date.now(), text }
    ]);
  };

  const handleDeleteComment = (commentId) => {
    // API 연동 시 서버로 댓글 삭제 요청
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
            {/* API 연동 시 본문 내용 받아와서 출력 */}
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