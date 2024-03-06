import delay from '../utils/delay';
export interface User {
  id: string;
  name: string;
  orgId: string;
}
const getUserData = (params: Partial<User & { orgId: string }>): User[] => {
  // const count = Math.floor(Math.random() * 20)
  // return Array(count)
  //   .fill(0)
  //   .map(() => {
  //     return {
  //       id: Math.random() + '',
  //       name: (Math.random() + 1).toString(36).substring(7),
  //     }
  //   })
  const userList: User[] = [
    {
      id: '1',
      name: '张三',
      orgId: '1',
    },
    {
      id: '2',
      name: '李四',
      orgId: '2',
    },
    {
      id: '3',
      name: '王五',
      orgId: '3',
    },
    {
      id: '4',
      name: '赵六',
      orgId: '4',
    },
    {
      id: '5',
      name: '何七',
      orgId: '1',
    },
  ];
  return userList.filter(
    (item) =>
      item.orgId === params.id &&
      (!params.name || item.name.includes(params.name))
  );
};

const query = (params: Partial<User & { orgId: string }>) => {
  return delay(getUserData(params));
};

const userApi = {
  query,
};

export default userApi;
