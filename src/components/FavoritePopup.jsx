import React from 'react';
import './FavoritePopup.css';

function FavoritePopup({ onClose }) {
  // 예시: localStorage에서 즐겨찾기 목록 불러오기
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  return (
    <div className="favorite-popup-backdrop" onClick={onClose}>
      <div className="favorite-popup" onClick={e => e.favoritePropagation()}>
        <button className="favorite-popup-close" onClick={onClose}>×</button>
        <h3>즐겨찾기한 게시글</h3>
        {favorites.length === 0 ? (
          <div className="favorite-popup-empty">즐겨찾기한 게시글이 없습니다.</div>
        ) : (
          <ul>
            {favorites.map(item => (
              <li key={item.id}>
                <a href={`/details/${item.id}`}>{item.title}</a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default FavoritePopup;