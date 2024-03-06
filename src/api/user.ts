import delay from '../utils/delay'
interface User {
  id: string
  name: string
}
const getUserData = (value?: string): User[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + '',
        name: value || (Math.random() + 1).toString(36).substring(7),
      }
    })
}

const query = (params: Partial<User & { orgId: string,value: string }>) => {
  return delay(getUserData(params.value))
}

const userApi = {
  query,
}

export default userApi
