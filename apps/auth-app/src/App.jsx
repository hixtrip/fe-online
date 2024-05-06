// import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react'


function App(props) {
    const [count, setCount] = React.useState(0)
    const [loginInfo, setLoginInfo] = React.useState(() => {
        return {isLogin: false, info: ""}
    })

    console.log(props,5555)
    async function getLoginUserInfo() {
        let obj = {
            username: '用户名123456',
            password: '密码654321',
        }
        let res = await fetch('http://127.0.0.1:5000/loginUserInfo', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })

        let json = await res.json()
        console.log(json)
        props.mainApp.setGlobalState(
            {
                loginUserInfo: json
            }
        );
        setLoginInfo(() => {
                return {isLogin: true, info: JSON.stringify(json)}
            }
        )
    }

    // function login() {
    //   console.log(6)
    // }


    return (
        <>
            <div>
                <a href="https://vitejs.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
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
            <div>
                <h1 className={"login-status"}>auth-app登录状态：
                    {loginInfo.isLogin ? "已登录" : "未登录"}</h1>
                <div>
                    {/*<div>{isLogin}</div>*/}
                    <div style={{color: "red"}}>
                        {loginInfo.isLogin ? loginInfo.info : ""}
                    </div>
                    {/*<label htmlFor="username">username :</label>*/}
                    {/*<input type="text" id="username" name="username"/>*/}
                    {/*<label htmlFor="password">password :</label>*/}
                    {/*<input type="text" id="password" name="password"/>*/}
                </div>
                {loginInfo.isLogin ? "" : <button onClick={() => getLoginUserInfo()
                }>登录按钮</button>}
            </div>
        </>
    )
}

export default App
