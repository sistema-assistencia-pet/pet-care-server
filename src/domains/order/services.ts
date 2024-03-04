import { BadRequestError, NotFoundError } from '../../errors'
import clientRepositories from '../client/repositories'
import memberRepositories from '../member/repositories'
import orderRepositories from './repositories'
import { type OrderToBeCreated } from './interfaces'
import { status } from '../../enums/statusEnum'

const createOne = async (orderToBeCreated: OrderToBeCreated): Promise<string> => {
  const INVALID_CLIENT = 'Cliente inválido.'
  const INVALID_MEMBER = 'Associado inválido.'

  const client = await clientRepositories.findOneById(orderToBeCreated.clientId, { statusId: status.ACTIVE })
  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const member = await memberRepositories.findOneById(orderToBeCreated.memberId, { statusId: status.ACTIVE })
  if (member === null) throw new BadRequestError(INVALID_MEMBER)

  const { id: orderId } = await orderRepositories.createOne(orderToBeCreated)

  await orderRepositories.createManyItems(orderId, orderToBeCreated.items)

  await memberRepositories.addToSavings(orderToBeCreated.memberId, orderToBeCreated.totalSavings)
  await clientRepositories.addToSavings(orderToBeCreated.clientId, orderToBeCreated.totalSavings)

  return orderId
}

const activateOne = async (id: string): Promise<void> => {
  const ORDER_NOT_FOUND = 'Pedido não encontrado.'
  const ORDER_ALREADY_ACTIVE = 'O pedido já está ativo.'

  const orderToBeUpdated = await orderRepositories.findAnyById(id, { id: true, statusId: true })

  if (orderToBeUpdated === null) throw new NotFoundError(ORDER_NOT_FOUND)
  if (orderToBeUpdated.statusId === 1) throw new BadRequestError(ORDER_ALREADY_ACTIVE)

  const orderUpdated = await orderRepositories.updateOne(id, { statusId: 1 })

  await memberRepositories.addToSavings(orderUpdated.memberId, orderUpdated.totalSavings)
}

const inactivateOne = async (id: string): Promise<void> => {
  const ORDER_NOT_FOUND = 'Pedido não encontrado.'
  const ORDER_ALREADY_INACTIVE = 'O pedido já está inativo.'

  const orderToBeUpdated = await orderRepositories.findAnyById(id, { id: true, statusId: true })

  if (orderToBeUpdated === null) throw new NotFoundError(ORDER_NOT_FOUND)
  if (orderToBeUpdated.statusId === 2) throw new BadRequestError(ORDER_ALREADY_INACTIVE)

  const orderUpdated = await orderRepositories.updateOne(id, { statusId: 2 })

  if (orderToBeUpdated.statusId === 1) await memberRepositories.subtractFromSavings(orderUpdated.memberId, orderUpdated.totalSavings)
}

const deleteOne = async (id: string): Promise<void> => {
  const ORDER_NOT_FOUND = 'Pedido não encontrado.'
  const ORDER_ALREADY_DELETED = 'O pedido já está excluído.'

  const orderToBeUpdated = await orderRepositories.findAnyById(id, { id: true, statusId: true })

  if (orderToBeUpdated === null) throw new NotFoundError(ORDER_NOT_FOUND)
  if (orderToBeUpdated.statusId === 3) throw new BadRequestError(ORDER_ALREADY_DELETED)

  const orderUpdated = await orderRepositories.updateOne(id, { statusId: 3 })

  if (orderToBeUpdated.statusId === 1) await memberRepositories.subtractFromSavings(orderUpdated.memberId, orderUpdated.totalSavings)
}

export default {
  activateOne,
  createOne,
  deleteOne,
  inactivateOne
}
