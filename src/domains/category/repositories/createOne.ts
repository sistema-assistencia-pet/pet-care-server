import type { Category } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError, DatabaseError } from '../../../errors'
import type { CategoryToBeCreated } from '../categoryInterfaces'
import prismaClient from '../../../database/connection'
import { prismaError } from '../../../enums/prismaError'

export async function createOne (categoryToBeCreated: CategoryToBeCreated): Promise<Pick<Category, 'id'>> {
  const CATEGORY_ALREADY_EXISTS = 'Categoria já cadastrada.'

  try {
    const category = await prismaClient.category.create({
      data: { ...categoryToBeCreated },
      select: {
        id: true
      }
    })

    return category
  } catch (error) {
    if (
      (error instanceof PrismaClientKnownRequestError) &&
      (error.code === prismaError.ALREADY_EXITS)
    ) throw new BadRequestError(CATEGORY_ALREADY_EXISTS)

    throw new DatabaseError(error)
  }
}
