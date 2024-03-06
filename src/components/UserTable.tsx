import { Col, Input, Row, Select, Table, TableColumnsType } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import userApi, { User } from '../api/user'
import { debounce } from '../utils'

type UserTableType = {
  orgId: string
}

const columns: TableColumnsType<User> = [
  {
    dataIndex: 'name',
    title: '姓名',
    render: (v) => (
      <span className="badge-name" data-name={v.slice(0, 2)}>
        {v}
      </span>
    ),
  },
  {
    dataIndex: 'name',
    title: '用户名',
  },
]
const UserTable = ({ orgId }: UserTableType) => {
  const [name, setName] = useState('')
  const [userList, setUserList] = useState<User[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  // 加载用户列表
  useEffect(() => {
    if (orgId) {
      // 切换部门，正常来说是要清空名称搜索的
      setName('')
      onSearch('')
    }
  }, [orgId])

  // 输入触发搜索
  const onInput = (e: any) => {
    setName(e.target.value)
    onSearchDebounce(e.target.value)
  }

  // 搜索做防抖，使用 callback 缓存
  const onSearch = (name?: string) => {
    userApi.query({ orgId, name }).then((value) => {
      setUserList(value)
    })
  }
  const onSearchDebounce = useCallback(debounce(onSearch, 500), [orgId])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <>
      <Row align={'middle'}>
        <Col span={4}>
          {/* 搜索使用防抖 */}
          <Input.Search value={name} placeholder="搜索" onInput={onInput}></Input.Search>
        </Col>
        <Select defaultValue={'1'} style={{ width: 120 }} options={[{ value: '1', label: '登录状态' }]} />

        <span style={{ paddingLeft: '10px' }}>{userList.length || 0}个成员</span>
      </Row>

      <Table rowKey={'id'} rowSelection={rowSelection} columns={columns} dataSource={userList} />
    </>
  )
}

export default UserTable
