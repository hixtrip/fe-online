import React from 'react'

function UserTableView(props) {
    const {data,keyWord, onClickCallback} = props

    const _searchView = () => {
        return (
            <div className='searchView'>
                <span>关键词查询</span>
                <input
                    className='searchInput'
                    value={keyWord}
                    onChange={(e)=>onClickCallback('onchange',e)}
                    placeholder="请输入关键词"
                />
                <button className='searchButton' onClick={() => onClickCallback('search')}>搜索</button>
            </div>
        )
    }
    const _userTable = () => {
        let dataView = <table>
            <thead>
            <tr>
                <th>标识</th>
                <th>姓名</th>
            </tr>
            </thead>
            <tbody>
            {data?.map(item => <tr key={item?.id}>
                <td>{item?.id}</td>
                <td>{item?.name}</td>
            </tr>)}
            </tbody>
        </table>

        let noData = <span className='userNoData'>暂无数据</span>

        return (
            data.length === 0 ? noData : dataView
        )
    }

    const _defaultView =() => {
        return <span style={{color: 'gray',marginTop:'20px'}}>点击部门查询数据</span>
    }
    const _content = () => {
        return (
            <div className='userTableView'>
                {/*搜索*/}
                {_searchView()}
                {/*数据展示*/}
                {data ? _userTable() : _defaultView()}
            </div>
        )
    }
    return _content()
}

export default UserTableView
