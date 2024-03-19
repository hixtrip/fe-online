![](./docs/preview.jpg)

## 其他简答题

### 如何将如下的`JSON`正确解析成 `Object`

```json
{
  "userId": 111323290434354540545
}
```

JSON.parse('{
"userId": 111323290434354540545
}')

### 前端需要*稳定*每隔`1s`向服务端请求`API`, 请问如何实现？

setInterval(func,1000)

### 什么情况下，你会为你的项目引入状态管理库，比如`Redux`, `Pinia`, 可以简述一下起到了什么作用么？

项目中存在跨组件跨页面的数据处理或者对全局数据管理时会用到 pinia。相当于全局的状态组件库。

### 为什么`ESM`与`CJS`不能兼容？

EMS 是 ECMAScript 标准模块系统
export default 1;
export const number = 1
而 CJS 是 CommonJs
const number = 1;
module.exports = number;
CJS 不能在浏览器中工作。它必须经过转换和打包
ESM 和 CJS 完全是两套不同的设计。
