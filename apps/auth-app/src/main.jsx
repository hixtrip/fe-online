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
    // ��ǰӦ������Ӧ���е���������
    mount(props) {
      render(props.container, props.getAuthAppData);
    },
    bootstrap() {},
    unmount() {},
  });
};

const render = (container, getAuthAppData) => {
  // ���������Ӧ�õĻ����¾͹�����Ӧ�õĽڵ㣬������ص�����
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

// �жϵ�ǰӦ���Ƿ�����Ӧ����
qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )
