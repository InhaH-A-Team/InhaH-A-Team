import { Link } from 'react-router-dom';
import './Nav.css';
import logo from '../assets/logo2.png'; // 이미지 경로 불러오기

function Nav() {
  return (
    <nav className="nav-container">
      {/* 로고 이미지 */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src={logo} alt="로고" className="nav-logo-img" />
        </Link>
      </div>

      {/* 네비게이션 메뉴 */}
      <div className="nav-right"> 
        <Link to="/star" className="nav-item">star</Link>
        <Link to="/contact" className="nav-item">contact</Link>
        <Link to="/write" className="nav-item">write</Link>
        <Link to="/login" className="nav-item">login</Link>
      </div>
    </nav>
  );
}

export default Nav;
