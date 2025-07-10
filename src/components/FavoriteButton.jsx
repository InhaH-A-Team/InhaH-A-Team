import React, { useState, useEffect } from 'react';
import './FavoriteButton.css';
import { createFavorite, deleteFavorite, fetchFavorites } from '../api';

function FavoriteButton({ animal }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!animal) return;
    fetchFavorites()
      .then(favorites => {
        setIsFavorite(Array.isArray(favorites) && favorites.some(item => item.id === animal.id));
      })
      .catch(() => setIsFavorite(false));
  }, [animal]);

  const handleToggleFavorite = async () => {
    if (!animal) return;
    try {
      if (isFavorite) {
        await deleteFavorite(animal.id);
        setIsFavorite(false);
      } else {
        await createFavorite(animal.id);
        setIsFavorite(true);
      }
    } catch (e) {
      alert('즐겨찾기 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <button
      className={`favorite-btn${isFavorite ? ' active' : ''}`}
      onClick={handleToggleFavorite}
    >
      {isFavorite ? '★ 즐겨찾기됨' : '☆ 즐겨찾기'}
    </button>
  );
}

export default FavoriteButton;