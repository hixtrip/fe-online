import { defineComponent, ref, computed, watch } from 'vue'
import { Table, Form, Input, Spin } from 'ant-design-vue'

// 2年前自己开发的 vue3 hooks 状态管理，1年前发布了 npm 包
import { useRequest } from '@yx-frame/request'

import userApi, { type User } from '@/api/user'

// 直接使用第三方，不封装了 debounce
import { refDebounced } from '@vueuse/core'

export default defineComponent({
  props: {
    orgId: String
  },

  setup(props) {
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        sorter: true
      }
    ]

    const dataSource = ref<User[]>([])

    const rowSelection = ref({
      checkStrictly: true,
      onChange: (selectedRowKeys: (string | number)[], selectedRows: User[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
      },
      onSelect: (record: User, selected: boolean, selectedRows: User[]) => {
        console.log(record, selected, selectedRows)
      },
      onSelectAll: (selected: boolean, selectedRows: User[], changeRows: User[]) => {
        console.log(selected, selectedRows, changeRows)
      }
    })

    const fetchTableData = async (params?: User) => {
      if (!props.orgId) {
        dataSource.value = []
        return []
      }
      const result = await userApi.query({ ...params, orgId: props.orgId })
      dataSource.value = result

      return result
    }

    // 加个节流
    const { run, loading } = useRequest(fetchTableData, {
      manual: true,
      throttleLeading: true,
      loadingDelay: 200 // 防止闪烁加载状态的情况
    })

    const searchName = ref('')
    const debouncedSearchName = refDebounced(searchName, 280)

    // 客户端 Table
    const list = computed(() => {
      return dataSource.value.filter(item => item.name.includes(debouncedSearchName.value))
    })

    /* useRequest
      https://github.com/luocong2016/useRequest
    */
    // 服务端 Table                 ↓ 列表数据
    // const { runAsync, loading, data } = useRequest(fetchTableData, {
    //   manual: true,
    //   debounceLeading: true,
    //   loadingDelay: 200 // 防止闪烁加载状态的情况
    // })

    // @change | @click | watch -> debouncedSearchName 触发都可以
    // function searchClick = () => {
    //   runAsync({ name: searchName.value })
    // }

    watch(
      () => props.orgId,
      () => {
        run()
      }
    )

    return () => (
      <Spin class="user-table" spinning={loading.value}>
        <Form layout="inline" class="user-table__search">
          <Form.Item label="姓名">
            <Input v-model={[searchName.value, 'value']} allowClear placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item noStyle>
            {list.value.length}/{dataSource.value.length}
          </Form.Item>
        </Form>

        <Table
          row-key="id"
          row-selection={rowSelection.value}
          columns={columns}
          data-source={list.value}
        />
      </Spin>
    )
  }
})
