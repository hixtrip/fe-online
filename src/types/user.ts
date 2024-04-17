export interface User {
  id: string
  name: string
}

export type UserQueryParams = Partial<User & { orgId: string }>
