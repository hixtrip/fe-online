import React, { memo, useEffect, useMemo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import type { TableProps } from 'antd'
import { Breadcrumb, Empty, Input, Table } from 'antd'
import type { User } from '@/api/user'
import userApi from '@/api/user'
import debounce from '@/utils/debounce'

interface IProps {
  children?: ReactNode
  node: string
  titles: string[]
}

const columns: TableProps<User>['columns'] = [
  {
    title: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    align: 'center',
  },
]

const UserTable: FC<IProps> = (props) => {
  const { node, titles } = props
  const [userList, setUserList] = useState<User[]>([])
  const [copyUserList, setCopyUserList] = useState<User[]>([])
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    if (!node)
      return
    userApi.query({}).then((res) => {
      setUserList(res)
      setCopyUserList(res)
    })
  }, [node])

  const breadcrumbItems = useMemo(() => {
    return titles.map(title => ({ title }))
  }, [titles])

  const handleSearchChange = debounce((e) => {
    const value = e.target.value
    setSearchValue(value)
    if (!value) {
      setUserList(copyUserList)
      return
    }
    const list = userList.filter(user => user.name.includes(value))
    setUserList(list)
  })

  return (
    !node
      ? <div className="flex h-full items-center justify-center"><Empty /></div>
      : (
        <div>
          <div className="border-b-solid flex items-center justify-between border-b border-b-[#e5e7e8] px-4 py-2 text-lg">
            <Breadcrumb
              className="text-lg"
              items={breadcrumbItems}
            />
          </div>
          <div className="px-4">
            <Input className=" my-4" style={{ width: '200px' }} placeholder="请输入姓名查询" value={searchValue} onChange={handleSearchChange} />
            <Table bordered rowKey="id" columns={columns} dataSource={userList} />
          </div>
        </div>
      )
  )
}

export default memo(UserTable)
