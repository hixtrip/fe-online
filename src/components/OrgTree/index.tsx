import React, { memo, useEffect, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Tree } from 'antd'
import type { Org } from '@/api/org'
import orgAPI from '@/api/org'

interface IProps {
  children?: ReactNode
  onNodeChange: (id: string, titles: string[]) => void
}

interface DataNode {
  parentKey?: string
  title: string
  key: string
  isLeaf?: boolean
  children?: DataNode[]
}

// 更新树数据
function updateTreeData(list: DataNode[], key: string, children: DataNode[]): DataNode[] {
  return list.map((node) => {
    if (node.key === key) {
      return {
        ...node,
        children,
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
}

// 格式化数据
function formatData(data: Org[], parentKey: string): DataNode[] {
  return data.map((item) => {
    return {
      parentKey,
      title: item.name,
      key: item.id,
    }
  })
}

// 根据子节点的 key 获取父节点
function findParentNodeByKey(data: DataNode[], childKey: string) {
  for (const node of data) {
    if (node.key === childKey)
      return node

    if (node.children && node.children.length > 0) {
      const parent = findParentNodeByKey(node.children, childKey)
      if (parent)
        return parent
    }
  }
  return null
}

// 生成面包屑导航
function generateBreadcrumb(node: any, data: DataNode[]) {
  const breadcrumb: any[] = []
  while (node) {
    breadcrumb.unshift(node.title)
    const parentKey = node.parentKey
    if (parentKey === '0')
      break
    node = findParentNodeByKey(data, parentKey)
  }
  return breadcrumb
}

const OrgTree: FC<IProps> = (props) => {
  const { onNodeChange } = props

  const [treeData, setTreeData] = useState<DataNode[]>([])

  useEffect(() => {
    orgAPI.query().then((res) => {
      setTreeData(formatData(res, '0'))
    })
  }, [])

  const onLoadData = async ({ key, children }: DataNode) => {
    return new Promise<void>((resolve) => {
      if (children) {
        resolve()
        return
      }
      orgAPI.query(key).then((res) => {
        setTreeData(origin => updateTreeData(origin, key, formatData(res, key)))
        resolve()
      })
    })
  }

  function handleSelect(_, { node }) {
    // 如果有子节点或者节点未展开，则不触发
    if ((node.children && node.children.length > 0) || !node.expanded)
      return

    const parentNode = findParentNodeByKey(treeData, node.key)
    const breadcrumb = generateBreadcrumb(parentNode, treeData)
    onNodeChange(node.key as string, breadcrumb)
  }

  return (
    <div className="h-full">
      <div className="border-b-solid flex items-center justify-between border-b border-b-[#e5e7e8] px-4 py-2 text-lg">
        <span>部门</span>
        <span><PlusOutlined className="text-[#999]" /></span>
      </div>
      <div className="p-4">
        <Tree loadData={onLoadData} treeData={treeData} onSelect={handleSelect} />
      </div>
    </div>
  )
}

export default memo(OrgTree)
