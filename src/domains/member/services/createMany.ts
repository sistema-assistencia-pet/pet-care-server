import csv from 'csv-parser'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { addressRepositories } from '../../address/repositories/addressRepositories'
import type { AddressToBeCreated } from '../../address/addressInterfaces'
import { BadRequestError } from '../../../errors'
import { clientRepositories } from '../../client/repositories/clientRepositories'
import { convertBufferToStream } from '../../../utils/convertBufferToStream'
import { memberRepositories } from '../repositories/memberRepositories'
import type { MemberToBeCreatedInBulk } from '../memberInterfaces'
import { prismaError } from '../../../enums/prismaError'
import { status } from '../../../enums/status'

export async function createMany (clientId: string, fileBuffer: Buffer): Promise<void> {
  const INVALID_CLIENT = 'Cliente inválido.'

  const client = await clientRepositories.findOne({ id: clientId }, false, { statusId: status.ACTIVE })

  if (client === null) throw new BadRequestError(INVALID_CLIENT)

  const fileStream = convertBufferToStream(fileBuffer)

  fileStream
    .pipe(csv())
    .on('data', async (row) => {
      try {
        let addressId: number | null = null

        if ([
          row.address_cep,
          row.address_street,
          row.address_number,
          row.address_complement,
          row.address_neighborhood,
          row.address_cityId,
          row.address_stateId
        ].some((value) => value !== '')) {
          const addressToBeCreated: AddressToBeCreated = {
            cep: row.address_cep === '' ? null : row.address_cep,
            street: row.address_street === '' ? null : row.address_street,
            number: row.address_number === '' ? null : row.address_number,
            complement: row.address_complement === '' ? null : row.address_complement,
            neighborhood: row.address_neighborhood === '' ? null : row.address_neighborhood,
            cityId: row.address_cityId === '' ? null : parseInt(row.address_cityId as string),
            stateId: row.address_stateId === '' ? null : parseInt(row.address_stateId as string)
          }

          const address = await addressRepositories.createOne(addressToBeCreated)
          addressId = address.id
        }

        const memberToBeCreated: MemberToBeCreatedInBulk = {
          birthDate: row.data_de_nascimento,
          clientId,
          cpf: row.cpf,
          email: row.email,
          name: row.nome,
          phoneNumber: row.telefone,
          statusId: status.ACTIVE,
          addressId
        }

        await memberRepositories.createOneForBulkCreation(memberToBeCreated)
      } catch (error) {
        if (
          (error instanceof PrismaClientKnownRequestError) &&
          (error.code === prismaError.ALREADY_EXITS)
        ) {
          logger.error(`O associado de CPF ${row.cpf} não foi cadastrado: esse CPF já existe no banco de dados.`)
        } else {
          logger.error({ row, error }, 'Erro ao cadastrar associado.')
        }
      }
    })
}
