import React, { MouseEventHandler, useContext, useEffect, useState } from 'react';
import orgApi, { Org } from '../api/org'
import {
  RightOutlined,
  DownOutlined
} from '@ant-design/icons';
import { OrgContext } from '../App';


// 菜单树列表项，嵌套列表
function OrgLi(props: { item: Org, parentOrgPath: Org[] }) {

  const [open, setOpen] = useState(false)
  const [child, setChild] = useState<Org[]>([])
  const context: any = useContext(OrgContext)

  const liClick: MouseEventHandler = (e) => {
    e.stopPropagation()
    setOpen(!open)
    // 设置当前选中的部门id
    context.setOrgId(props.item.id)
    // 设置当前点击节点在树中的路径
    context.setOrgPath([...props.parentOrgPath, props.item]);
  }

  useEffect(() => {
    if (open) {
      // 根据上级节点查询下级列表
      orgApi.query(props.item.id).then((orgs) => {
        setChild(orgs)
      })
    } else {
      setChild([])
    }
  }, [open])

  return (
    <li style={{ listStyle: 'none' }} onClick={liClick}>
      <div style={{ cursor: 'pointer', background: context.orgId === props.item.id ? 'whitesmoke' : '' }} >
        {
          open ?
            <DownOutlined style={{ color: '#999999' }} /> :
            <RightOutlined style={{ color: '#999999' }} />
        }
        <span>{props.item.name}</span>
      </div>
      {Boolean(child?.length) && <OrgUl list={child} parentOrgPath={[...props.parentOrgPath, props.item]} />}
    </li>
  )
}


// 菜单树列表
function OrgUl(props: { list: Org[], parentOrgPath?: Org[] }) {

  return (
    <ul style={{ paddingLeft: 16 }}>
      {
        props.list.map(item => <OrgLi key={item.id} item={item} parentOrgPath={props.parentOrgPath || []} />)
      }
    </ul>
  )

}


// 部门菜单树
function OrgTree() {

  const [orgList, setOrgList] = useState<Org[]>([])

  useEffect(() => {
    orgApi.query('0').then((orgs) => {
      setOrgList(orgs)
    })
  }, [])

  return (
    <div style={{ borderRight: '1px solid #999999', paddingRight: 20, marginRight: 20, minWidth: 250 }}>
      <OrgUl list={orgList} />
    </div>
  );
}

export default OrgTree;