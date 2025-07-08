import React from 'react';
import './FavoriteDropdown.css';

function FavoriteDropdown({ onClose, style }) {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

  return (
    <div
      className="favorite-dropdown"
      style={style}
    >
      <button className="favorite-dropdown-close" onClick={onClose}>×</button>
      <h4 style={{ margin: '8px 0 12px 0' }}>즐겨찾기한 게시글</h4>
      {favorites.length === 0 ? (
        <div className="favorite-dropdown-empty">즐겨찾기한 게시글이 없습니다.</div>
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
  );
}

export default FavoritePopup;