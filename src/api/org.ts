import delay from '../utils/delay';

// 定义组织数据的接口
export interface Org {
  id: string;
  name: string;
  children?: Org[]; // 添加 children 属性表示子组织
  pid: string
}
const orgData: Org[] = [
  { id: '1', name: '厦门海行旅游', pid: '0' },
  { id: '2', name: '技术部', pid: '1' },
  { id: '3', name: '前端', pid: '2' },
  { id: '4', name: '企业管理部', pid: '1' },
  { id: '5', name: '人力资源', pid: '4' }
];


// 获取组织数据的函数
const getOrgData = (parentId: string): Org[] => {
  return orgData.filter(org => org.pid == parentId);
};

// 查询组织数据的函数，parentId 参数暂时不使用
const query = (parentId: string = '0') => {
  return delay(getOrgData(parentId));
};

// 导出 orgApi 对象，包含查询组织数据的方法
export const orgApi = {
  query,
};

export default orgApi;
