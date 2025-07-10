import React from 'react';
import './AnimalCard.css';
import { useNavigate } from 'react-router-dom';

export default function AnimalCard({ animal }) {
  const navigate = useNavigate();

  const handleClick = () => {
  const id = animal.id || animal.post_id;  // 둘 중 하나 fallback
  if (!id) {
    console.error("❗ AnimalCard Error: ID가 없습니다.", animal);
    return;
  }
  navigate(`/details/${id}`);
};

  return (
    <div className="animal-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="image-box">
        {animal.photo ? (
          <img
            src={animal.photo}
            alt="동물 이미지"
            className="animal-image"
            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
          />
        ) : (
          <div className="image-placeholder">이미지 없음</div>
        )}
      </div>
      <div className="animal-info">
        <h3>{animal.title}</h3>
        <p>{animal.species} | {animal.gender} | {animal.age}살</p>
        <p>{animal.address}</p>
      </div>
    </div>
  );
}

