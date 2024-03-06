import React, { memo } from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { AppWrapper } from './style'
import MemberManagement from './pages/MemberManagement'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '成员管理',
    children: <MemberManagement />,
  },
  {
    key: '2',
    label: '团队管理',
    children: '团队管理',
  },
  {
    key: '3',
    label: '职位维护',
    children: '团队管理',
  },
]

function App() {
  function onChange(key: string) {
    // console.log(key)
  }

  return (
    <AppWrapper>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} size="large" />
    </AppWrapper>
  )
}

export default memo(App)
