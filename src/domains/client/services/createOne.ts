import type { Address, Client } from '@prisma/client'
import bcrypt from 'bcrypt'

import { addressRepositories } from '../../address/repositories/addressRepositories'
import { BadRequestError, InternalServerError } from '../../../errors'
import { clientRepositories } from '../repositories/clientRepositories'
import type { ClientToBeCreated } from '../clientInterfaces'
import { userRepositories } from '../../user/repositories/userRepositories'
import type { UserToBeCreated } from '../../user/userInterfaces'
import { role } from '../../../enums/role'

async function createUser (userToBeCreated: UserToBeCreated): Promise<void> {
  try {
    await userRepositories.createOne(userToBeCreated)
  } catch (error) {
    logger.error(error)
    throw new InternalServerError('O cliente foi cadastrado com sucesso, mas houve um erro ao criar usuário administrador do cliente. Favor criar um usuário para o cliente manualmente.')
  }
}

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

  const { id: clientId } = await clientRepositories.createOne(clientToBeCreated, addressId)

  const encryptedPassword = await bcrypt.hash(clientToBeCreated.managerPassword, 10)

  const managerUserToBeCreated: UserToBeCreated = {
    name: clientToBeCreated.managerName,
    cpf: clientToBeCreated.managerCpf,
    email: clientToBeCreated.managerEmail,
    password: encryptedPassword,
    roleId: role.CLIENT_ADMIN,
    clientId
  }

  await createUser(managerUserToBeCreated)

  return clientId
}
