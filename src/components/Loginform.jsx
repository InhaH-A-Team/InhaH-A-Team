import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Loginform.css";
import { loginUser } from "../api";

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

      // 명세서 기준으로 응답 처리
      if (data.access_token) {
        // 토큰 저장 (refresh_token도 필요하면 같이 저장)
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        navigate("/"); // 홈페이지로 이동
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
      <img src="/src/assets/logo.png" alt="logo" className="login-logo" />
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
