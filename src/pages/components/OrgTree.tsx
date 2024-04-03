import { defineComponent, ref } from 'vue'
import { Tree, type TreeProps } from 'ant-design-vue'
import orgApi, { type Org } from '@/api/org'

// https://github.com/luocong2016/useRequest
// 以前开发的第三方依赖包，里面有防抖、节流、缓存、焦点获取等状态管理
import { useRequest } from '@yx-frame/request'

export default defineComponent({
  emits: ['checkPath'],

  setup(_props, { emit }) {
    const fieldNames = {
      key: 'id',
      title: 'name',
      children: 'children'
    }

    const expandedKeys = ref<string[]>([])
    const selectedKeys = ref<string[]>([])
    const treeData = ref<Org[]>([])

    const fetchTreeData = async (pid?: string) => {
      const res = await orgApi.query(pid)
      // 初始化加载
      if (pid === void 0) {
        return (treeData.value = res)
      }
      // 异步获取
      return res
    }

    const onLoadData: TreeProps['loadData'] = async treeNode => {
      if (treeNode.dataRef?.children) {
        return
      }
      const data = await runAsync(treeNode.dataRef?.id)
      // @ts-ignore
      treeNode.dataRef.children = data
      treeData.value = [...treeData.value] // 强制刷新
    }

    // @ts-ignore 没有抛出 node -> EventDataNode 数据结构也不同
    function getPath(node: any) {
      const path = []

      do {
        path.unshift(node?.dataRef || node?.node || node)
        node = node.parent
      } while (node)

      return path
    }

    const handleTreeNodeClick: TreeProps['onSelect'] = (_selectedKeys, event) => {
      emit('checkPath', getPath(event.node))
    }

    //         ↓↓↓ 编辑器有代码提示的
    const { runAsync } = useRequest(fetchTreeData, { debounceLeading: true })

    return () => (
      <Tree
        v-models={[
          [expandedKeys.value, 'expandedKeys'],
          [selectedKeys.value, 'selectedKeys']
        ]}
        field-names={fieldNames}
        tree-data={treeData.value}
        load-data={onLoadData}
        onSelect={handleTreeNodeClick}
      />
    )
  }
})
