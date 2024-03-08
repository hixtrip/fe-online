import React, { useCallback, useEffect, useState, useRef } from "react";
import { Org } from "@/api/org";
import userApi, { User } from "@/api/user";
import ElTable from "../Table";
import { useGlobalContext } from "../GlobalContextProvider/index";

import eventBus from "@/utils/eventBus";

const Columns = [
  {
    label: "姓名",
    dataIndex: "name",
  },
  {
    label: "用户名",
    dataIndex: "userName",
  }
]

const UserTable = () => {
  const { loading, changeLoading } = useGlobalContext();
  const [data, setData] = useState<User[]>([]);
  // 用来存储搜索内容
  const searchText = useRef<string>();
  // 判断搜索框是否被聚焦
  const inputIsFocus = useRef<boolean>(false);
  // 记录当前选择org节点的ID
  const selectedOrgId = useRef<string>();

  const getData = useCallback(
    ({ orgId, name }: { orgId?: string; name?: string }) => {
      console.log("传入搜索参数", { orgId, name });
      changeLoading?.(true);
      userApi.query({ orgId, name }).then((data: User[]) => {
        changeLoading?.(false);
        console.log("###===>Users", data);
        setData(data);
      });
    },
    [changeLoading]
  );

  useEffect(() => {
    // 先获取数据
    getData({});

    // org点击事件
    const orgClick = (data: Org) => {
      console.log(data);
      selectedOrgId.current = data.id;
      getData({ orgId: data.id, name: searchText.current });
    };

    const handleOnkeydown = (event: KeyboardEvent) => {
      // 判断是否同时按下Win（Meta）键和G键
      if (inputIsFocus.current && event.key === "Enter") {
        console.log("Enter键被按下", searchText.current);
        getData({ orgId: selectedOrgId.current, name: searchText.current });

        event.preventDefault();
      }
    };

    // 监听org点击
    eventBus.addListener("orgClick", orgClick);
    // 监听键盘事件
    window.addEventListener("keydown", handleOnkeydown);
    return () => {
      eventBus.removeListener("orgClick", orgClick);
      window.removeEventListener("keydown", handleOnkeydown);
    };
  }, [getData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    searchText.current = e.target.value;
  };

  return (
    <div className="tableWrapper">
      <div className="searchWrap">
        <input
          type="text"
          placeholder="搜索 (Enter)"
          onInput={handleInputChange}
          onFocus={() => {
            inputIsFocus.current = true;
          }}
          onBlur={() => {
            inputIsFocus.current = false;
          }}
        />
      </div>
      <ElTable columns={Columns} data={data} loading={loading}/>
    </div>
  );
};

export default React.memo(UserTable);
