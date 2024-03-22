<!--
 * @Author: chenhuang
 * @Date: 2024-03-21 13:14:28
 * @Description: 自定义表格组件
-->
<template>
  <table v-if="props.config.length>0" class="his5_table">
    <thead class="user_thead_class">
      <tr>
        <th><input type="checkbox" v-model="isChecked" @change="handleChange"></input></th>
        <th v-for="(item, index) in props.config" :key="index">
          <div class="table_th">
            <slot :name="`th_${item.dataItemCode}`" :config="item" >{{ item.dataItemName }}</slot>
            <span class="sort_icon">
              <CaretUpOutlined @click="sortClick(1, item.dataItemCode)"/>
              <CaretDownOutlined  @click="sortClick(2, item.dataItemCode)"/>
            </span>
          </div>
        </th>
      </tr>
    </thead>
  </table>
  <table class="his5_table table_tbody">
      <tbody  class="user_tbody_class">
        <tr v-for="(item1, index1) in tableData" :key="index1">
          <td><input type="checkbox" v-model="item1.isChecked" @change="handleTdCheckChange(item1, index1, $event)"></input></td>
          <td v-for="(item2, index2) in props.config" :key="index2">
            <slot :name="`td_${item2.dataItemCode}`" :item="item1" :index="index1">{{ item1[item2.dataItemCode] }}</slot>
          </td>
        </tr>
      </tbody>
  </table>
</template>
<script lang="ts" setup>
import { ref, onMounted, watch} from "vue";
import {
 CaretUpOutlined,
 CaretDownOutlined
} from "@ant-design/icons-vue";
import _ from "lodash";

// 定义组件props所有字段。
const props = defineProps({
  checkbox: false,
  config: Array,
  data: Array
});
// 定义组件需要外传的所有 emit 事件。
const emit = defineEmits(["checkedAll","checked"]);
const tableData = ref([])
const isChecked = ref(false)

// 重新组装表格数据，添加额外新属性。
watch(()=>props.data, (newValue, oldValue)=>{
  tableData.value = newValue.map(v=>{

    // 是否开启复选框列。
    const checkboxObj = props.checkbox.value ?  {
      isChecked: false,
    }:{}

     return _.assign(v, checkboxObj)
  });
})

// 监听表格组件全选事件
const handleChange = (e)=>{
  if(isChecked.value){
    emit("checkedAll", true)
  }else{
    emit("checkedAll", false)
  }
  tableData.value.forEach(v => {
  v.isChecked = isChecked.value;
});
}

// 监听行内表格选中事件
const handleTdCheckChange = (item, index, _event) =>{
  emit("checked", item.isChecked, _event, item, index)
}

// 排序事件
const sortClick = (type, itemCode)=>{
  let sortType = (type==1) ? "asc" :"desc";
  tableData.value = _.orderBy(tableData.value, [itemCode], sortType)
}
</script>
<style lang="scss" scoped>
table {
  width: 100%;
  outline: none;
  border-collapse: collapse;

  th,tr{
    height: 30px;
    text-align: center;
  }
  th{
    height: 30px;
    text-align: center;
    border: 1px solid #dcdcdc;
    padding: 10px;
  }
  td {
    border: 1px solid #dcdcdc;
    padding: 10px;
  }
}
.user_thead_class,
.user_tbody_class {
  height: 40px;
  width: 100%;
  display: inline-table;
  overflow: scroll;
}

.his5_table {
  width: 100%;
  &>tbody > tr > td {border-top: 0;}
  tbody{outline: none;}
  .user_thead_class th:nth-child(1),.user_tbody_class td:nth-child(1) {width: 4%;}
  .user_thead_class th:nth-child(2),.user_tbody_class td:nth-child(2) {width: 48%;}
  .user_thead_class th:nth-child(3),.user_tbody_class td:nth-child(3) {width: 48%;}
}  

.table_tbody {
  width: 100%;
  height: calc(100% - 90px);
  display: inline-block;
  overflow: auto;  
}

.table_th {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sort_icon {
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}
</style>