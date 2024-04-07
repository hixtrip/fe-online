import React, {useEffect, useState} from 'react'
import UserTableView from "./view.jsx";
import userApi from "../../api/user.ts";
import {debounce} from "../../utils/utils.ts";

function UserTable(props) {
    const {orgId} = props
    const [userDate, setUserDate] = useState('')
    const [keyWord,setKeyWord] = useState('')

    useEffect(() => {
        if (orgId !== '') {
            _getData();
        }else {
            setUserDate('')
        }
    }, [orgId])

    // useEffect(() => {
    //     debounce(_getData)
    // }, [keyWord])

    const _getData = () => {
        if(orgId === ''){
            alert('请先选择部门')
            return;
        }

        userApi.query({name: keyWord, orgId}).then((users) => {
            setUserDate(users);
        })
    }

    const _onClickCallback = (key,data) => {
        switch (key) {
            case 'onchange':
                setKeyWord(data.target.value)
                break;
            case'search':
                //避免短时间重复点击
                debounce(_getData)
                break;
            default:
                break;
        }
    }

    return <UserTableView
        data={userDate}
        keyWord={keyWord}
        onClickCallback={_onClickCallback}
    />
}

export default UserTable
