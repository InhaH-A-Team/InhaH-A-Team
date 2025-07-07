import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Write from './pages/Write';
import Details from './pages/Details';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';
import Login from './pages/Login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/write" element={<Write />} />
        <Route path="/details" element={<Details />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

