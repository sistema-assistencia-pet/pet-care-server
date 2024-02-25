import { BadRequestError } from '../../errors'
import clientRepositories from '../client/repositories'
import memberRepositories from '../member/repositories'
import orderRepositories from './repositories'
import { OrderToBeCreated } from './interfaces'

const createOne = async (orderToBeCreated: OrderToBeCreated): Promise<string> => {
  const INVALID_CLIENT = 'Cliente inválido.'
  const INVALID_MEMBER = 'Associado inválido.'

  const client = await clientRepositories.findOneById(orderToBeCreated.clientId)
  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const member = await memberRepositories.findOneById(orderToBeCreated.memberId)
  if (member === null) throw new BadRequestError(INVALID_MEMBER)

  const order = await orderRepositories.createOne(orderToBeCreated)

  return order.id
}

const activateOne = async (id: string): Promise<void> => {
  await orderRepositories.updateOne(id, { statusId: 1 })
}

const inactivateOne = async (id: string): Promise<void> => {
  await orderRepositories.updateOne(id, { statusId: 2 })
}

const deleteOne = async (id: string): Promise<void> => {
  await orderRepositories.updateOne(id, { statusId: 3 })
}

export default {
  activateOne,
  createOne,
  deleteOne,
  inactivateOne
}
