<script setup lang="ts">
import { h, ref,watch } from 'vue';
import { MenuProps } from 'ant-design-vue';
import OrgTree from '../components/OrgTree.vue'
//模块列表
const settingModules = ref<MenuProps['items']>([
  {
    key: 'user',
    label: '成员管理',
    title: '成员管理',
  },
  {
    key: 'team',
    label: '团队管理',
    title: '团队管理',
  },
  {
    key: 'job',
    label: '职位维护',
    title: '职位维护',
  },
  {
    key: 'question',
    label: '简答题',
    title: '简答题',
  },
  {
    key: 'github',
    label: h('a', { href: 'https://github.com/Mr6Ceng', target: '_blank' }, "Mr1Ceng's GitHub"),
    title: "Mr1Ceng's GitHub",
  },
]);
const selectedModule = ref<string[]>(['user']);

const curOrg = ref<string[]>(['0']);
// watch(curOrg, async (newSelect, oldSelect) => {
//   console.log(oldSelect);
//   console.log(newSelect);
//   //do something
// })
</script>

<template>
  <a-layout style="height: 100vh;">
    <a-layout-header class="header" style="padding:0rem;">
      <!-- <div class="logo" /> -->
      <a-menu v-model:selectedKeys="selectedModule" :items="settingModules" mode="horizontal" :style="{ lineHeight: '64px' }">
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-content style="background: #fff">
        <!-- v-model绑定原理 -->
        <!-- <OrgTree :curOrg="curOrg" @update:curOrg="(value)=>{curOrg = value}">

        </OrgTree> -->
        <OrgTree v-show="selectedModule.includes('user')" v-model="curOrg">

        </OrgTree>
        <a-flex wrap="wrap" class="w-100 h-100">
          <a-flex class="w-50 h-50" style="border:1px solid #efefef;">
            <div class="w-100 h-100">
                <a-flex class="w-100 fSize-30" style="border-bottom:1px solid #efefef;;">
                  1、如何将如下的JSON正确解析成 Object<br/>
                  {<br/>
                    "userId": 111323290434354540545<br/>
                  }<br/>
                </a-flex>
                <a-flex class="w-100 fSize-20">
                  const jsonString = '{"userId": 111323290434354540545}';<br/>
                  const jsonObject = JSON.parse(jsonString);<br/>

                  console.log(jsonObject); // 输出解析后的对象<br/>
                </a-flex>
            </div>
          </a-flex>
          <a-flex class="w-50 h-50" style="border:1px solid #efefef;">
            <div class="w-100 h-100">
                <a-flex class="w-100 fSize-30" style="border-bottom:1px solid #efefef;;">
                  2、前端需要稳定每隔1s向服务端请求API, 请问如何实现？
                </a-flex>
                <a-flex class="w-100 fSize-20">
                <br/>// 定义异步函数 fetchData，用于向服务端请求数据
                <br/>async function fetchData() {
                <br/>  try {
                <br/>    // 发起 GET 请求
                <br/>    const response = await axios.get('https://api.example.com/data');
                <br/>    // 获取响应数据
                <br/>    const data = response.data;
                <br/>    // 处理从服务端获取的数据
                <br/>    console.log('从服务端获取的数据：', data);
                <br/>  } catch (error) {
                <br/>    console.error('请求失败：', error);
                <br/>  }
                <br/>}
                <br/>// 每隔一秒调用一次 fetchData 函数
                <br/>setInterval(fetchData, 1000);
                </a-flex>
            </div>
          </a-flex>
          <a-flex class="w-50 h-50" style="border:1px solid #efefef;">
            <div class="w-100 h-100">
                <a-flex class="w-100 fSize-30" style="border-bottom:1px solid #efefef;;">
                  3、什么情况下，你会为你的项目引入状态管理库，比如Redux, Pinia, 可以简述一下起到了什么作用么？
                </a-flex>
                <a-flex class="w-100 fSize-20">
                  1、跨组件通信：应用中存在多个组件需要共享相同的状态，但这些组件不处于父子关系或兄弟关系，而是处于不同的层级，那么引入状态管理库可以方便这些组件之间进行通信和共享状态。<br/>
                  2、大量的状态需要维护：状态管理库可以有更好的扩展性和可维护性，更好地组织和管理应用的状态，并且使得代码更易于扩展和维护。<br/>
                  3、本地化部分客户端配置：Pinia提供了可持续性的状态存储，相当于localstorage的功能。<br/>
                </a-flex>
            </div>
          </a-flex>
          <a-flex class="w-50 h-50" style="border:1px solid #efefef;">
            <div class="w-100 h-100">
                <a-flex class="w-100 fSize-30" style="border-bottom:1px solid #efefef;;">
                  4、为什么ESM与CJS不能兼容？
                </a-flex>
                <a-flex class="w-100 fSize-20">
                  1、语法差异：ESM 和 CJS 使用不同的语法来定义和导出模块。ESM 使用 import 和 export 关键字来定义和导出模块，而 CJS 使用 require() 和 module.exports 或 exports 来定义和导出模块。<br/>
                  2、加载依赖时间不同：ESM 是静态导入，它在编译时确定模块的依赖关系，并在运行时进行加载。而 CJS 是动态导入，它在运行时根据需要进行模块加载。因此，在 ESM 中，模块的依赖关系必须在编译时就已经确定，而在 CJS 中则可以在运行时动态确定。<br/>
                  3、导出方式不同：ESM 支持默认导出和命名导出，并且一个模块可以同时使用多个 export 关键字导出多个变量或函数。而 CJS 只支持默认导出和命名导出，但一个模块只能有一个默认导出和一个命名导出。<br/>
                  4、模块解析规则：ESM 和 CJS 的模块解析规则也有所不同。ESM 使用相对路径或绝对路径来导入模块，而 CJS 则可以根据模块的名称在 node_modules 中进行查找。<br/>
                  5、但是他们是可以通过babel转换的<br/>
                </a-flex>
            </div>
          </a-flex>
        </a-flex>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style>
.fSize-30 {
  font-size: 30px;
}
.fSize-20 {
  font-size: 20px;
}
</style>
