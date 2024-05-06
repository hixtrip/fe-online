// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import {renderWithQiankun, qiankunWindow} from 'vite-plugin-qiankun/dist/helper'

const initQianKun = () => {
    renderWithQiankun({
        // 当前应用在主应用中的生命周期
        // 文档 https://qiankun.umijs.org/zh/guide/getting-started#

        mount(props) {
            render(props)
            //  可以通过props读取主应用的参数：msg
            // 监听主应用传值
            props.onGlobalStateChange((res) => {
                // console.log("主应用的值"+res.msg)
            })
            console.log("主应用的值")
            // setTimeout(() => {
            //     props.setGlobalState(
            //         {
            //             loginUserInfo: {token: "ddd", username: "d", password: "6"}
            //         }
            //     );
            // }, 3000)
        },
        bootstrap() {
        },
        unmount() {
        },
    })
}

const render = (props) => {
    // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
    const {container}=props;
    const appDom = container ? container : document.getElementById('root')
    ReactDOM.createRoot(appDom).render(
        <React.StrictMode>
            <App mainApp={props}/>
        </React.StrictMode>
    )
}

// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render()
