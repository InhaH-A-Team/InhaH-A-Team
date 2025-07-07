import React from 'react';
import { useParams } from 'react-router-dom';
import './Details.css';
import Nav from '../components/Nav';

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

function Details() {
  const { id } = useParams();
  const animal = mockData.find((item) => String(item.id) === id);

  if (!animal) {
    return (
      <div className="details-container">
        <Nav />
        <div className="details-inner">
          <div className="details-title">존재하지 않는 게시글입니다.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="details-container">
      <Nav />
      <div className="details-inner">
        <div className="details-title">{animal.title}</div>
        <div className="details-content-row">
          <div className="details-left">
            <div className="details-image-preview">
              이미지<br />미리보기
            </div>
            <div className="details-info">
              <div>나이: {animal.age}살</div>
              <div>성별: {animal.gender}</div>
              <div>종: {animal.type}</div>
              <div>지역: {animal.region}</div>
            </div>
          </div>
          <div className="details-main-content">
            {/* 본문 내용이 들어갑니다 */}
          </div>
        </div>
        <div className="details-comment">댓글1</div>
        <div className="details-comment">댓글2</div>
      </div>
    </div>
  );
}

export default Details;