import React, { useState } from 'react';
import './Home.css';
import Nav from '../components/Nav';
import AnimalCard from '../components/AnimalCard';

const mockData = [
  { id: 1, title: '2살 수컷 고양이 분양합니다', type: '고양이', region: '서울', gender: '수컷', age: 2 },
  { id: 2, title: '4살 암컷 강아지 분양합니다', type: '강아지', region: '경기도', gender: '암컷', age: 4 },
  { id: 3, title: '1살 수컷 기타 분양합니다', type: '기타', region: '부산', gender: '수컷', age: 1 },
  { id: 4, title: '9살 암컷 고양이 분양합니다', type: '고양이', region: '서울', gender: '암컷', age: 9 },
  { id: 5, title: '3살 수컷 강아지 분양합니다', type: '강아지', region: '대전', gender: '수컷', age: 3 },
  { id: 6, title: '5살 암컷 기타 분양합니다', type: '기타', region: '광주', gender: '암컷', age: 5 },
  { id: 7, title: '10살 수컷 고양이 분양합니다', type: '고양이', region: '인천', gender: '수컷', age: 10 },
  { id: 8, title: '6살 암컷 강아지 분양합니다', type: '강아지', region: '제주도', gender: '암컷', age: 6 },
];

const categories = {
  type: ['강아지', '고양이', '기타'],
  region: ['서울', '인천', '제주도', '경상도', '전라도', '경기도', '강원도', '부산', '대구', '광주', '대전', '세종'],
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

  const handleCheck = (category, value) => {
    setFilters((prev) => {
      const exists = prev[category].includes(value);
      const newValues = exists
        ? prev[category].filter((v) => v !== value)
        : [...prev[category], value];
      return { ...prev, [category]: newValues };
    });
  };

  const isAgeInRange = (age, range) => {
    if (range === '0-3') return age <= 3;
    if (range === '4-9') return age >= 4 && age <= 9;
    if (range === '9+') return age >= 9;
    return true;
  };

  const filteredData = mockData.filter((item) => {
    const { type, region, gender, age } = filters;
    const ageMatches = age.length === 0 || age.some((range) => isAgeInRange(item.age, range));
    const searchMatch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    return (
      (type.length === 0 || type.includes(item.type)) &&
      (region.length === 0 || region.includes(item.region)) &&
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
            placeholder="제목으로 검색하세요..."
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
                {options.map((option) => (
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
          {filteredData.map((animal) => (
            <AnimalCard key={animal.id} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
