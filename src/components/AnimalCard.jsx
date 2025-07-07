import React from 'react';
import './AnimalCard.css';

export default function AnimalCard({ animal }) {
  return (
    <div className="animal-card">
      <div className="image-box">이미지</div>
      <p>{animal.title}</p>
    </div>
  );
}
