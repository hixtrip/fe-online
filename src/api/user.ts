import delay from '../utils/delay'
import { IUser} from '../types/index'
const getUserData = (): IUser[] => {
  const count = Math.floor(Math.random() * 20)
  return Array(count)
    .fill(0)
    .map(() => {
      return {
        id: (Math.random() + 1).toString(36).substring(0),
        name: (Math.random() + 1).toString(36).substring(7),
        //随机生成手机号
        phone: (Math.random() + 1).toString(36).substring(7),
      }
    })
}

const query = (): Promise<IUser[]> => {
  return delay(getUserData())
}

const userApi = {
  query,
}

export default userApi
