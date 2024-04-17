import delay from '../utils/delay'
import { User, UserQueryParams } from '@/types/user'

const getUserData = (): User[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: Math.random() + '',
        name: (Math.random() + 1).toString(36).substring(7),
      }
    })
}

const query = (params: UserQueryParams) => {
  return delay(getUserData())
}

const userApi = {
  query,
}

export default userApi
