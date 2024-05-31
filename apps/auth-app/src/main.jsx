import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";
import "./index.css";

const initQianKun = () => {
  renderWithQiankun({
    mount(props = {}) {
      render(props);
    },
    bootstrap() {},
    unmount() {},
    update() {},
  });
};

const render = (props) => {
  const { container, setGlobalState } = props || {};
  const appDom = container ? container : document.getElementById("root");
  ReactDOM.createRoot(appDom).render(
    <React.StrictMode>
      <App setGlobalState={setGlobalState} />
    </React.StrictMode>
  );
};

qiankunWindow.__POWERED_BY_QIANKUN__ ? initQianKun() : render();
