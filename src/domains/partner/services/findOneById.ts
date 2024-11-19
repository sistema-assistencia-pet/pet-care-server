import type { Partner } from '@prisma/client'

import type { AccessTokenData } from '../../../interfaces'
import { getEnvironmentVariable } from '../../../utils/getEnvironmentVariable'
import { NotFoundError } from '../../../errors'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type { PartnerToBeReturnedWithoutPassword } from '../partnerInterfaces'
import { role } from '../../../enums/role'

function formatPartnerImages (partner: PartnerToBeReturnedWithoutPassword): PartnerToBeReturnedWithoutPassword {
  const API_BASE_URL = getEnvironmentVariable('API_BASE_URL')

  partner.image = partner.image !== null
    ? `${API_BASE_URL}/api/files/${partner.image}`
    : partner.image

  partner.logo = partner.logo !== null
    ? `${API_BASE_URL}/api/files/${partner.logo}`
    : partner.logo

  return partner
}

export async function findOneById (accessTokenData: AccessTokenData, id: Partner['id']): Promise<PartnerToBeReturnedWithoutPassword> {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  const shouldReturnFullData = accessTokenData.roleId === role.MASTER

  const partner = await partnerRepositories.findOne({ id }, shouldReturnFullData)

  if (partner === null) throw new NotFoundError(PARTNER_NOT_FOUND)

  const { password, ...partnerToBeReturnedWithoutPassword } = partner

  const partnerToBeReturned = formatPartnerImages(partnerToBeReturnedWithoutPassword)

  return partnerToBeReturned
}
