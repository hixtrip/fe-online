import React, {useState} from 'react'
import './App.css'
import OrgTree from './business/OrgTree';
import UserTable from './business/UserTable';
import {debounce} from './utils/utils.ts';

function App() {
    const [orgId, setOrgId] = useState('')
    const _onClickCallback = (key, data) => {
        switch (key) {
            case 'setOrgId':
                //防止多次点击多次搜索
                debounce(setOrgId, data?.id)
                break;
            default:
                break;
        }
    }

    return (
        <>
            <OrgTree appCallback={_onClickCallback}/>
            <UserTable appCallback={_onClickCallback} orgId={orgId}/>
        </>
    )
}

export default App
