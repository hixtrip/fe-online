import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { Layout } from 'antd'
import OrgTree from '../../components/OrgTree'
import UserTable from '@/components/UserTable'

const { Content, Sider } = Layout

interface IProps {
  children?: ReactNode
}

const MemberManagement: FC<IProps> = () => {
  const [currentNode, setCurrentNode] = useState<string>('') // 当前选中的节点
  const [titles, setTitles] = useState<string[]>([]) // 当前选中的节点
  const handleNodeChange = (node: string, titles: string[]) => {
    setCurrentNode(node)
    setTitles(titles)
  }

  return (
    <div className="h-[calc(100vh-57px)] overflow-hidden">
      <Layout className="h-full">
        <Sider className="border-r-solid   h-full overflow-auto border-r border-r-[#e5e7e8] !bg-white" width={260}>
          <OrgTree onNodeChange={handleNodeChange} />
        </Sider>
        <Content className="overflow-auto !bg-white">
          <UserTable node={currentNode} titles={titles} />
        </Content>
      </Layout>
    </div>
  )
}

export default memo(MemberManagement)
