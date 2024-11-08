export interface FindManyResponse<T> {
  items: T[]
  totalCount: number
}
export interface RequestUserData {
  id: string
  clientId: string
  roleId: number
}
