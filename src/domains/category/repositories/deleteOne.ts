import type { Category } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import prismaClient from '../../../database/connection'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function deleteOne (id: number): Promise<Pick<Category, 'id'>> {
  const CATEGORY_NOT_FOUND = 'Categoria não encontrada.'

  try {
    const category = await prismaClient.category.delete({
      where: { id },
      select: {
        id: true
      }
    })

    return category
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new BadRequestError(CATEGORY_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
