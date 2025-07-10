import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Nav.css';
import logo from '../assets/logo2.png';
import { fetchUserInfo } from "../api";
import Alarm from './NotificationDropdown';
import FavoriteDropdown from './FavoriteDropdown';

function Nav() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFavoriteDropdown, setShowFavoriteDropdown] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("access_token");

  const handleProtectedClick = (path) => {
    if (!isLoggedIn) {
      navigate("/login");
    }  else {
      navigate(path);
  }
};

  const handleFavoriteClick = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      navigate("/favorite");
    }
  };

  // 로그인한 경우 사용자 정보 불러오기
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserInfo()
        .then((data) => {
          if (data.status === "success") {
            setUser(data.user);
          }
        })
        .catch(() => {
          // 토큰 만료 등 문제 시 초기화
          setUser(null);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="로고" className="nav-logo-img" />
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/about" className="nav-item">소개</Link>
        <span className="nav-item" onClick={handleFavoriteClick}>즐겨찾기</span>
        <span className="nav-item" onClick={() => handleProtectedClick("/write")}>글쓰기</span>

        {user===null ? (
          <Link to="/login" className="nav-item">로그인</Link>
        ) : (
          <div className="nav-user-wrapper">
            <div className="nav-item user-nickname" onClick={() => setShowDropdown(!showDropdown)}>
              {user.nick_name}
            </div>
            {showDropdown && (
              <div className="dropdown-box">
                <div className="dropdown-nickname-row">
                  {user.nick_name} <Alarm/>
                </div>

                <div className="dropdown-email">{user.email}</div>
                <button className="dropdown-logout" onClick={handleLogout}>로그아웃</button>
              </div>
            )}
          </div>
        )}
      </div>
      
      {showFavoriteDropdown && (
        <FavoriteDropdown 
          onClose={() => setShowFavoriteDropdown(false)}
          style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            zIndex: 1000
          }}
        />
      )}
    </nav>
  );
}

export default Nav;