import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchFavoritePosts, fetchPostDetail } from '../api';
import Nav from '../components/Nav';
import './FavoritePage.css';

const BASE_URL = "https://youyeon.p-e.kr";
const getImageUrl = (photo) => {
  if (!photo) return null;
  if (photo.startsWith('http')) return photo;
  return `${BASE_URL}${photo}`;
};

function FavoritePage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFavoritePosts()
      .then(async data => {
        let favoritesData = [];
        if (Array.isArray(data)) {
          favoritesData = data;
        } else if (data && Array.isArray(data.favorites)) {
          favoritesData = data.favorites;
        } else if (data && Array.isArray(data.data)) {
          favoritesData = data.data;
        } else if (data && data.results && Array.isArray(data.results)) {
          favoritesData = data.results;
        }
        // 각 즐겨찾기(post_id)에 대해 상세정보를 병렬로 불러옴
        const posts = await Promise.all(
          favoritesData.map(async fav => {
            const postId = fav.post_id || fav.post || fav.id;
            try {
              const detail = await fetchPostDetail(postId);
              return { ...fav, ...(detail.post || detail), postId };
            } catch {
              return { ...fav, postId };
            }
          })
        );
        setFavorites(posts);
      })
      .catch(() => setFavorites([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Nav />
      <div className="favorite-page-container">
        <div className="favorite-page-title-box">즐겨찾기한 게시글</div>
        {loading ? (
          <div className="favorite-page-empty">로딩 중...</div>
        ) : favorites.length === 0 ? (
          <div className="favorite-page-empty">즐겨찾기한 게시글이 없습니다.</div>
        ) : (
          <div className="favorite-card-list">
            {favorites.map(item => (
              <div
                className="favorite-card"
                key={item.post_id || item.postId || item.id}
                onClick={() => navigate(`/details/${item.post_id || item.postId || item.id}`)}
              >
                <div className="favorite-card-image-wrap">
                  <div className="favorite-card-image">
                    {item.photo ? (
                      <img src={getImageUrl(item.photo)} alt="동물" />
                    ) : (
                      <div className="favorite-card-noimg">이미지 없음</div>
                    )}
                    <div className="favorite-card-title-overlay">
                      <span>{item.title || `게시글 ${item.id || item.postId}`}</span>
                    </div>
                  </div>
                </div>
                <div className="favorite-card-content">
                  <div className="favorite-card-info-row"><span>종</span> <b>{item.species || '-'}</b></div>
                  <div className="favorite-card-info-row"><span>지역</span> <b>{item.address || '-'}</b></div>
                  <div className="favorite-card-info-row"><span>소속</span> <b>{item.provider_type || '-'}</b></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePage; 