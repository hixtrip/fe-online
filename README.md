<!--
 * @Author: chenhuang
 * @Date: 2024-03-22 08:34:18
 * @Description:
-->

# Hixtrip FE Online

## 准备

- fork 此仓库
- 根据如下要求实现相关代码
- 完成要求
  - 提交`pull request`
  - 提供页面截图：`[在线地址](https://aladdin99.github.io/fe-online/)`

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

## 其他简答题

### 如何将如下的`JSON`正确解析成 `Object`

```json
{
  "userId": 111323290434354540545
}
```

```javascript
JSON.stringify({
  userId: 111323290434354540545,
})
```

### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

```javascript
setInterval(fn, time)
```

### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

场景

- 有多个组件需要共享某些状态。
- 需要跨组件状态共享。
- 状态逻辑复杂。

作用

- 集中状态管理。
- 跨组件状态共享。
- 检测状态更新
- 方便测试。

### 为什么`ESM`与`CJS`不能兼容？

两种不同的模块系统，设计目标不同。

CJS:

- 模块是同步的，会阻塞其它代码运行。
- 运行时可以确定导入和导出模块。
- this 的值是 exports 对象。
- 有个 module.export 对象，可以导出多个值。

ESM:

- 模块是异步的，不会阻塞其它代码运行。
- 编译时才可以确定导入和导出模块。
- this 的值是 underfined 。
- 支持多个命名导出和一个默认导出。
