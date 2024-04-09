<script setup lang="ts">
import { DownOutlined, SearchOutlined, MinusOutlined } from '@ant-design/icons-vue';
import { ref, onMounted, watch, computed, reactive, onUpdated } from 'vue';
import { User } from '../api/user';
import userApi from '../api/user';
import useDebounce from '../utils/debounce'
// 接收Org
const props = defineProps({
  curOrg: {
    type: Array<string>,
    required: true
  }
})
watch(() => props.curOrg, async (newSelect, oldSelect) => {
  console.log("curOrg change")
})
// Org下所有User
const allUserList = ref<User[]>();

const searchKey = ref<string>('');
const searchStatus = ref<string>('all');

// search by Org, useDebounce为防抖动函数
const onSearch = useDebounce(() => {
  state.loading = true;
  userApi.query({ orgId: props.curOrg[0] }).then((datas) => {
    allUserList.value = datas;
  })
  setTimeout(() => {
    state.loading = false;
    state.selectedRowKeys = [];
  }, 1000);
},500);
// 需要考虑节流等功能点，在数据不需要实时刷新，且数据量较小时,先获取Org下所有User,再通过filter过滤
// filter by searchKey ,
const userList = computed(() => {
  if (!allUserList.value) {
    return [];
  } else {
    return allUserList.value.filter(item => {
      return (item.id.toLowerCase().includes(searchKey.value.toLowerCase())
        || item.name.toLowerCase().includes(searchKey.value.toLowerCase()));
    }).map((item, index) => { return { key: index, ...item } });
  }
})
onMounted(() => {
  onSearch();
});
onUpdated(() => {
  onSearch();
});
//table column setting
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    sorter: (a: { name: string; }, b: { name: string; }) => {
      let stringA = a.name.toLowerCase()
      let stringB = b.name.toLowerCase()
      if (stringA < stringB) return -1;
      if (stringA > stringB) return 1;
      return 0;
    },
  },
  {
    title: '用户名',
    dataIndex: 'id',
    key: 'key',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: '操作',
    key: 'action',
  },
];

//table row选择
const state = reactive<{
  selectedRowKeys: number[];
  loading: boolean;
}>({
  selectedRowKeys: [] as number[],
  loading: false,
});

const onSelectChange = (selectedRowKeys: number[]) => {
  state.selectedRowKeys = selectedRowKeys;
};

//table选中
// const hasSelected = computed(() => state.selectedRowKeys.length > 0);
// const selectedUser = computed(() => {
//   return userList.value.filter((item,index)=>{return state.selectedRowKeys.includes(index)})
// });
</script>

<template>
  <a-flex vertical class="w-100 h-100" style="">
    <a-flex :align="'center'" class="w-100" style="height: 60px;padding:10px;border-bottom:1px solid #f0f0f0;">
      <a-input class="search" v-model:value="searchKey" :placeholder="'搜索 （ \ue881 + G）'" style="width: 200px"
        :bordered="false" @pressEnter="onSearch">
        <template #prefix>
          <SearchOutlined style="color: #bfbfbf;" />
        </template>
        <template #suffix>
          <DownOutlined style="color: #bfbfbf;" />
        </template>
      </a-input>
      <MinusOutlined :rotate="90" style="color: #bfbfbf;" />
      <a-select ref="select" v-model:value="searchStatus" :bordered="false" style="width: 120px">
        <a-select-option value="all">登录状态</a-select-option>
        <a-select-option value="online">在线</a-select-option>
        <a-select-option value="outline">离线</a-select-option>
      </a-select>
      <span>{{ userList.length }}个成员</span>
    </a-flex>
    <a-flex class="w-100" style="height: calc(100% - 40px);padding:0 20px;">
      <a-table class="w-100 h-100" :columns="columns" :data-source="userList"
        :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a-avatar size="small" :style="{ backgroundColor: '#56acff', verticalAlign: 'middle' }">
              {{ record.name.substring(0, 1) }}
            </a-avatar>
            <span style="padding-left: 10px;;">
              {{ record.name }}
            </span>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a>actions</a>
              <a-divider type="vertical" />
              <a class="ant-dropdown-link">
                More actions
                <down-outlined />
              </a>
            </span>
          </template>
        </template>
      </a-table>
    </a-flex>
  </a-flex>
</template>

<style scoped>
:deep(.search>.ant-input) {
  font-family: "iconfont" !important;
}
</style>
