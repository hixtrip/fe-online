import delay from '../utils/delay'
import type { User } from './types'

const getUserData = (): User[] => {
    const count = Math.floor(Math.random() * 20)
    return Array(count)
        .fill(0)
        .map(() => {
            return {
                id: Math.random().toString(),
                name: (Math.random() + 1).toString(36).substring(7),
            }
        })
}

const query = (param?: Partial<User & { orgId: string }>) => {
    return delay(getUserData())
}

const userApi = {
    query,
}

export default userApi
