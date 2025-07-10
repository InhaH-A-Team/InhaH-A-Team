import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginform.css";
import { loginUser } from "../api";
import logo from '../assets/logo.png';

function Loginform() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(email)) {
      setError("올바른 이메일 형식을 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      const data = await loginUser({ email, password });

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        localStorage.setItem("user_id", data.user_id);
        navigate("/");
      } else if (data.message) {
        setError(data.message);
      } else {
        setError("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다.");
    }
    setLoading(false);
  };

  return (
    <div className="login-wrap">
      <img src={logo} alt="logo" className="login-logo" />
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          className="login-input"
          placeholder="이메일"
          autoComplete="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="비밀번호"
          autoComplete="current-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "로그인 중..." : "로그인"}
        </button>
        {error && <div className="login-error">{error}</div>}
      </form>
      <div className="login-register">
        <a href="/register">회원가입</a>
      </div>
    </div>
  );
}

export default Loginform;
