import delay from '../utils/delay'
import type { User } from './types'

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

// 未使用的变量应当以 _ 代替
// 这里就不改了
// const query = (_: Partial<User & { orgId: string }>) => {
const query = (param?: Partial<User & { orgId: string }>) => {
    return delay(getUserData())
}

const userApi = {
    query,
}

export default userApi
