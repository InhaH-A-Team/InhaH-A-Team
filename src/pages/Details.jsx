import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import FavoriteButton from '../components/FavoriteButton';
import { fetchPostDetail, fetchComments, createComment, deleteComment, deletePost } from '../api';
import './Details.css';

const BASE_URL = "https://youyeon.p-e.kr";
const getImageUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith('http')) return photo;
  return `${BASE_URL}${photo}`;
};

function Details() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();


  const currentUserId = localStorage.getItem("user_id");
  const isAuthor = String(currentUserId) === String(animal?.user);

  useEffect(() => {
    // 📌 post 객체 안에 진짜 데이터 있음
    fetchPostDetail(id).then(res => {
      console.log("📦 Post detail API 응답:", res);
      if (res && res.post) {
        console.log("post 객체 구조:", res.post);
        // id가 없으면 라우터의 id라도 강제로 넣어줌
        const postObj = { ...res.post };
        postObj.id = res.post.id || res.post.post_id || res.post.pk || id;
        setAnimal(postObj);
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
    try {
      console.log('댓글 등록 시 post id:', id, '내용:', text);
      const response = await createComment(id, text);
      console.log('댓글 등록 응답:', response);
      // 댓글 등록 후 목록 새로고침
      const updatedComments = await fetchComments(id);
      setComments(Array.isArray(updatedComments) ? updatedComments : []);
    } catch (error) {
      alert('댓글 등록에 실패했습니다. 다시 시도해 주세요.');
      console.error('댓글 등록 에러:', error);
    }
  };

  const handleDeletePost = async () => {
  if (!window.confirm("정말 이 게시글을 삭제하시겠습니까?")) return;

  try {
    const res = await deletePost(id);
    if (res.ok) {
      alert("게시물이 삭제되었습니다.");
      navigate("/"); // 삭제 후 메인 페이지로 이동
    } else {
      const err = await res.json();
      alert(err.message || "삭제에 실패했습니다.");
    }
  } catch (err) {
    console.error("삭제 에러:", err);
    alert("삭제 도중 오류가 발생했습니다.");
  }
};

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteComment(commentId);
      // 204 No Content: 성공
      if (res.status === 204) {
        setComments(prev => prev.filter(comment => comment.id !== commentId));
      } else {
        // 실패 응답(json) 파싱
        const data = await res.json();
        if (data && data.error) {
          alert(data.error);
        } else {
          alert('댓글 삭제에 실패했습니다.');
        }
      }
    } catch (error) {
      alert('댓글 삭제 중 오류가 발생했습니다.');
      console.error('댓글 삭제 에러:', error);
    }
  };

  if (!animal) {
    return navigate('/login');
  }
  return (
    <div className="details-container">
      <Nav />
      <div className="details-inner">
      <div className="details-title">
        {animal.title}

        {isAuthor ? (
          <button onClick={handleDeletePost} className="delete-post-btn">
            글 삭제
          </button>
        ) : (
          <FavoriteButton animal={animal} />
        )}
        </div>
        <div className="details-content-row">
          <div className="details-left">
            <div className="details-image-preview">
              {animal.photo ? (
                <img src={getImageUrl(animal.photo)} alt="동물" />
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
            <div style={{ marginBottom: '10px', color: '#555' }}>
              <strong>작성자:</strong> {animal.user_nickname || '익명'}
            </div>
            <div style={{ marginBottom: '10px', color: '#555' }}>
              <strong>전화번호:</strong> {animal.phone_number || '-'}
            </div>
            <div style={{ marginBottom: '10px', color: '#555' }}>
              <strong>제공자 유형:</strong> {animal.provider_type || '-'}
            </div>
            <div style={{ marginBottom: '10px', color: '#555' }}>
              <strong>건강상태:</strong> {animal.health_status || '-'}
            </div>
            <div style={{ marginBottom: '10px', color: '#222' }}>
              <strong>내용:</strong><br />
              {animal.contents}
            </div>
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
