import React, {useState} from 'react'
import OrgTreeView from "./view.jsx";
import orgApi from "../../api/org.ts";
import {throttle} from '../../utils/utils.ts';

function OrgTree(props) {
    const {appCallback} = props
    const [orgDate, setOrgDate] = useState([])
    const [orgId, setOrgId] = useState('')
    const [firstShow, setFirstShow] = useState(false)
    const [secondShow, setSecondShow] = useState(false)

    const _secondShow = () => {
        if (!secondShow) {
            orgApi.query('1').then(orgList => {
                setOrgDate(orgList);
                setSecondShow(true)
            })
        } else {
            setSecondShow(false)
        }
    }

    const _onClickCallback = (key, data) => {
        switch (key) {
            case 'getUser':
                appCallback('setOrgId', data?.id === orgId ? {id: ''} : data)
                data?.id === orgId ? setOrgId('') : setOrgId(data?.id)
                break;
            case'firstShow':
                setFirstShow(!firstShow)
                break;
            case'secondShow':
                //点击会请求数据，防止多次点击多次请求数据
                throttle(_secondShow);
                break;
            default:
                break;
        }
    }

    return <OrgTreeView
        firstShow={firstShow}
        secondShow={secondShow}
        orgId={orgId}
        data={orgDate}
        onClickCallback={_onClickCallback}
    />
}

export default OrgTree
