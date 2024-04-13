import React from 'react'
import { useState, useEffect, useRef } from "react";
import orgApi from './api/org';
import userApi from './api/user';
import './style.css'
import './components/OrgTree';
import './components/CommonTab';
import './components/CommonTable';
import { useDebounce } from "./utils/utils.ts";

const App = function () {
    // 部门 tree data
    const [ dataSource, setDataSource ] = useState([]);
    // table colum
    const [ columns, setColumns ] = useState(['id', 'name']);
    // table data
    const [ tableDataSource, setTableDataSource ] = useState([]);
    // table data 缓存数据
    const [ tableDataSourceCache, setTableDataSourceCache ] = useState([]);

    const treeRef = useRef(null);

    useEffect(() => {
        orgApi.query('1').then((org) => {
          setDataSource(org)
        })
    }, []);

    // 监听 org-tree select 事件
    useEffect(() => {
        const { current } = treeRef;
        current.addEventListener('select', handleOnSelect);
        return () => current.removeEventListener('select', handleOnSelect);
    }, [treeRef]);

    /**
     * @description 处理 input 元素 change 事件
     */
    const handleOnInput =  useDebounce( (event: Event) => {
        const val = event.target.value;
        if (val) {
            const filterRes = filterDataByName(val, tableDataSource);
            setTableDataSource(filterRes);
        } else {
            setTableDataSource(tableDataSourceCache);
        }
    })

    /**
     * @description 处理 org-select 事件
     */
    const handleOnSelect =  useDebounce(async (event: Event) => {
        const res = await userApi.query(event.detail.id);
        setTableDataSource(res);
        setTableDataSourceCache(res);
    })

    /**
     * @description 搜索
     * @param name
     * @param data
     */
    const filterDataByName = (name: string, data: Array<any>) => {
        let result = [];

        // 定义递归函数搜索匹配的树节点
        function searchTree(list) {
            list.forEach(item => {
                // 如果找到匹配的名字，将当前项目添加到结果数组
                if (item.name.includes(name)) {
                    result.push(item);
                }
                // 如果当前节点有children，递归搜索它的子节点
                if (item.children && item.children.length > 0) {
                    searchTree(item.children);
                }
            });
        }

        searchTree(data);
        return result;
    }

    return (
        <>
            <common-tab class="common-tab">
                <tab-panel title="成员管理">
                    <div className="tab-panel-content">
                        <div className="left">
                            <org-tree ref={treeRef} data={JSON.stringify(dataSource)} onSelect={handleOnSelect} />
                        </div>
                        <div className="right">
                            <input placeholder="请输入" onChange={handleOnInput} />
                            <common-table
                                class="common-table"
                                columns={JSON.stringify(columns)}
                                data={JSON.stringify(tableDataSource)}
                            />
                        </div>
                    </div>
                </tab-panel>
                <tab-panel title="团队管理">团队管理</tab-panel>
            </common-tab>
        </>
    )
}

export default App;
