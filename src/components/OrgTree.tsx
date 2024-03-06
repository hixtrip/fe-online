import { ApartmentOutlined, DownOutlined } from '@ant-design/icons'
import { Tree } from 'antd'
import { DataNode, TreeProps } from 'antd/es/tree'
import { useEffect, useState } from 'react'
import orgApi, { Org } from '../api/org'

// 将children塞入对应的parent节点处
const updateTreeData = (list: DataNode[], key: React.Key, children: DataNode[]): DataNode[] =>
  list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        // 这里记录下parent的值，方便我们从子回溯到父
        children: children.map((v) => ({ ...v, parent: node })),
      }
    }
    if (node.children) {
      return {
        ...node,
        children: updateTreeData(node.children, key, children),
      }
    }
    return node
  })

// 处理后端传入的数据，将其处理为 treeData 格式
const handleTree = (list: Array<Org>) => {
  return list.map((v) => ({ ...v, title: v.name, key: v.id, icon: <ApartmentOutlined /> }))
}
const OrgTree = ({ onSelect }: Pick<TreeProps, 'onSelect'>) => {
  const [treeData, setTreeData] = useState<DataNode[]>([])
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([])

  // 首次加载，加载全部数据
  useEffect(() => {
    orgApi.query().then((list) => {
      console.log({ list })
      setTreeData(handleTree(list))
      onSelect?.([list?.[0]?.id], { selectedNodes: [{ title: list?.[0]?.name }] } as any)
      setSelectedKeys([list?.[0]?.id])
    })
  }, [])

  // 异步加载
  const onLoadData = async ({ key }: DataNode) => {
    return orgApi.query(key as string).then((loadList) => {
      setTreeData((origin) => updateTreeData(origin, key, handleTree(loadList)))
    })
  }
  return (
    <Tree
      onSelect={(...args) => {
        setSelectedKeys(args[0])
        onSelect?.(...args)
      }}
      selectedKeys={selectedKeys}
      blockNode
      showIcon
      switcherIcon={<DownOutlined />}
      treeData={treeData}
      loadData={onLoadData}
    />
  )
}

export default OrgTree
