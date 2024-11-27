import type { Address, Client } from '@prisma/client'

import { addressRepositories } from '../../address/repositories/addressRepositories'
import { BadRequestError, InternalServerError } from '../../../errors'
import { clientRepositories } from '../repositories/clientRepositories'
import type { ClientToBeCreated } from '../clientInterfaces'
import { userRepositories } from '../../user/repositories/userRepositories'
import type { UserToBeCreated } from '../../user/userInterfaces'
import { role } from '../../../enums/role'
import { voucherRepositories } from '../../voucher/repositories/voucherRepositories'
import { status } from '../../../enums/status'
import { voucherSettingsByClientRepositories } from '../../voucherSettingsByClient/repositories/voucherSettingsByClientRepositories'

async function createUser (userToBeCreated: UserToBeCreated): Promise<void> {
  try {
    await userRepositories.createOne(userToBeCreated)
  } catch (error) {
    logger.error(error)
    throw new InternalServerError('O cliente foi cadastrado com sucesso, mas houve um erro ao criar usuário administrador do cliente. Favor criar um usuário para o cliente manualmente.')
  }
}

async function setupVouchers (clientId: Client['id']): Promise<void> {
  const CLIENT_BALANCE_RESERVED_BY_VOUCHER = 0
  const DEFAULT_WATING_TIME_IN_DAYS = 1

  try {
    const vouchers = await voucherRepositories.findMany({ where: { statusId: status.ACTIVE } })

    if (vouchers.length === 0) return

    for (const voucher of vouchers) {
      await voucherSettingsByClientRepositories.createOne({
        clientId,
        voucherId: voucher.id,
        reservedBalanceInCents: CLIENT_BALANCE_RESERVED_BY_VOUCHER,
        watingTimeInDays: DEFAULT_WATING_TIME_IN_DAYS
      })
    }
  } catch (error) {
    logger.error(error)
    throw new InternalServerError('O cliente foi cadastrado com sucesso, mas houve um erro ao configurar vouchers para o cliente. Favor configurar vouchers para o cliente manualmente.')
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

  const managerUserToBeCreated: UserToBeCreated = {
    name: clientToBeCreated.managerName,
    cpf: clientToBeCreated.managerCpf,
    email: clientToBeCreated.managerEmail,
    password: clientToBeCreated.managerPassword,
    roleId: role.CLIENT_ADMIN,
    clientId
  }

  await createUser(managerUserToBeCreated)

  await setupVouchers(clientId)

  return clientId
}
