import React from "react";
import "./Loginform.css";

function Loginform() {
  return (
    <div className="login-wrap">
      <div className="login-logo">유연</div>
      <form className="login-form">
        <input
          type="text"
          className="login-input"
          placeholder="아이디"
          autoComplete="username"
        />
        <input
          type="password"
          className="login-input"
          placeholder="비밀번호"
          autoComplete="current-password"
        />
        <button type="submit" className="login-btn">
          로그인
        </button>
      </form>
      <div className="login-register">
        <a href="/register">회원가입</a>
      </div>
    </div>
  );
}
export default Loginform;
