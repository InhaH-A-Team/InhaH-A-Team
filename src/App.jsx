import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Regis from './pages/Regis';
import Details from './pages/Details';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/regis" element={<Regis />} />
        <Route path="/details" element={<Details />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;

