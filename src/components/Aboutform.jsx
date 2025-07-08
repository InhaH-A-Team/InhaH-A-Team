import React, { useState } from 'react';
import './Aboutform.css';

const aboutTabs = [
  {
    title: "유연",
    subtitle: "유기동물을 연결하다.",
    desc: "저희 단체는 뭐시기저시기 응애응애\n유기동물 연결 프로젝트입니다.",
    contact: "contact: 010-1234-4576"
  },
  {
    title: "두번째 박스",
    subtitle: "봉사와 기부 안내",
    desc: "두 번째 박스의 내용을 여기에 적습니다.",
    contact: "contact: 010-5678-9012"
  },
  {
    title: "Contributers",
    subtitle: "멋쟁이사자처럼 14기 A팀",
    desc: 
    "임병윤\n\n 컴퓨터공학과 20 박준희\n\n 강유림\n\n 윤서연\n\n 이민정"
    ,
    contact: ""
  }
];

const Aboutform = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="about-all-container">
      <div className="about-tab-panel">
        <div className="about-tab-menu">
          {aboutTabs.map((tab, idx) => (
            <button
              className={`about-tab-btn${currentTab === idx ? ' active' : ''}`}
              key={idx}
              onClick={() => setCurrentTab(idx)}
            >
              <span className="about-tab-icon" aria-label={currentTab === idx ? "selected" : "unselected"}>
                {currentTab === idx ? "●" : "○"}
              </span>
              {tab.title}
            </button>
          ))}
        </div>
        <div className="about-tab-content">
          <div className="about-box-title">{aboutTabs[currentTab].title}</div>
          <div className="about-box-subtitle">{aboutTabs[currentTab].subtitle}</div>
          <div className="about-box-desc">{aboutTabs[currentTab].desc}</div>
          <div className="about-box-contact">{aboutTabs[currentTab].contact}</div>
        </div>
      </div>
      <div className="about-right">
        <div className="about-eng-title">
          Save The Animals<br />
          From Indifference
        </div>
        <div className="about-img-ellipse">
          <img src="/AboutImage.jpg" alt="animals" />
        </div>
      </div>
    </div>
  );
};

export default Aboutform;
