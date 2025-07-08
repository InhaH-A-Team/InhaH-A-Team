import React, { useState, useEffect } from 'react';
import './FavoriteButton.css';

function FavoriteButton({ animal }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    setIsFavorite(favorites.some(item => item.id === animal?.id));
  }, [animal]);

  const handleToggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const newFavorites = favorites.filter(item => item.id !== animal.id);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(false);
    } else {
      const newFavorites = [...favorites, { id: animal.id, title: animal.title }];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      setIsFavorite(true);
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