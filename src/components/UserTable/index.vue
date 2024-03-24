<template>
  <div>
    <div>当前组织ID:{{ orgId }}</div>
    <input placeholder="输入客户name搜索" v-model="formState.name"  @input="inputChange" ></input>
    <div style="padding: 20px;">
      <Table :columns="columns" :dataSource="dataSource"></Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import userApi from '../../api/user.ts'
import { watch , reactive , ref} from "vue";
import Table from '../Table/index.vue'
const props = defineProps(['orgId'])
const formState = reactive({
  name:''
})
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

const getUser = () => {
  userApi.query({orgId:props.orgId,...formState}).then((users)=>{
    console.log(users)
    dataSource.value = users
  })
}

const searchUser = debounce(getUser,500)

const columns = [{title:'name',key:'name'},{title:'id',key:'id'}]
const dataSource = ref([])

const handleChange = () => {
  
};

const inputChange = () => {
  searchUser()
}
  
watch(()=>props.orgId,()=>{
  getUser()
})



</script>

<style lang="scss" scoped>

</style>