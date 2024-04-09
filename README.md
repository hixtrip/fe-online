# Hixtrip FE Online

## 准备

- fork 此仓库
- 根据如下要求实现相关代码
- 完成要求
  - 提交`pull request`
  - 提供页面截图

> 页面截图如下

![alt text](image.png)

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
> 解答代码如下
```js
const jsonString = '{"userId": 111323290434354540545}';
const jsonObject = JSON.parse(jsonString, (key, value) => {
  if (key === 'userId') {
    return BigInt(value);
  }
  return value;
});
```
### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？
> 如果不考虑api响应时间的情况下，使用setInterval进行轮询，如果需要等待响应后一秒再次请求，可以在api响应的回调函数中使用setTimeout进行递归调用

### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？
> 如果一些变量，在我的项目中的作用范围较广，组件跨度较大，或者说它可能与整个页面或者是大模块相关，例如用户登录信息等，我就会引入状态管理库，它很好的解决了在组件的深层次调用中的传参问题，并且这些状态的改变将会变得有迹可循

### 为什么`ESM`与`CJS`不能兼容？
> 1.ESM与CJS的模块导入导出方式不同，require无法引入ESM包  
> 2.ESM的模块依赖关系在编译时就已经确定，是不会改变的，而CJS在运行时加载和解析模块，模块的依赖关系可以在运行时改变  
> 3.ESM 不允许在外部直接修改值，CJS 的输出是拷贝，不是引用出，值可以被修改  
