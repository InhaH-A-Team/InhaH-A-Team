import React, { useState } from "react";
import "./Postform.css";

function Postform() {
  const [form, setForm] = useState({
    title: "",
    age: [],
    gender: [],
    species: [],
    phone: "",
    contents: "",
    mainPhoto: null,
    contentFile: null,
  });
  const [mainPreview, setMainPreview] = useState(null);

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

  const handleSubmit = e => {
    e.preventDefault();
  if (!form.title) {
    alert("제목을 입력해주세요.");
    return;
  }    
  if (!form.mainPhoto) {
    alert("사진은 필수항목입니다.");
    return;
  }
  if (form.age.length === 0) {
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
    // 010-1234-5678 형식 체크
    if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(form.phone)) {
      alert("연락처를 올바른 형식 (010-1234-5678) 으로 입력하세요.");
    return;
  }

    // 실제 제출 처리 추가해야됨.
    alert("등록 완료!");
  };

  return (
    <div className="platform-container">
      <form className="write-container" onSubmit={handleSubmit}>
        {/* 제목 */}
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

          {/* specific (age, gender, species, phone) */}
          <div className="write-specificbox">
            <div className="write-row">
              <span>나이</span>
              <label><input type="radio" name="age" value="0-3세" onChange={handleRadio} />0-3살</label>
              <label><input type="radio" name="age" value="3-6세" onChange={handleRadio} />3-6살</label>
              <label><input type="radio" name="age" value="6세 이상" onChange={handleRadio} />6살 이상</label>
            </div>

            <div className="write-row">
              <span>성별</span>
              <label><input type="radio" name="gender" value="수컷" onChange={handleRadio} />수컷</label>
              <label><input type="radio" name="gender" value="암컷" onChange={handleRadio} />암컷</label>
            </div>

            <div className="write-row">
              <span>종</span>
              <label><input type="radio" name="species" value="강아지" onChange={handleRadio} />강아지</label>
              <label><input type="radio" name="species" value="고양이" onChange={handleRadio} />고양이</label>
              <label><input type="radio" name="species" value="기타" onChange={handleRadio} />기타</label>
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
          </div>
        </div>

        {/* 사진 업로드 */}
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

        {/* 내용 입력 */}
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