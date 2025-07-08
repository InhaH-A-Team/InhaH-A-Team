import React from 'react';
import './AnimalCard.css';
import { useNavigate } from 'react-router-dom';

export default function AnimalCard({ animal }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/details/${animal.id}`);
  };

  return (
    <div className="animal-card" onClick={handleClick} style={{ cursor: 'pointer' }}>
      <div className="image-box">이미지</div>
      <p>{animal.title}</p>
    </div>
  );
}
