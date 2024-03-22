<!--
 * @Author: chenhuang
 * @Date: 2024-03-21 10:05:20
 * @Description: 
-->
<template>
  <a-layout theme="light" class="layout_wrap">
    <a-layout-header class="ant_layout_header">
      <a-menu v-model:selectedKeys="current" mode="horizontal" :items="items" />
    </a-layout-header>
    <a-layout v-if="current.includes('memberManage')">
      <a-layout-sider class="ant_layout_sider">
        <div class="side_banner">
          <span>部门</span>
          <span> <PlusOutlined /></span>
        </div>
        <div class="side_main">
          <OrgTree @select="treeSelect"></OrgTree>
        </div>
      </a-layout-sider>
      <a-layout-content class="ant_layout_content">
        <div class="content_banner">
          <ApartmentOutlined />
          <a-breadcrumb class="ant_breadcrumb">
            <a-breadcrumb-item
              v-for="(item, index) in breadcrumbs"
              :key="index"
              >{{ item }}</a-breadcrumb-item
            >
          </a-breadcrumb>
        </div>
        <div class="content_main">
          <div style="margin: 10px">
            <a-input v-model:value="inputName" placeholder="查询姓名" style="width: 200px; margin-right: 10px" @change="nameSearch"/>
            <CaretDownOutlined/>
            <span style="margin-right: 10px">
              登录状态 
              <CaretDownOutlined/>
            </span>
            <span>1个成员</span>
          </div>
          <UserTable
            :checkbox="true"
            :config="tableConfig"
            :data="tableData"
            @checked="checked"
            @checkedAll="checkedAll"
          >
            <!-- <template v-slot:['th_id']="{config}">{{ config.dataItemName }}</template> -->
            <!-- <template v-slot:['th_name']="{config}">{{ config.dataItemName }}</template> -->

            <template v-slot:['td_name']="{item}">
              <span style="color:red;">{{ item.name }}-1</span>
            </template>
          </UserTable>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { ref} from "vue";
import OrgTree from "~/vue/components/OrgTree.vue";
import UserTable from "~/vue/components/UserTable.vue";
import {
  PlusOutlined,
  ApartmentOutlined,
  CaretDownOutlined,
} from "@ant-design/icons-vue";
import User from "~/api/user.ts";
import _ from "lodash";
const { query } = User;

/**
 * ant-design 组件相关；
**/
const current = ref<string[]>(["memberManage"]);
const items = ref<MenuProps["items"]>([
  {
    key: "memberManage",
    label: "成员管理",
    title: "成员管理",
  },
  {
    key: "teamManage",
    label: "团队管理",
    title: "团队管理",
  },
  {
    key: "positionalMaintenance",
    label: "职位维护",
    title: "职位维护",
  },
]);
// 面包屑导航；
const breadcrumbs = ref<String[]>();
const tableData = ref([]);
const userData = ref([])
const inputName = ref<String>("");
const treeNodeId = ref<String>("");
const inputExecFlag = ref(false);

/**
 * 自定义表格相关配置；
**/
interface Config {
  dataItemCode: String;
  dataItemName: String;
}
// 表格列配置项；
const tableConfig = ref<[Config]>([
  {
    dataItemCode: "id",
    dataItemName: "序列号",
  },
  {
    dataItemCode: "name",
    dataItemName: "名称",
  },
]);
// 监听表格组件全选事件
const checkedAll = (val) => {
  const checkMsg = val ? "表格已全选" : "表格取消全选";
  console.info(`----- ${checkMsg} -----`);
};
// 监听表格组件行复选框事件
const checked = (val, _event, item, index) => {
  const checkMsg = val ? "选中" : "取消勾选";
  console.info(`----- 第${index}行已${checkMsg} -----`);
};

/**
 * 组件内 Utils 方法。
**/
// 设置全局的节流标识；
let inputTimer;
// 设置节流函数；
const debounced = (fn, time)=>{
  clearTimeout(inputTimer)
  inputTimer = setTimeout(fn, time) 
}
// 设置全局的节流标志；
const excFlag = ref(false)
// 编写节流函数
const throttle = (fn, wait)=>{
  if(excFlag.value) return;
  excFlag.value = true;
  fn();
  const excTimer = setTimeout(()=>{
    excFlag.value = false;
    clearTimeout(excTimer)
  }, wait)
}

// 查询姓名
const nameSearch = (val)=>{
  // 过滤表格数据；
  const filterFun = ()=>{
    console.log("---表格过滤成功---")
    tableData.value = userData.value.filter(v=>v.name.includes(inputName.value));
  }
  // 非input查询不做防抖。
  if(!val) return filterFun();

  // 执行防抖函数；
  debounced(filterFun, 1000)
}

/**
 * 自定义树组件点击回调事件。
*/
const treeSelect = (nodeNames: String[]) => {
  breadcrumbs.value = nodeNames;
  // 请求表格数据API;
  const queryFun = ()=>{
    console.log("开始请求表格数据")
    query().then((res) => {
      userData.value = res;
      nameSearch();
    });
  }
  // 执行节流函数；
  throttle(queryFun, 1500);
};
</script>

<style lang="scss" scoped>
.layout_wrap {
  height: 100%;
  width: 100%;
  overflow: hidden;

  .ant_layout_header {
    background: #fff;
    display: flex;
    padding: 0;
    align-items: center;
    justify-content: flex-start;
    height: 64;
  }
}

.ant_layout_sider {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;
  border-right: 1px solid #dcdcdc;

  .side_banner {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdcdc;
  }
  .side_main {
    flex: 1;
  }
}

.ant_layout_content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #fff;

  .content_banner {
    height: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 10px;
    box-sizing: border-box;
    border-bottom: 1px solid #dcdcdc;

    .ant_breadcrumb {
      margin-left: 20px;
    }
  }
  .content_main {
    flex: 1;
    overflow: hidden;

    .ant_input_group_wrapper {
      width: 300px;
    }
  }
}
</style>
