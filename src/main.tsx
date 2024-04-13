import { createRoot } from 'react-dom/client';
import App from './App';

// 渲染 App 组件
const root = createRoot(document.getElementById('app'));
// @ts-ignore
root.render(<App />);
