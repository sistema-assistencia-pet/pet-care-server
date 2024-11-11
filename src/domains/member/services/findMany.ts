import { BadRequestError, NotFoundError } from '../../../errors'
import clientRepositories from '../../client/repositories'
import { memberRepositories } from '../repositories/memberRepositories'
import type { FindManyMembersQueryParams, FindManyMembersWhere, MemberToBeReturnedOnFindMany } from '../memberInterfaces'
import type { FindManyResponse } from '../../../interfaces'

export async function findMany ({ skip, take, ...queryParams }: FindManyMembersQueryParams): Promise<FindManyResponse<MemberToBeReturnedOnFindMany>> {
  const MEMBERS_NOT_FOUND = 'Nenhum associado encontrado.'
  const CLIENT_NOT_FOUND = 'Cliente não encontrado.'

  const where: Partial<FindManyMembersWhere> = {}

  Object.entries(queryParams).forEach(([key, value]) => {
    if (
      value !== undefined &&
        value !== null &&
        key !== 'clientCnpj'
    ) {
      switch (key) {
        case 'cpf':
          Object.assign(where, { cpf: { contains: value } })
          break
        case 'name':
          Object.assign(where, { name: { contains: value } })
          break
        default:
          Object.assign(where, { [key]: value })
          break
      }
    }
  })

  if (queryParams.clientCnpj !== undefined) {
    const client = await clientRepositories.findOneByCnpj(queryParams.clientCnpj)

    if (client === null) throw new BadRequestError(CLIENT_NOT_FOUND)

    Object.assign(where, { clientId: { contains: client.id } })
  }

  const members = await memberRepositories.findMany(skip, take, where)

  if (members.length === 0) throw new NotFoundError(MEMBERS_NOT_FOUND)

  const totalCount = await memberRepositories.count(where)

  return { items: members, totalCount }
}
