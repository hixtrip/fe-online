
import { RightOutlined } from '@ant-design/icons';
import { OrgContext } from '../App';
import { Org } from '../api/org';
import userApi, { User } from '../api/user'
import React, { useContext, useEffect, useMemo, useState } from 'react';


/**
 * @param props orgPath 当前选中的部门树路径
 * @returns 
 */
function UserTable(props: { orgPath: Org[] }) {

  const [list, setList] = useState<User[]>([])
  const [search, setSearch] = useState<string>('')
  const context: any = useContext(OrgContext)

  // 获取页面信息
  const getPage = (params?: Partial<User>) => {
    userApi.query({ ...params, orgId: context.orgId }).then(users => {
      setList(users)
    })
  }

  // 防抖
  const getPageDebounce = useMemo(() => {
    let timeout: number = 0
    return function(param: Partial<User>) {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        getPage(param)
      }, 500)
    }
  }, [])

  useEffect(() => {
    getPage()
  }, [context.orgId])

  const onSearch = (value: string) => {
    setSearch(value)
    getPageDebounce({name: value})
  }

  return (
    <div>
      <div style={{ padding: 10, borderBottom: '1px solid #999999' }}>
        {
          props.orgPath?.map((org, index) => (
            <span key={org.id}>
              <span>{org.name}</span>
              {index !== props.orgPath.length - 1 && <RightOutlined style={{ color: '#999999' }} />}
            </span>
          ))
        }
      </div>

      <div>
        <input value={search} onChange={e => onSearch(e.target.value)} />
      </div>

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {
            list?.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;