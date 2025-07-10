import React, { useEffect, useState } from 'react';
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

  // ✅ 게시글 불러오기
    useEffect(() => {
      fetchAllPosts()
        .then(res => {
          console.log("API 응답:", res); // 🔍 응답 구조 확인용
          const posts = res?.post?.posts;
          if (Array.isArray(posts)) {
            setData(posts.reverse());
          } else {
            console.error("게시글 데이터 형식 오류:", res);
          }
        })
        .catch(err => {
          console.error("게시글 불러오기 실패:", err);
        });
    }, []);


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