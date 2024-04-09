import React, { useEffect, useState } from 'react';
import orgApi, { Org } from '../api/org'


function OrgUl(props: { list: Org[] }) {

  return (
    <ul>
      {
        props.list.map(item => <li>{item.name}</li>)
      }
    </ul>
  )

}


function OrgTree() {

  const [orgList, setOrgList] = useState<Org[]>([])

  useEffect(() => {
    orgApi.query('0').then((orgs) => {
      setOrgList(orgs)
    })
  }, [])

  return (
    <OrgUl list={orgList} />
  );
}

export default OrgTree;