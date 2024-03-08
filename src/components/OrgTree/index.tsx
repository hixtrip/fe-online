
import React, { useEffect, useState , useCallback} from "react";
import orgApi, { Org } from "@/api/org";

import { useGlobalContext } from "../GlobalContextProvider/index";
import Tree from '../Tree';
import { eventBus, throttle } from "@/utils";

import styles from './index.module.less'

interface OrgsForm extends Org {
  // 兼容多层结构
  children?: Org[];
}

const OrgTree = () => {
  const { loading, changeLoading } = useGlobalContext();
  const [orgs, setOrgs] = useState<OrgsForm[]>([]);

  const loadData = useCallback(async (params: OrgsForm = { id: "1" , name: ''}) => {
   const data = await orgApi.query(params.id);
   return data
  }, [])

  useEffect(() => {
    orgApi.query("1").then((list: OrgsForm[]) => {
      console.log("###===>orgs", list);
      setOrgs(list);
    });

    console.log('####loadData', loadData())
  }, []);

  const nodeClick = useCallback(throttle((org: Org) => {
    eventBus.emit("orgClick", org);
    changeLoading && changeLoading(true);
  }, 600), [changeLoading]);

  return <>{orgs?.length > 0 ? <Tree data={orgs} disabled={loading} nodeClick={nodeClick} loadData={loadData} /> : <div>暂无数据</div>}</>;
};

export default React.memo(OrgTree);
