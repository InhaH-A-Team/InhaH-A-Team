import React, { useState } from 'react';
import './Aboutform.css';
import bgImage from '/aboutUsMain.png';

const aboutTabs = [
  {
    title: "유연",
    subtitle: "유기동물을 연결하다.",
    desc: "버려진 생명에게도 또 한 번의 기회를.\n\n유연은 ‘유기동물을 연결하다’라는 뜻을 담아 이 세상에 남겨진 아이들에게 새로운 가족을 찾아주는 연결고리가 되고자 합니다.\n\n입양을 고민하는 이들에게는 책임감 있는 안내를, 보호 중인 동물에게는 애정 어린 관심을, 그리고 더 많은 사람들에게는 작은 관심이 큰 변화를 만든다는 것을 전하고자 시작된 프로젝트입니다.\n",
    contact: "contact: 010-1234-5678"
  },
  {
    title: "Association",
    subtitle: "관련 단체 소개",
    desc: "이 프로젝트는 한국 내 유기동물 문제에 대한 인식을 높이고자 만들어졌습니다. 아래는 함께할 수 있는 단체들입니다.\n\n",
    contact: ""
  },
  {
    title: "Contributers",
    subtitle: "멋쟁이사자처럼 14기 A팀",
    desc:
      "임병윤 FrontEnd 팀장\n\n 박준희 FrontEnd\n\n 강유림 FrontEnd 디자인 총괄\n\n 윤서연 BackEnd\n\n 이민정 BackEnd",
    contact: "Copyright 2025. Inha-A team All rights reserved."
  }
];

const Aboutform = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div className="about-page-wrapper">
      <div className="about-hero" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="about-overlay">
          <h1>유연</h1>
          <p>유기동물을 위한 연결의 시작</p>
        </div>
      </div>
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
            <div className="about-box-desc">
              {aboutTabs[currentTab].desc.split('\n').map((line, i) => (
                <p key={i}>{line}</p>
              ))}
              {currentTab === 1 && (
                <>
                  <p>
                    <a href="https://www.animals.or.kr" target="_blank" rel="noopener noreferrer">
                      동물자유연대
                    </a>{" "}
                    구조, 입양 등 전방위 시민단체
                  </p>
                  <p>
                    <a href="https://www.ekara.org" target="_blank" rel="noopener noreferrer">
                      카라(KARA)
                    </a>{" "}
                    유기동물 보호와 교육활동
                  </p>
                  <p>
                    <a href="https://www.animalliberation.or.kr" target="_blank" rel="noopener noreferrer">
                      한국동물보호연합
                    </a>
                  </p>
                </>
              )}
            </div>
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
    </div>
  );
};

export default Aboutform;
