import { Order } from '@prisma/client'
import { OrderToBeCreated } from './interfaces'
import prismaClient from '../../database/connection'
import { BadRequestError, DatabaseError } from '../../errors'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prismaErrors } from '../../enums/prismaErrors'

const createOne = async (orderToBeCreated: OrderToBeCreated): Promise<Pick<Order, 'id'>> => {
  const ORDER_ALREADY_EXISTS = 'Pedido já cadastrado.'
  try {
    const order = await prismaClient.order.create({
      data: { ...orderToBeCreated },
      select: {
        id: true,
      }
    })
  
    return order
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError(ORDER_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}

export default { createOne }
