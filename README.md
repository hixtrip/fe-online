# Hixtrip FE Online

## 准备

- fork 此仓库
- 根据如下要求实现相关代码
- 完成要求
  - 提交`pull request`
  - 提供页面截图

## 需求

1. 目前已经有`src/api/user.ts` 以及 `src/api/org.ts` 两个 API
2. 需要实现如下效果界面：

![](./docs/preview.jpg)

> 功能要求：

- 不限 `React` 或者 `Vue`
- 需要拆分 `OrgTree` 以及 `UserTable` 两个组件
  - 两个组件自己维护相关的数据。
  - 体现两个组件的互相通信。
- 组织架构根据点上级节点进行查询子级节点实现异步加载。
- 用户 `Table ` 数据跟据点击 `组织架构树形节点` 以及 `输入搜索关键字` 查询。
  - 需要考虑防抖节流等功能点
- 风格不限

  - 示例图仅仅是效果展示，不需要完全符合。
  - 可以使用 `UI Framework`, 如 `ant-design`, `element-ui`等
  - 如果不用`UI Framework`, 可以直接用原生的`<ul> <li>`, `<table>` 实现，不用实现相关的 CSS 样式, 可以加分。

  功能后面 redux 已经配置好，差联动就没有详写了

## 其他简答题

### 如何将如下的`JSON`正确解析成 `Object`

```js
const jsonString = {
  userId: 111323290434354540545,
};

const jsonObject = JSON.parse(jsonString, (key, value) => {
  // 将数字转换为 BigInt 类型
  if (typeof value === 'number' && Number.isFinite(value)) {
    return BigInt(value);
  }
  return value;
});
```

### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

```js
const API_URL = 'https://example.com/api/data'; // 替换成实际的API地址

function fetchData() {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Received data:', data);
      // 在这里处理接收到的数据，可以更新界面等操作
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      // 发生错误时进行适当的处理，比如重试或者显示错误信息
    });
}

function fetchWithRetry(maxRetries = 3) {
  let retries = 0;

  function fetchWithRetryInternal() {
    fetchData().catch((error) => {
      retries++;
      console.warn(`Retrying (${retries}/${maxRetries})...`);
      if (retries < maxRetries) {
        // 继续重试
        setTimeout(fetchWithRetryInternal, 1000); // 等待1秒后再次尝试
      } else {
        console.error('Max retries reached, unable to fetch data.');
      }
    });
  }

  fetchWithRetryInternal();
}

// 启动定时请求
fetchWithRetry();
```

### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

### 共享状态管理： 当应用中的多个组件需要共享同一状态（state）时，使用状态管理库可以方便地管理这些状态，并确保它们的一致性。状态管理库提供了统一的数据存储和更新机制，使得组件之间可以轻松地共享数据。

### 复杂数据流管理： 当应用中涉及到复杂的数据流（如异步数据获取、数据变换、数据缓存等）时，状态管理库可以帮助简化数据流的管理和调度。它提供了中心化的数据流管理机制，使得数据流变得可预测和易于调试。

### 时间旅行和调试工具： 许多状态管理库提供了时间旅行和调试工具，可以帮助开发者回放应用状态的变化历史，并进行调试和性能优化。这对于理解应用状态变化的过程、定位问题以及进行性能分析都非常有帮助。

### ### 中心化的副作用管理： 当应用中存在副作用（如异步操作、路由跳转、本地存储等）时，状态管理库可以提供统一的副作用管理机制，确保副作用的顺序和一致性。这可以减少副作用造成的不确定性和错误。

### 跨组件通信： 在一些场景下，组件之间需要进行跨层级的通信，而不是简单的父子组件通信。状态管理库可以提供一种全局的通信机制，使得组件之间可以轻松地进行通信和数据传递。

### 总的来说，状态管理库可以帮助解决前端应用中状态管理的复杂性问题，提高代码的可维护性和可扩展性，同时提供一些高级功能来帮助开发者更好地管理应用状态。

### 为什么`ESM`与`CJS`不能兼容？

ESM（ECMAScript Modules）和 CJS（CommonJS）是两种不同的模块系统，它们在语法和加载机制上存在一些差异，因此不能直接兼容。下面简要说明它们之间的差异：

语法差异：

ESM 使用 import 和 export 语法来定义和导出模块。 CJS 使用 require()和 module.exports 或 exports 来定义和导出模块。加载机制差异：

ESM 是静态导入，模块在代码执行之前就被加载和解析。 CJS 是动态加载，模块在代码执行时按需加载。上下文差异：

ESM 模块在导入时会创建一个新的作用域，每个模块都有自己的作用域。 CJS 模块在导入时共享相同的作用域，所有模块共享同一个上下文。由于这些差异，ESM 和 CJS 之间存在一些不兼容的情况：

在 Node.js 环境中，从 ESM 模块中导入 CJS 模块可能会出现问题，因为 ESM 模块使用的是静态导入，而 CJS 模块是动态加载的。在浏览器环境中，ESM 和 CJS 也不能直接互相导入，因为浏览器不支持 CJS 的加载机制，而 ESM 的静态导入又无法加载 CJS 模块。虽然 ESM 和 CJS 不能直接兼容，但可以通过一些工具和技术来实现两者之间的转换和互操作，比如使用打包工具（如 Webpack、Rollup）将它们转换成兼容的模块格式，或者使用中间件（如 esm、@std/esm 等）来在 Node.js 环境中实现 ESM 和 CJS 的互操作。
