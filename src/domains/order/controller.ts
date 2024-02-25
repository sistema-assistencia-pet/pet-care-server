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

const activateOne = async (req: Request, res: Response): Promise<Response> => {
  const ORDER_SUCCESSFULLY_ACTIVATED = 'Pedido ativado com sucesso.'

  const orderId = req.params['id']

  await orderService.activateOne(orderId)

  return res.status(HttpStatusCode.Ok).json({ message: ORDER_SUCCESSFULLY_ACTIVATED })
}

const inactivateOne = async (req: Request, res: Response): Promise<Response> => {
  const ORDER_SUCCESSFULLY_INACTIVATED = 'Pedido inativado com sucesso.'

  const orderId = req.params['id']

  await orderService.inactivateOne(orderId)

  return res.status(HttpStatusCode.Ok).json({ message: ORDER_SUCCESSFULLY_INACTIVATED })
}

const deleteOne = async (req: Request, res: Response): Promise<Response> => {
  const ORDER_SUCCESSFULLY_DELETED = 'Pedido excluído com sucesso.'

  const orderId = req.params['id']

  await orderService.deleteOne(orderId)

  return res.status(HttpStatusCode.Ok).json({ message: ORDER_SUCCESSFULLY_DELETED })
}

export default {
  activateOne,
  createOne,
  deleteOne,
  inactivateOne
}
