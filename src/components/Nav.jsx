import { Link } from 'react-router-dom';
import './Nav.css';
import logoImg from '../assets/logo.png'; // 경로는 저장한 위치에 따라 조정

function Nav() {
  return (
    <nav className="nav-container">
      {/* 로고 표시 */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          <img src={logoImg} alt="logo" className="nav-logo-img" />
        </Link>
      </div>

      {/* 기능별 집합 */}
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
