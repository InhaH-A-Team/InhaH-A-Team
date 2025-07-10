import React from 'react';
import './AnimalCard.css';
import { useNavigate } from 'react-router-dom';

export default function AnimalCard({ animal }) {
  const navigate = useNavigate();

  // 데이터 검증
  if (!animal || !animal.post_id) {
    console.warn('유효하지 않은 animal 데이터:', animal);
    return null;
  }

  const handleClick = () => {
    navigate(`/details/${animal.post_id}`);
  };

  // 이미지 URL 생성 (서버에서 받은 이미지 URL 사용)
  const getImageUrl = () => {
    if (animal.photo) {
      // 절대 URL인 경우 그대로 사용
      if (animal.photo.startsWith('http')) {
        return animal.photo;
      }
      // 상대 경로인 경우 BASE_URL과 결합
      if (animal.photo.startsWith('/')) {
        return `https://youyeon.p-e.kr${animal.photo}`;
      }
      // 파일명만 있는 경우 media 폴더 경로 사용
      return `https://youyeon.p-e.kr/media/${animal.photo}`;
    }
    // 기본 이미지 반환 (public 폴더의 이미지 사용)
    return '/myicon.png';
  };

  return (
    <div className="animal-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="image-box">
        <img 
          src={getImageUrl()} 
          alt={animal.title || '동물 이미지'} 
          onError={(e) => {
            console.log('이미지 로드 실패:', e.target.src);
            e.target.src = '/myicon.png';
            e.target.onerror = null; // 무한 루프 방지
          }}
        />
      </div>
      <p>{animal.title}</p>
    </div>
  );
}