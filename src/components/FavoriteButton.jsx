import React, { useState, useEffect } from 'react';
import './FavoriteButton.css';
import { createFavorite, deleteFavorite, fetchFavorites } from '../api';

function FavoriteButton({ animal }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [loading, setLoading] = useState(false);

  const refreshFavoriteState = () => {
    if (!animal) return;
    fetchFavorites()
      .then(favorites => {
        let favoritesData = [];
        if (Array.isArray(favorites)) {
          favoritesData = favorites;
        } else if (favorites && Array.isArray(favorites.favorites)) {
          favoritesData = favorites.favorites;
        } else if (favorites && Array.isArray(favorites.data)) {
          favoritesData = favorites.data;
        } else if (favorites && favorites.results && Array.isArray(favorites.results)) {
          favoritesData = favorites.results;
        }
        const favorite = favoritesData.find(item => {
          const postId = item.post || item.post_id || item.id;
          return postId == animal.id;
        });
        setIsFavorite(!!favorite);
        setFavoriteId(favorite ? favorite.id : null);
      })
      .catch(() => {
        setIsFavorite(false);
        setFavoriteId(null);
      });
  };

  useEffect(() => {
    refreshFavoriteState();
    // eslint-disable-next-line
  }, [animal]);

  const handleToggleFavorite = async () => {
    console.log('버튼 클릭됨, animal:', animal, 'isFavorite:', isFavorite, 'favoriteId:', favoriteId, 'loading:', loading);
    if (!animal || loading) return;
    if (!animal.id) {
      alert('게시글 ID가 없습니다. 새로고침 해보세요.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      if (isFavorite) {
        await deleteFavorite(favoriteId);
      } else {
        await createFavorite(animal.post_id || animal.id);
      }
      await refreshFavoriteState();
    } catch (e) {
      console.error('즐겨찾기 토글 에러:', e);
      alert('즐겨찾기 처리 중 오류가 발생했습니다.');
    }
    setLoading(false);
  };

  return (
    <button
      className={`favorite-btn${isFavorite ? ' active' : ''}`}
      onClick={handleToggleFavorite}
      disabled={loading}
      style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
    >
      {isFavorite ? '★ 즐겨찾기됨' : '☆ 즐겨찾기'}
    </button>
  );
}

export default FavoriteButton;