import delay from "../utils/delay";

/**
 * 接口需要判断是否有子节点,或者子节点数量, 因此添加了hasChildren属性
 */
export interface Org {
  id: string;
  name: string;
  hasChildren: boolean;
}
const getOrgData = (): Org[] => {
  // 因为添加了hasChildren, 为了防止错误，最少需要有一个节点
  const count = Math.ceil(Math.random() * 20);
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + "",
        name: (Math.random() + 1).toString(36).substring(7),
        hasChildren: Math.random() > 0.5,
      };
    });
};

export const query = (parentId: string = "0") => {
  return delay(getOrgData(), 500);
};

const orgApi = {
  query,
};

export default orgApi;
