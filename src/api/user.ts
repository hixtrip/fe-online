import delay from '../utils/delay';

export interface User {
  id: string;
  name: string;
  orgId: string;
}

const userData: User[] = [
  {
    id: '1',
    name: '张三',
    orgId: '3'
  },
  {
    id: '2',
    name: '李四',
    orgId: '5'
  },
  {
    id: '3',
    name: '王五',
    orgId: '4'
  },
  {
    id: '4',
    name: '阿飞',
    orgId: '2'
  },
  {
    id: '4',
    name: '阿强',
    orgId: '1'
  },
  {
    id: '4',
    name: '林彬',
    orgId: '1'
  },
]

const getUserData = (name: string = '', orgId: string = '0'): User[] => {
  let filteredUsers = userData;

  if (orgId) {
    filteredUsers = filteredUsers.filter(user => user.orgId === orgId);
  }

  if (name) {
    filteredUsers = filteredUsers.filter(user => user.name.toLowerCase().includes(name.toLowerCase()));
  }
  return filteredUsers;
};

const query = (params: Partial<{ name: string } & { orgId: string }>) => {
  const { orgId, name } = params;
  return delay(getUserData(name, orgId));
};

export const userApi = {
  query,
};

export default userApi;
