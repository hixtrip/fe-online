import delay from "../utils/delay";
interface User {
  id: string;
  name: string;
  orgId: string | undefined;
}
const getUserData = (params: Partial<User & { orgId: string }>): User[] => {
  const count = Math.floor(Math.random() * 20);
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + "",
        name: (Math.random() + 1).toString(36).substring(7)+'abc',
        orgId: params?.orgId, // 为了更清楚的显示org,此处用直接写入处理;实际应用可能是后端直接返回数据
      };
    });
};

const query = (params: Partial<User & { orgId: string }>) => {
  return delay(getUserData(params));
};

const userApi = {
  query,
};

export default userApi;
