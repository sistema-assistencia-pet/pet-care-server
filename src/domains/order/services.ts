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

export default { createOne }
