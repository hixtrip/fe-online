import React from 'react'

function OrgTreeView(props) {
    const {data, orgId, firstShow, secondShow, onClickCallback} = props

    const _orgList = () => {
        return (<ul style={{paddingInline: 0}} className={secondShow ? '' : 'noShow'}>
            {data?.map(_renderItem)}
        </ul>)
    }

    const _firstSpan = () => {
        return (
            <span className='textBold' onClick={() => onClickCallback('firstShow')}>
                <span className={firstShow ? 'tran90' : ''}>{'>'}</span>厦门嗨行旅游
            </span>
        )
    }

    const _secondSpan = () => {
        return (
            <span className='textBold' onClick={() => onClickCallback('secondShow')}>
                <span className={secondShow ? 'tran90' : ''}>{'>'}</span>技术部
            </span>
        )
    }
    const _framework = () => {
        return (<>
            <li>
                {_firstSpan()}
                <ul className={firstShow ? '' : 'noShow'}>
                    <li>
                        {_secondSpan()}
                        {_orgList()}
                    </li>
                    <li><span className='textBold'>未分配部门</span></li>
                </ul>
            </li>
        </>)
    }
    const _renderItem = (item) => {
        return (<li
            onClick={() => onClickCallback('getUser', item)}
            key={item?.id}
            style={{color: item?.id === orgId ? '#2878ff' : 'gray'}}
        >
            {item?.name}
        </li>)
    }

    return (<div className='orgTreeView'>
        <span>部门</span>
        {_framework()}
    </div>)
}

export default OrgTreeView
