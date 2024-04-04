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
- 需要拆分 
- 以及 `UserTable` 两个组件
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

答： 使用JSON.parse 函数
```


### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

答： 

```js
const timer = setInterval(()=>{setTimeout(task(),0)}，1000)    // 其中task 为需要轮询的任务
```



### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

答：一般在一些全局的数据会用到状态库， 也就是组件中如果通信比较复杂。 

​	像vue中的状态库 vuex 、pinia以及 react 中redux 、mobx 、 recoil 这些状态库都是为了方便管理数据存在的， 在vuex 官方网站中提到数据的管理应该是单向数据流， 即 view => action  =>  state => view , 然而当数据量过大时， 单向数据流方式便不是很明显， 在vuex 中使用了 mutation + commit 来维护， 在redux 中使用是 reducer +  action 。 当然还有很多管理数据， 我所了解的就有mvc方式管理数据。 



### 为什么`ESM`与`CJS`不能兼容？

答： 

1. 语法不同， esm 采用的是export   import  form 等语句， cjs 采用的是require， module.exports
2. esm 是es 中模块的解析标准， cjs 是node 的模块解析标准
3. esm 是静态的， cjs 是动态的

从模块化的历史来看， 存在着许多模块化的解决方案amd 、cmd、umd、 cjs、 esm 。

