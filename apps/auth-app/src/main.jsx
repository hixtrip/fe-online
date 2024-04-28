import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

export const UserContext = React.createContext();

export const initQianKun = () => {
  renderWithQiankun({
    // 当前应用在主应用中的生命周期
    mount(props) {
      render(props.container, props.getAuthAppData);
    },
    bootstrap() {},
    unmount() {},
  });
};

const render = (container, getAuthAppData) => {
  // 如果是在主应用的环境下就挂载主应用的节点，否则挂载到本地
  const appDom = container ? container : document.getElementById("root");
  ReactDOM.createRoot(appDom).render(
    <React.StrictMode>
      <UserContext.Provider
        value={{
          getAuthAppData,
        }}
      >
        <App />
      </UserContext.Provider>
    </React.StrictMode>
  );
};

// 判断当前应用是否在主应用中
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
