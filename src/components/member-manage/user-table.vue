<template>
  <table class="user-table-wrap">
    <thead>
      <tr>
        <th class="checkbox-td">
          <Checkbox v-model="selectAll" @change="selectAllHandle"></Checkbox>
        </th>
        <th>姓名</th>
        <th>用户名</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in userList" :key="user.id">
        <td>
          <Checkbox v-model="user.check" @change="val => selectSingle(val, user)"></Checkbox>
        </td>
        <td>{{ user.name }}</td>
        <td>{{ user.id }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { PropType, reactive, toRefs, onMounted, watch, toRaw, computed } from 'vue';
import type { Org } from '@/api/org';
import type { Opt } from '@/components/member-manage/table-filter.vue';
import Checkbox from '@/components/common/checkbox.vue';
import userApi from '@/api/user';
import type { User } from '@/api/user';

interface Users extends User {
  check: boolean
}

const props = defineProps({
  selectOrg: {
    type: Object as PropType<Org>,
    default: () =>({})
  },
  status: {
    type: Object as PropType<Opt>,
    default: () =>({})
  },
  keyword: {
    type: String,
    default: ''
  }
})

watch(() => [props.selectOrg, props.keyword, props.status], ([val, val2, val3]) => {
  getList()
})

const state = reactive({
  selectAll: false,
  userList: [] as Users[],
})
const { selectAll, userList } = toRefs(state)

onMounted(() => {
  getList()
})

function getParams() {
  return {
    name: props.keyword,
    orgId: props.selectOrg?.id
  }
}

const emit = defineEmits(['list-count'])
// 用户列表接口
async function getList() {
  try {
    state.selectAll = false
    let data = await userApi.query(getParams())
    state.userList = data.map(user => ({...user, check: false}))
    emit('list-count', data.length)
  } catch(e) {
    console.log(e)
  }
}

// 列表中当前选中的用户
const currentSelect = computed(() => {
  return state.userList.filter(u => u.check).map(u => toRaw(u))
})

function selectAllHandle(val) {
  state.userList.forEach(u => {
    u.check = val
  })
}

function selectSingle(val: boolean, user: User) {
  state.selectAll = currentSelect.value.length === state.userList.length
}
</script>

<style lang="scss" scoped>
.user-table-wrap {
  border-collapse: collapse;
  width: 100%;

  tr {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #eee;
    color: #333;
  }
  th, td {
    padding: 0 20px;
  }
  .checkbox-td {
    padding: 0;
    width: 20px;
    padding: 0 0 0 20px;
  }
}
</style>