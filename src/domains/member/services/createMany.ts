import csv from 'csv-parser'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { BadRequestError } from '../../../errors'
import clientRepositories from '../../client/repositories'
import { convertBufferToStream } from '../../../utils/convertBufferToStream'
import { memberRepositories } from '../repositories/memberRepositories'
import { type MemberToBeCreated } from '../memberInterfaces'
import { prismaError } from '../../../enums/prismaError'
import { status } from '../../../enums/status'

export async function createMany (clientId: string, fileBuffer: Buffer): Promise<void> {
  const INVALID_CLIENT = 'Cliente inválido.'

  const client = await clientRepositories.findOneById(clientId, { statusId: status.ACTIVE })

  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const fileStream = convertBufferToStream(fileBuffer)

  fileStream
    .pipe(csv())
    .on('data', async (row) => {
      const memberToBeCreated: MemberToBeCreated = {
        birthDate: row.data_de_nascimento,
        cep: row.cep,
        clientId,
        cpf: row.cpf,
        email: row.email,
        name: row.nome,
        phoneNumber: row.telefone,
        statusId: status.ACTIVE
      }

      try {
        await memberRepositories.createOneForBulkCreation(memberToBeCreated)
      } catch (error) {
        if (
          (error instanceof PrismaClientKnownRequestError) &&
          (error.code === prismaError.ALREADY_EXITS)
        ) {
          logger.error(`O associado de CPF ${row.cpf} não foi cadastrado: esse CPF já existe no banco de dados.`)
        }
      }
    })
}
