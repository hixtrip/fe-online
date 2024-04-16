import { useState } from 'react'
import React from 'react'

import axios from 'axios';
import './App.css'

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);

  const storedUserInfo = localStorage.getItem('userInfo');
  const userInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;
  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    if (!username || !password) {
      setError('账号和密码不能为空！');
      return;
    }
    setLoading(true);
    try {
      const authBackend = '//localhost:5000/auth/login';
      const response = await axios.post(authBackend, { username, password });
      const { token, userInfo } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      setError('登录成功', token);
    } catch (error) {
      setError('登录失败，请检查您的账号和密码！');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    window.location.reload(); // 强制重新加载页面
  };
  if (userInfo !== null) {
    return (
      <div>
        <p>欢迎, {userInfo.username}！</p>
        <button onClick={handleLogout}>注销</button>
      </div>
    );
  }
  return (

    <div>
      <form onSubmit={handleLogin}>
        <div>
          <label>账号:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div>
          <label>密码:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? '登录中...' : '登录'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}

    </div>
  );
}

export default App;
