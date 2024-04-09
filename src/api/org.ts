import delay from '../utils/delay'
import type { OrgTree } from './types'

const getOrgData = (): OrgTree[] => {
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

const query = (param: string = '0') => {
    return delay(getOrgData())
}

const orgApi = {
    query,
}

export default orgApi
