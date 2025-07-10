import React, { useEffect, useState } from 'react';
import './FavoriteDropdown.css';
import { fetchFavoritePosts } from '../api';

function FavoriteDropdown({ onClose, style }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavoritePosts()
      .then(data => {
        console.log("즐겨찾기 API 응답:", data);
        console.log("응답 타입:", typeof data);
        console.log("배열인가?", Array.isArray(data));
        
        let favoritesData = [];
        
        // 다양한 응답 구조 처리
        if (Array.isArray(data)) {
          favoritesData = data;
        } else if (data && Array.isArray(data.favorites)) {
          favoritesData = data.favorites;
        } else if (data && Array.isArray(data.data)) {
          favoritesData = data.data;
        } else if (data && data.results && Array.isArray(data.results)) {
          favoritesData = data.results;
        } else if (data && typeof data === 'object') {
          // 객체인 경우 키들을 확인
          console.log("객체 키들:", Object.keys(data));
          favoritesData = [];
        }
        
        console.log("처리된 즐겨찾기 데이터:", favoritesData);
        setFavorites(favoritesData);
      })
      .catch(error => {
        console.error("즐겨찾기 로딩 오류:", error);
        setFavorites([]);
      })
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
              <a href={`/details/${item.post || item.post_id || item.id}`}>
                {item.post_title || item.title || `게시글 ${item.post || item.post_id || item.id}`}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteDropdown;