import { HttpStatusCode } from 'axios'
import { Request, Response } from 'express'

import orderService from './services'
import { OrderToBeCreated } from './interfaces'

const createOne = async (req: Request, res: Response): Promise<Response> => {
  const ORDER_SUCCESSFULLY_CREATED = 'Pedido cadastrado com sucesso.'

  const orderToBeCreated: OrderToBeCreated = {
    memberId: req.body.memberId,
    clientId: req.body.clientId,
    medicineName: req.body.medicineName,
    medicineType: req.body.medicineType,
    quantity: req.body.quantity,
    listPrice: req.body.listPrice,
    discountPrice: req.body.discountPrice,
    statusId: req.body.statusId
  }

  const orderId = await orderService.createOne(orderToBeCreated)

  return res.status(HttpStatusCode.Created).json({ message: ORDER_SUCCESSFULLY_CREATED, orderId })
}

export default { createOne }
