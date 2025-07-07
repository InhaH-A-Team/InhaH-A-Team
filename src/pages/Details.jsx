import React from 'react';
import './Details.css';
import Nav from '../components/Nav';

function Details() {
  return (
    <div className="details-container">
      <Nav />
      <div className="details-inner">
        {/* 제목 */}
        <div className="details-title">제목</div>
        <div className="details-content-row">
          {/* 왼쪽: 이미지 + 정보 */}
          <div className="details-left">
            <div className="details-image-preview">
              이미지<br />미리보기
            </div>
            <div className="details-info">
              <div>나이</div>
              <div>성별</div>
              <div>종</div>
              <div>연락처</div>
            </div>
          </div>
          {/* 오른쪽: 본문 */}
          <div className="details-main-content">
            {/* 본문 내용이 들어갑니다 */}
          </div>
        </div>
        {/* 댓글 영역 */}
        <div className="details-comments">
          <div className="details-comment">댓글1</div>
          <div className="details-comment">댓글2</div>
        </div>
      </div>
    </div>
  );
}

export default Details;