import { useEffect, useState } from "react";
import React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App(props) {
  const { setGlobalState = () => {} } = props || {};
  const [count, setCount] = useState(0);
  const [loginDetail, setLoginDetail] = useState({});
  const { token, username, password } = loginDetail;
  useEffect(() => {
    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "exampleUser",
        password: "examplePassword",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const {
          token,
          userInfo: { username, password },
        } = data || {};
        setLoginDetail({
          token,
          username,
          password,
        });
        setGlobalState({ userInfo: { token, username, password } });
      });
  }, []);
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h1>{username ? "已登录" : "未登录"}</h1>
      <p>{token}</p>
      <p>{username}</p>
      <p>{password}</p>
    </>
  );
}

export default App;
