import delay from "../utils/delay";
import generateUniqueId from "../utils/generateUniqueId";
import LocalStorageUtil from "../utils/localStorage";
function getData() {
  const orgData = LocalStorageUtil.getItem("orgData") ?? [];
  return orgData;
}
//随机生成姓名数据
function getPeopleDatas() {
  const count = Math.floor(Math.random() * 20);
  const firstNames = [
    "张",
    "李",
    "王",
    "赵",
    "钱",
    "孙",
    "李",
    "周",
    "吴",
    "吕",
    "陈",
    "褚",
    "卫",
    "蒋",
    "韩",
    "杨",
    "杨",
    "杨",
    "朱",
    "秦",
    "吕",
    "吕",
    "吕",
  ];
  const lastNames = [
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "十一",
    "十二",
    "十三",
    "十四",
    "十五",
    "十六",
    "十七",
    "十八",
    "十九",
    "二十",
  ];
  const names = [];

  for (let i = 0; i < count; i++) {
    const firstIndex = Math.floor(Math.random() * firstNames.length);
    const lastIndex = Math.floor(Math.random() * lastNames.length);
    names.push({
      name: firstNames[firstIndex] + lastNames[lastIndex],
      id: generateUniqueId(),
    });
  }

  return names;
}

//新增公司
function setCompany(params: { title: any }) {
  function operation() {
    let orgData = LocalStorageUtil.getItem("orgData") ?? [];
    orgData.push({
      id: generateUniqueId(),
      title: params.title,
      datas: [],
    });
    LocalStorageUtil.setItem("orgData", orgData);
  }
  return delay(operation());
}
//新增部门
function setChildDepartment(params: {
  parentId: string;
  name: string;
  people: any[];
}) {
  function operation() {
    let orgData = LocalStorageUtil.getItem("orgData") ?? [];
    for (let item of orgData) {
      if (params.parentId == item.id) {
        item.datas.push({
          id: generateUniqueId(),
          name: params.name,
          people: getPeopleDatas(),
        });
      }
    }
    LocalStorageUtil.setItem("orgData", orgData);
  }
  return delay(operation());
}
function orgApi() {
  return delay(getData());
}

export { orgApi, setCompany, setChildDepartment };
