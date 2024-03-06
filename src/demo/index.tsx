import React, {useCallback, useEffect, useState} from "react";
import {Tabs} from "antd";
import type { TabsProps } from 'antd';
import "./style.css"
import OrgTree from "./component/orgTree";
import userApi from "./../api/user.ts";
import UserTable from "../demo/component/userTable";
import Search from "antd/es/input/Search";
import {debounce} from "lodash";

const managerItems: TabsProps['items'] = [
    {
        key: 'user',
        label: '成员管理',
    },
    {
        key: 'team',
        label: '团队管理',
    },
    {
        key: 'position',
        label: '职务维护',
    },
];
const DemoPage = () => {
    const [id, setId] = useState("")
    const [userList, setUserList]: any = useState([])

    useEffect(() => {
        userApi.query({orgId: id || ""}).then((users) => {
            setUserList(users)
            document.getElementById('user')!.innerHTML = JSON.stringify(users)
        })
    }, [id]);
    const onChange = useCallback(debounce( (e:any) => {
        let value = e.target.value
        console.log(value)
        // 根据 id 及 value 查询所有的名字
        userApi.query({orgId: id, value: value}).then((users) => {
            setUserList(users)
            document.getElementById('user')!.innerHTML = JSON.stringify(users)
        })
    },200), [id])



    const onSelectOrg = useCallback((id: string) => {
        id && setId(id)
        userApi.query({orgId: id , }).then((users) => {
            setUserList(users)
            document.getElementById('user')!.innerHTML = JSON.stringify(users)
        })
    },[])

    console.log(userList)
    return (
        <div className={"page"}>
            <Tabs className={"tabs"} defaultActiveKey="user" items={managerItems} />
            <div  className={"body"}>
                <div className={"left"}>
                    <div>部门 <span>+</span></div>
                    <OrgTree onSelect = {onSelectOrg} />
                </div>
                <div className={"right"}>
                    <Search placeholder="input search text" onInput={onChange} style={{ width: 200 }} />
                   <UserTable userList={userList}/>
                </div>
            </div>
        </div>
    )
}

export default DemoPage