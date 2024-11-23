import type { Address, Client } from '@prisma/client'

import { addressRepositories } from '../../address/repositories/addressRepositories'
import { BadRequestError } from '../../../errors'
import { clientRepositories } from '../repositories/clientRepositories'
import type { ClientToBeCreated } from '../clientInterfaces'

export async function createOne (clientToBeCreated: ClientToBeCreated): Promise<Client['id']> {
  const CLIENT_ALREADY_EXISTS = 'Cliente já cadastrado.'

  // Verifica se o cliente já existe para antes de cadastrar o endereço
  // para não cadastrar endereço em casos de erro
  const client = await clientRepositories.findOne({ cnpj: clientToBeCreated.cnpj }, false)

  if (client !== null) throw new BadRequestError(CLIENT_ALREADY_EXISTS)

  let addressId: Address['id'] | null = null
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (clientToBeCreated.address) {
    const address = await addressRepositories.createOne(clientToBeCreated.address)
    addressId = address.id
  }

  const { id } = await clientRepositories.createOne(clientToBeCreated, addressId)

  return id
}
