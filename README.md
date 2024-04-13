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
- 不限 ```React``` 或者 ```Vue```
- 需要拆分 `OrgTree` 以及 `UserTable` 两个组件
  - 两个组件自己维护相关的数据。
  - 体现两个组件的互相通信。
- 组织架构根据点上级节点进行查询子级节点实现异步加载。
- 用户 ```Table ``` 数据跟据点击 ```组织架构树形节点``` 以及 ```输入搜索关键字``` 查询。
  - 需要考虑防抖节流等功能点
- 风格不限
  - 示例图仅仅是效果展示，不需要完全符合。
  - 可以使用 ```UI Framework```, 如 ```ant-design```, ```element-ui```等
  - 如果不用```UI Framework```, 可以直接用原生的```<ul> <li>```, ```<table>``` 实现，不用实现相关的CSS样式, 可以加分。

## 其他简答题

### 如何将如下的`JSON`正确解析成 `Object`
```json
{
  "userId": 111323290434354540545
}
```
答：JSON 转成 Object 中一般有这么几个点需要注意，如一些类型在 JSON.stringify 时会丢失，数字精度在 JSON.parse 丢失，这里应该是考数字精度的问题。
```javascript

const jsonStr = JSON.stringify({"userId": 111323290434354540545});
try {
  const obj = JSON.parse(jsonStr, (key, value) =>
    // 若数值精度超过 number 类型精度，则数值展示为 String 类型，当然也可 用 bigInt 类型
    typeof value === 'number' && Math.abs(value) > Number.MAX_SAFE_INTEGER
      ? String(value)
      : value
  );
} catch (error) {
  console.error("JSON 解析错误:", error.message);
}

```


### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？
答：单纯用 setInterval 是无法实现稳定的轮询，可以用 setTimeout 配合 自由调度的来实现
```javascript
let expectedTime = Date.now() + 1000;

function fetchData() {
  fetch('https://your-api-endpoint')
    .finally(() => {
      let currentTime = Date.now();
      // 计算已过去的时间
      let elapsedTime = currentTime - expectedTime;
      // 更新下一个预期时间
      expectedTime += 1000;
      // 计算下一请求的延迟
      let delay = 1000 - elapsedTime;
      // 如果计算结果为负数，则设置为0
      delay = delay > 0 ? delay : 0;
      // 调度下一请求
      setTimeout(fetchData, delay); 
    });
}

// 启动定时任务
fetchData();
```

### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

答：
  我会在项目有如下需求时引入状态管理库：
    1、多个组件依赖于相同的状态。
    2、对状态的更新需要在多个地方进行响应。
    3、状态更新复杂，涉及多个步骤或多个依赖。

  有如下几个好处：
    1、简化数据共享和访问。
    2、提高代码的可维护性。
    3、增强应用程序的可扩展性。
    4、性能优化。
  

### 为什么`ESM`与`CJS`不能兼容？
答：ESM 和 CJS 是两个不同的模块系统，从加载机制和模块执行时机来说为什么不能兼容。
   1、加载机制: ESM 是静态的，支持异步加载，这意味着模块导入必须在文件的顶层且不能是条件性的。而 CJS 模块系统是同步的，允许在代码的任何位置动态引入模块。
   2、模块的执行时机: ESM 模块会在整个模块脚本执行完毕后再执行代码，是执行后导入，而 CJS 模块在 require() 调用的时刻立即执行，是即时执行。 
