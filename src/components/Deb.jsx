import { useState } from "react";
import axios from "axios";

function TestGetPosts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleTest = async () => {
    try {
      const res = await axios.get("http://3.105.240.233/posts/all/");
      setData(res.data);
      setError("");
    } catch (err) {
  if (err.response && err.response.data) {
    setError("서버 에러: " + (err.response.data.error || err.response.data.message));
  } else {
    setError("서버 에러: " + err.message);
  }
}

  };

  return (
    <div>
      <button onClick={handleTest}>/posts/all GET 테스트</button>
      {data && (
        <pre style={{ background: "#eee", padding: 10, marginTop: 10 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default TestGetPosts;
