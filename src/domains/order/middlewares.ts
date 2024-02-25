import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import { BadRequestError, GenericError } from '../../errors'

const validateCreateOnePayload = (req: Request, _res: Response, next: NextFunction): void => {
  const createOnePayloadSchema = z.object({
    memberId: z
      .string({
        invalid_type_error: '"memberId" deve ser uma string.',
        required_error: '"memberId" é obrigatório.',
      })
      .uuid({
        message: '"memberId" deve ser um UUID válido.',
      }),

    clientId: z
      .string({
        invalid_type_error: '"clientId" deve ser uma string.',
        required_error: '"clientId" é obrigatório.',
      })
      .uuid({
        message: '"clientId" deve ser um UUID válido.',
      }),

    medicineName: z
      .string({
        invalid_type_error: '"medicineName" deve ser uma string.',
        required_error: '"medicineName" é obrigatório.',
      })
      .min(1, {
        message: '"medicineName" deve ter pelo menos 1 caracteres.',
      }),

    medicineType: z
      .string({
        invalid_type_error: '"medicineType" deve ser uma string.',
        required_error: '"medicineType" é obrigatório.',
      })
      .min(1, {
        message: '"medicineType" deve ter pelo menos 1 caracteres.',
      }),

    quantity: z
      .number({
        invalid_type_error: '"quantity" deve ser um number.',
        required_error: '"quantity" é obrigatório.',
      })
      .gte(1, {
        message: '"quantity" deve ser maior ou igual a 1.',
      }),

    listPrice: z
      .number({
        invalid_type_error: '"listPrice" deve ser um number.',
        required_error: '"listPrice" é obrigatório.',
      }),

    discountPrice: z
      .number({
        invalid_type_error: '"discountPrice" deve ser um number.',
        required_error: '"discountPrice" é obrigatório.',
      }),

    statusId: z
      .number({
        invalid_type_error: '"statusId" deve ser um number.',
        required_error: '"statusId" é obrigatório.',
      })
      .gte(1, {
        message: '"statusId" deve ser 1, 2 ou 3.',
      })
      .lte(3, {
        message: '"statusId" deve ser 1, 2 ou 3.',
      })
  })

  try {
    createOnePayloadSchema.parse({
      memberId: req.body.memberId,
      clientId: req.body.clientId,
      medicineName: req.body.medicineName,
      medicineType: req.body.medicineType,
      quantity: req.body.quantity,
      listPrice: req.body.listPrice,
      discountPrice: req.body.discountPrice,
      statusId: req.body.statusId
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new BadRequestError(error.issues.reduce((acc, issue) => `${acc} ${issue.message}`, ''))
    }

    throw new GenericError(error)
  }

  next()
}

export default { validateCreateOnePayload }
