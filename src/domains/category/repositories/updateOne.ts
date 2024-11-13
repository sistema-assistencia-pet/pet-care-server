import type { Category } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { CategoryToBeUpdated } from '../categoryInterfaces'
import prismaClient from '../../../database/connection'
import { prismaErrors } from '../../../enums/prismaErrors'

export async function updateOne (categoryToBeUpdated: CategoryToBeUpdated): Promise<Pick<Category, 'id'>> {
  const CATEGORY_ALREADY_EXISTS = 'Categoria já cadastrada.'
  const CATEGORY_NOT_FOUND = 'Categoria não encontrada.'

  const { id, ...categoryToBeUpdatedWithoutId } = categoryToBeUpdated

  try {
    const category = await prismaClient.category.update({
      where: { id },
      data: { ...categoryToBeUpdatedWithoutId },
      select: {
        id: true
      }
    })

    return category
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.ALREADY_EXITS)
    ) throw new BadRequestError(CATEGORY_ALREADY_EXISTS)

    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaErrors.NOT_FOUND)
    ) throw new BadRequestError(CATEGORY_NOT_FOUND)

    throw new DatabaseError(error)
  }
}
