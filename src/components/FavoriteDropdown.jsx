import React, { useEffect, useState } from 'react';
import './FavoriteDropdown.css';
import { fetchFavoritePosts } from '../api'; // 실제 API 함수로 교체

function FavoriteDropdown({ onClose, style }) {
  // API 연동: 서버에서 즐겨찾기 리스트 받아오기
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 실제 API 연동 시 fetchFavoritePosts() 사용
    fetchFavoritePosts()
      .then(data => setFavorites(Array.isArray(data) ? data : []))
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="favorite-dropdown" style={style}>
      <button className="favorite-dropdown-close" onClick={onClose}>×</button>
      <h4 style={{ margin: '8px 0 12px 0' }}>즐겨찾기한 게시글</h4>
      {loading ? (
        <div className="favorite-dropdown-empty">로딩 중...</div>
      ) : favorites.length === 0 ? (
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

export default FavoriteDropdown;