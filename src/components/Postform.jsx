import React, { useState } from "react";
import "./Postform.css";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api";

function Postform() {
  const [form, setForm] = useState({
    title: "",
    age: "",
    gender: [],
    species: [],
    phone: "",
    contents: "",
    mainPhoto: null,
    contentFile: null,
    health_status: "",
    provider_type: [],
    address: "",
  });

  const [mainPreview, setMainPreview] = useState(null);
  const navigate = useNavigate();

  function normalizeAddress(input) {
  const lower = input.toLowerCase().replace(/\s+/g, "");
  if (lower.includes("서울")) return "서울";
  if (lower.includes("인천")) return "인천";
  if (lower.includes("부산")) return "부산";
  if (lower.includes("대구")) return "대구";
  if (lower.includes("광주")) return "광주";
  if (lower.includes("대전")) return "대전";
  if (lower.includes("세종")) return "세종";
  if (lower.includes("제주")) return "제주도";
  if (lower.includes("충청")) return "충청도";
  if (lower.includes("경기")) return "경기도";
  if (lower.includes("강원")) return "강원도";
  if (lower.includes("경상")) return "경상도";
  if (lower.includes("전라")) return "전라도";

  return "";
}

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRadio = e => {
    const { name, value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter(v => v !== value)
    }));
  };

  const handleFileChange = e => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === "mainPhoto") {
      setForm(prev => ({ ...prev, mainPhoto: file }));
      const reader = new FileReader();
      reader.onload = () => setMainPreview(reader.result);
      reader.readAsDataURL(file);
    } else if (name === "contentFile") {
      setForm(prev => ({ ...prev, contentFile: file }));
    }
  };

  const handleContentFileChange = (e) => {
  const file = e.target.files[0];
  setForm((prev) => ({ ...prev, contentFile: file, mainPhoto: file }));
  if (file) {
    const reader = new FileReader();
    reader.onload = () => setMainPreview(reader.result);
    reader.readAsDataURL(file);
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();
  if (!form.title) {
    alert("제목을 입력해주세요.");
    return;
  }    
  if (!form.mainPhoto) {
    alert("사진은 필수항목입니다.");
    return;
  }
  if (form.age.length ===0) {
    alert("나이는 필수항목입니다.");
    return;
  }
  if (form.gender.length === 0) {
    alert("성별은 필수항목입니다.");
    return;
  }
  if (form.species.length === 0) {
    alert("종은 필수항목입니다.");
    return;
  }
  if (form.provider_type.length === 0) {
    alert("보호자 유형은 필수항목입니다.");
    return;
  }
  const normalizedAddress = normalizeAddress(form.address);
  if (!normalizedAddress) {
    alert("허용되지 않은 주소입니다. 시/도만 입력해주세요.");
    return;
}
    // 010-1234-5678 형식 체크
    if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(form.phone)) {
      alert("연락처를 올바른 형식 (010-1234-5678) 으로 입력하세요.");
    return;
  }
    const postData = {
      title: form.title,
      species: form.species[0],
      gender: form.gender[0],
      age: form.age[0],
      health_status: form.health_status,
      provider_type: form.provider_type[0],
      address: normalizedAddress,
      phone_number: form.phone,
      contents: form.contents,
      image: form.mainPhoto
    };


  try {
      const res = await createPost(postData);
      if (res.status === "success") {
        alert(res.message);
        navigate("/");
      } 
      else {
        alert(res.message || "등록 실패");
      }
    } catch (err) {
      alert("서버 오류가 발생했습니다.");
    }
  };
    return (
    <div className="platform-container">
      <form className="write-container" onSubmit={handleSubmit}>
        <input
          className="write-title"
          type="text"
          name="title"
          placeholder="제목을 입력하세요."
          value={form.title}
          onChange={handleInputChange}
        />

        <div className="write-mainbox">
          {/* 이미지 미리보기 */}
          <div className="write-imgbox">
            <div className="write-imgpreview">
              {mainPreview ? (
                <img src={mainPreview} alt="미리보기" />
              ) : (
                <span>이미지<br />미리보기</span>
              )}
            </div>
          </div>

          <div className="write-specificbox">

            <div className="write-row">
              <span>종</span>
              <label><input type="radio" name="species" value="강아지" onChange={handleRadio} />강아지</label>
              <label><input type="radio" name="species" value="고양이" onChange={handleRadio} />고양이</label>
              <label><input type="radio" name="species" value="기타" onChange={handleRadio} />기타</label>
            </div>

            <div className="write-row">
              <span>나이</span>
              <input type="number"
                name="age"
                value={form.age}
                onChange={handleInputChange}
                className="write-age"
                placeholder="12개월 미만은 0으로 입력"
              />
            </div>

            <div className="write-row">
              <span>성별</span>
              <label><input type="radio" name="gender" value="수컷" onChange={handleRadio} />수컷</label>
              <label><input type="radio" name="gender" value="암컷" onChange={handleRadio} />암컷</label>
            </div>

            <div className="write-row">
              <span>제공자 유형</span>
              <label><input type="radio" name="provider_type" value="개인" onChange={handleRadio} />개인</label>
              <label><input type="radio" name="provider_type" value="기관" onChange={handleRadio} />기관</label>
            </div>

            <div className="write-row">
              <span>연락처</span>
              <input
                type="tel"
                name="phone"
                placeholder="-를 포함하여 입력해주세요"
                value={form.phone}
                onChange={handleInputChange}
                className="write-phone"
              />
            </div>

            <div className="write-row">
              <span>건강상태</span>
              <input
                type="text"
                name="health_status"
                className="write-input"
                placeholder="건강상태를 간단히 입력해주세요"
                value={form.health_status}
                onChange={handleInputChange}
              />
            </div>

            <div className="write-row">
              <span>주소</span>
              <input
                type="text"
                name="address"
                className="write-input"
                placeholder="ex) 경상도 or 서울"
                value={form.address}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

      <div className="write-filebar">
        <label className="write-filebtn" htmlFor="contentFileInput">파일선택</label>
        <input
          id="contentFileInput"
          className="write-fileinput"
          type="file"
          name="contentFile"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleContentFileChange}
        />
        <span className="write-fileinfo">
          {form.contentFile ? form.contentFile.name : "선택된 파일 없음"}
        </span>
      </div>

        <div className="write-contentbox">
          <textarea
            className="write-content"
            name="contents"
            value={form.contents}
            onChange={handleInputChange}
            placeholder="내용을 입력하세요."
          />
        </div>

        <button type="submit" className="write-submit">
          등록하기
        </button>
      </form>
    </div>
  );
}




export default Postform;