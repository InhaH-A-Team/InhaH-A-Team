import React, { useEffect, useState, useCallback } from 'react';
import './Home.css';
import Nav from '../components/Nav';
import AnimalCard from '../components/AnimalCard';
import { fetchAllPosts } from '../api';

const categories = {
  type: ['강아지', '고양이', '기타'],
  region: ['서울', '경기도', '강원도', '충청도', '경상도', '전라도', '제주도', '부산', '인천', '대구', '광주', '대전', '세종'],
  gender: ['수컷', '암컷'],
  age: ['0-3', '4-9', '9+'],
};

function Home() {
  const [filters, setFilters] = useState({
    type: [],
    region: [],
    gender: [],
    age: [],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // 새로고침을 위한 키

  // ✅ 게시글 불러오기 함수
  const loadPosts = useCallback(async () => {
    try {
      const res = await fetchAllPosts();
      console.log("API 응답:", res); // 🔍 응답 구조 확인용
      
      // 다양한 응답 구조 처리
      let posts = [];
      if (res?.post?.posts && Array.isArray(res.post.posts)) {
        posts = res.post.posts;
      } else if (res?.posts && Array.isArray(res.posts)) {
        posts = res.posts;
      } else if (Array.isArray(res)) {
        posts = res;
      } else {
        console.error("게시글 데이터 형식 오류:", res);
        setData([]);
        return;
      }
      
      console.log("처리된 게시글 데이터:", posts);
      setData(posts.reverse());
    } catch (err) {
      console.error("게시글 불러오기 실패:", err);
      setData([]);
    }
  }, []);

  // ✅ 게시글 불러오기
  useEffect(() => {
    loadPosts();
  }, [loadPosts, refreshKey]);

  // 새로고침 함수 (다른 컴포넌트에서 호출 가능)
  const refreshPosts = useCallback(() => {
    console.log('Home 페이지 새로고침 호출됨');
    setRefreshKey(prev => prev + 1);
  }, []);

  // 전역에 새로고침 함수 등록 (Postform에서 사용할 수 있도록)
  useEffect(() => {
    window.refreshHomePosts = refreshPosts;
    console.log('전역 새로고침 함수 등록됨');
    
    return () => {
      delete window.refreshHomePosts;
      console.log('전역 새로고침 함수 제거됨');
    };
  }, [refreshPosts]);


  const handleCheck = (category, value) => {
    setFilters(prev => {
      const exists = prev[category].includes(value);
      const updated = exists
        ? prev[category].filter(v => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: updated };
    });
  };

  const isAgeInRange = (age, range) => {
    const numericAge = Number(age);
    if (range === '0-3') return numericAge <= 3;
    if (range === '4-9') return numericAge >= 4 && numericAge <= 9;
    if (range === '9+') return numericAge >= 9;
    return true;
  };

  const filteredData = data.filter(item => {
    const { type, region, gender, age } = filters;
    const ageMatches = age.length === 0 || age.some(r => isAgeInRange(item.age, r));
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      (type.length === 0 || type.includes(item.species)) &&
      (region.length === 0 || region.includes(item.address)) &&
      (gender.length === 0 || gender.includes(item.gender)) &&
      ageMatches &&
      searchMatch
    );
  });

  return (
    <div>
      <Nav />
      <div className="home-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filter-box">
          {Object.entries(categories).map(([key, options]) => (
            <div className="filter-group" key={key}>
              <span className="filter-title">{key.toUpperCase()}</span>
              <div className="filter-options">
                {options.map(option => (
                  <label key={option}>
                    <input
                      type="checkbox"
                      checked={filters[key].includes(option)}
                      onChange={() => handleCheck(key, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="card-grid">
          {filteredData.length === 0 ? (
            <p>조건에 맞는 동물이 없습니다.</p>
          ) : (
            filteredData
            .filter(animal => animal.post_id) // post_id가 있는 것만
            .map(animal => (
              <AnimalCard key={animal.post_id} animal={animal} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;