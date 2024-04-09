export interface Org {
    id: string
    name: string
}

export interface OrgTree extends Org {
    children?: Org[]
}

export interface User {
    id: string
    name: string
}
