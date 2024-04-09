
import React, { createContext, useState } from 'react'
import OrgTree from './views/OrgTree'
import UserTable from './views/UserTable'
import { Org } from './api/org'

export const OrgContext = createContext({})


function App() {

  // 当前选中的部门id
  const [orgId, setOrgId] = useState('')
  // 当前选中的部门树路径
  const [orgPath, setOrgPath] = useState<Org[]>([])

  return (
    <OrgContext.Provider value={{
      orgId,
      setOrgId,
      setOrgPath
    }}>
      <div style={{ display: 'flex' }}>
        <OrgTree />
        <UserTable orgPath={orgPath}/>
      </div>
    </OrgContext.Provider>
  );
}

export default App;