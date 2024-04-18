# Hixtrip FE Online

## 前端高级/架构师需求

请移步至[v1](https://github.com/hixtrip/fe-online/tree/v1)

## 准备

-   fork 此仓库
-   根据如下要求实现相关代码
-   完成要求
    -   提交`pull request`
    -   提供页面截图

## 需求

1. 目前已经有`src/api/user.ts` 以及 `src/api/org.ts` 两个 API
2. 需要实现如下效果界面：

![](./docs/preview.jpg)

> 功能要求：

-   不限 `React` 或者 `Vue`
-   需要拆分 `OrgTree` 以及 `UserTable` 两个组件
    -   两个组件自己维护相关的数据。
    -   体现两个组件的互相通信。
-   组织架构根据点上级节点进行查询子级节点实现异步加载。
-   用户 `Table ` 数据跟据点击 `组织架构树形节点` 以及 `输入搜索关键字` 查询。
    -   需要考虑防抖节流等功能点
-   风格不限
    -   示例图仅仅是效果展示，不需要完全符合。
    -   可以使用 `UI Framework`, 如 `ant-design`, `element-ui`等
    -   如果不用`UI Framework`, 可以直接用原生的`<ul> <li>`, `<table>` 实现，不用实现相关的CSS样式, 可以加分。

## 其他简答题

需求不知道理解对不对，就是点击左侧树进行右侧数据更新，然后过滤数据

### 如何将如下的`JSON`正确解析成 `Object`

```json
{
    "userId": 111323290434354540545
}
```

答：JSON.parse()方法 如果是json文件的话 用node 的fs读取文件然后再用JSON.parse()转换

### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

答：用websocket或者用setInterval 不过用setTimeout()来代替setInterval()
// getData 指请求函数
setInterval(getData, 1000)
setTimemout在请求完成后重新设置定时器
websocket心跳机制差不多同理

### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

答：状态管理库可以用来管理状态，比如全局状态，比如组件状态，比如路由状态，比如用户状态等等，可以避免组件之间相互依赖，导致代码难以维护。 简单来说就是为了方便通信

### 为什么`ESM`与`CJS`不能兼容？

CJS 是 require()导入 和 module.exports导出，ESM 用的是是 import导入 和 exports导出。
两者在导入导出方式上不同因此不能兼容
