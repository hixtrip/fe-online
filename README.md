# 加了点料

提交时输入需要先 `git add filename`，然后`cz`
是我做的提交消息生成与检查器

# Hixtrip FE Online

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
    -   如果不用`UI Framework`, 可以直接用原生的`<ul> <li>`, `<table>` 实现，不用实现相关的 CSS 样式, 可以加分。

## 其他简答题

### 如何将如下的`JSON`正确解析成 `Object`

```json
{
    "userId": 111323290434354540545
}
```

如果是从 json 文件引入，那么可以

```ts
const getJsonObject = async (json: SomeType) => {
    await import('path/to/json/file').then((res) => {
        /** do whatever you want */
        json = res.default as SomeType
    })
    return json
}
```

如果是 json 字符串

```ts
const json = JSON.parse(jsonString)
```

### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

```ts
const id = setInterval(() => {
    setTimeout(() => getData('url'))
}, 1000)

const getData = async (url: string) => {
    await fetch(url)
        .then((res) => {
            /** */
        })
        .catch((err) => {
            /** */
        })
}

// 在组件卸载时
// vue
onUnmounted(() => {
    clearInterval(id)
})

// react
useEffect(() => {
    return () => {
        clearInterval()
    }
}, [])
```

### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

场景：跨页面通信、非父子组件通信

作用：对数据增删改查

### 为什么`ESM`与`CJS`不能兼容？

ESM 是模块化导出与引入，需要什么就导出、引入什么
CJS 会把整个文件以对象导出

语法也不通

```js
import xxx from 'package'
const xxx = require('package')

export { xxx }
module.export = { xxx }
```
