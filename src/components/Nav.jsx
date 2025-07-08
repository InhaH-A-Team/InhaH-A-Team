import { Link } from 'react-router-dom';
import './Nav.css';


function Nav() {
  return (
    <nav className="nav-container">
      {/* 로고 표시 */}
      <div className="nav-left">
        <Link to="/" className="nav-logo">logo(SBC)</Link>
      </div>

      {/* 기능별 집합 */}
      <div className="nav-right"> 
        <Link to="/star" className="nav-item">star</Link>
        <Link to="/About" className="nav-item">About us</Link>
        <Link to="/write" className="nav-item">write</Link>
        <Link to="/login" className="nav-item">login</Link>
      </div>
    </nav>
  );
}

export default Nav;