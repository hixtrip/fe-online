import { ApartmentOutlined, PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Card, Col, ConfigProvider, Row, Tabs } from 'antd'
import { DataNode } from 'antd/es/tree'
import { useState } from 'react'
import OrgTree from './components/OrgTree'
import UserTable from './components/UserTable'

const tabItems = [
  { key: '1', label: '成员管理' },
  { key: '2', label: '团队管理' },
  { key: '3', label: '职位维护' },
]
const TheTabs = () => {
  const [activeKey, setActiveKey] = useState<string | undefined>(undefined)

  const onChange = (key: string) => {
    setActiveKey(key)
  }
  return (
    <Tabs tabBarStyle={{ margin: 0 }} defaultActiveKey="1" activeKey={activeKey} items={tabItems} onChange={onChange} />
  )
}

// 处理面包屑
type BreadType = DataNode & { parent: BreadType }
const findBreadNames = (breadList: BreadType[]) => {
  const result: string[] = []
  const recursiveExtract = (obj: BreadType) => {
    if (obj.title) {
      result.push(obj.title as string)
    }

    if (obj.parent) {
      recursiveExtract(obj.parent)
    }
  }
  recursiveExtract(breadList[0])
  return result.reverse()
}
const TheBreadcrumb = ({ list }: { list: string[] }) => {
  const newList = list?.map((v, i) => {
    if (i == 0) {
      return {
        title: (
          <>
            <ApartmentOutlined /> {v}
          </>
        ),
      }
    }

    return { title: v }
  })

  console.log({ newList })
  return <Breadcrumb items={newList} />
}

function App() {
  const [breadList, setBreadList] = useState<string[]>([])

  const [orgId, setOrgId] = useState('')

  return (
    <ConfigProvider
      // 去除 antd5 的默认圆角
      theme={{
        token: {
          borderRadius: 0,
        },
      }}
    >
      <TheTabs />
      <Row>
        <Col span={4}>
          <Card size="small" title="部门" extra={<PlusOutlined />}>
            <OrgTree
              onSelect={(selectKey, { selectedNodes }) => {
                setBreadList(findBreadNames(selectedNodes as BreadType[]))
                setOrgId(selectKey?.[0] as string)
              }}
            />
          </Card>
        </Col>
        <Col span={20}>
          <Card size="small" title={<TheBreadcrumb list={breadList} />}>
            <UserTable orgId={orgId} />
          </Card>
        </Col>
      </Row>
    </ConfigProvider>
  )
}

export default App
