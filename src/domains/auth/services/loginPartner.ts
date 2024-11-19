import * as bcrypt from 'bcrypt'

import { generateAccessToken } from '../../../utils/generateAccessToken'
import type { IPartnerLoginResponse } from '../authInterfaces'
import { partnerRepositories } from '../../partner/repositories/partnerRepositories'
import { UnauthorizedError } from '../../../errors'

export async function loginPartner (cnpj: string, password: string): Promise<IPartnerLoginResponse> {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  const partner = await partnerRepositories.findOne({ cnpj }, true)

  if (partner === null) {
    logger.error({ cnpj }, PARTNER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  const isPasswordValid = await bcrypt.compare(password, partner.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const { id, roleId } = partner

  const accessToken = await generateAccessToken({
    id,
    clientId: '',
    roleId
  })

  return {
    accessToken,
    user: {
      id: partner.id,
      name: partner.fantasyName,
      roleId: partner.roleId,
      client: null
    }
  }
}
