import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Registform.css';

//이메일 유효성검사 정규식
function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}
const validateNickname = (nickname) => {
  return nickname.length >= 2 && nickname.length <= 8;
};


function Registform() {
  const [form, setForm] = useState({ email: "", password: "", name: ""  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //유효성 검사
    if (!form.email || !form.password || !form.name) {
      setError("모든 항목을 입력하세요.");
      return;
    }
    if(!validateEmail(form.email)){
      setError("올바른 이메일 형식을 입력하세요.")
      return;
    }
    if (!validateNickname(form.nickname)) {
    setError("닉네임은 2글자 이상, 8글자 이하로 입력하세요.");
    return;
  }
    try {
      const res = await axios.post("/api/signup", form);
      if (res.data.success) {
        alert("회원가입 성공!");
        navigate("/");
      } else {
        setError(res.data.message || "회원가입 실패");
      }
    } catch (err) {
      setError("서버 에러");
    }
  };

  

  return (
    <div className="regist-wrap">
    <form onSubmit={handleSubmit} className="regist-form">
      <input
      className="regist-input" 
      type="email"
      name="email"
      placeholder="이메일" 
      onChange={handleChange}
      />
      <input 
      className="regist-input"
      type="text"
      name="nickname"
      placeholder="닉네임(2~8자)"
      onChange={handleChange}
      />
      <input
      className="regist-input"
      name="password"
      type="password" 
      placeholder="비밀번호" 
      onChange={handleChange} />

      <button type="submit" className="regist-btn">회원가입</button>
      {error && <div className="error">{error}</div>}
    </form>
    </div>

  );
}

export default Registform;
