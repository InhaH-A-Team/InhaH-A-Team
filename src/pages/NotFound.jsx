import React from 'react';
import TestGetPosts from '../components/Deb'
function NotFound() {
  return (
    <div>
      <TestGetPosts/>
      <h1>🚫 404 - 페이지를 찾을 수 없습니다</h1>
      <p>주소를 다시 확인해주세요.</p>
    </div>
  );
}

export default NotFound;
