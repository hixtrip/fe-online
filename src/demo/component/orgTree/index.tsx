import React, {useCallback, useEffect, useMemo, useState} from "react";
import {Tree} from "antd";
import { DownOutlined } from '@ant-design/icons';
import orgApi from "./../../../api/org.ts";

interface OrgTreeProps {
    onSelect: (id: string) => void
}
const OrgTree = (props: OrgTreeProps) => {
    const {onSelect} = props
    const [treeData, setTreeData]:any = useState();
    const [orgList, setOrgList]: any = useState([])
    useEffect(() => {
        orgApi.query().then((users) => {
            setOrgList(users)
            document.getElementById('org')!.innerHTML = JSON.stringify(users)
        })
    }, []);

    const handleSelect = useCallback((e: any) => {
        onSelect && onSelect(e[0])
    },[])

    const initTreeData = useMemo(() => {
        return orgList.map((item: any) => {
            return {
                key: item.id,
                title: item.name,
            }
        })
    },[orgList])

    useEffect(() => {
        setTreeData(initTreeData)
    }, [initTreeData]);


    const updateTreeData = (list: any[], key: React.Key, children: any[]): any[] =>
        list.map((node) => {
            if (node.key === key) {
                return {
                    ...node,
                    children,
                };
            }
            if (node.children) {
                return {
                    ...node,
                    children: updateTreeData(node.children, key, children),
                };
            }
            console.log(node)
            return node;
        });

    const onLoadData = ({ key, children }: any) =>
        new Promise<void>((resolve) => {
            if (children) {
                resolve();
                return;
            }
            orgApi.query(key).then((users) => {
                let children = users.map((item: any) => {
                    return {
                        title: item.name,
                        key: item.id
                    }
                })
                console.log(children)
                setTreeData((origin: any) => {
                    return  updateTreeData(origin, key, [...children])
                })

                resolve()
                document.getElementById('org')!.innerHTML = JSON.stringify(users)
            })
        });

    console.log(treeData)
    return (
        <div   style={{flex: "1 0 0"}}>
            <Tree
                switcherIcon={<DownOutlined />}
                onSelect={handleSelect}
                loadData={onLoadData}
                treeData={treeData}
            />
        </div>

    )
}

export default OrgTree