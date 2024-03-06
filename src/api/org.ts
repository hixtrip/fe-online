import delay from '../utils/delay';
export interface Org {
  id: string;
  name: string;
  parentId: string;
}
const getOrgData = (parentId: string): Org[] => {
  // const count = Math.floor(Math.random() * 20)
  // return Array(count)
  //   .fill(0)
  //   .map(() => {
  //     return {
  //       id: Math.random() + '',
  //       name: (Math.random() + 1).toString(36).substring(7),
  //     }
  //   })
  const data: Org[] = [
    {
      name: '厦门嗨行旅行',
      id: '1',
      parentId: '0',
    },
    { name: '技术部', id: '2', parentId: '1' },
    { name: '前端部', id: '4', parentId: '2' },
    {
      name: '未分配部门',
      id: '3',
      parentId: '0',
    },
  ];
  return data.filter((item) => item.parentId === parentId);
};

const query = (parentId: string = '0') => {
  return delay(getOrgData(parentId));
};

const orgApi = {
  query,
};

export default orgApi;
