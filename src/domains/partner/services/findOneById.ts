import type { Partner } from '@prisma/client'

import type { AccessTokenData } from '../../../interfaces'
import { getEnvironmentVariable } from '../../../utils/getEnvironmentVariable'
import { NotFoundError } from '../../../errors'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type { PartnerToBeReturned } from '../partnerInterfaces'
import { role } from '../../../enums/role'

function formatPartnerImages (partner: PartnerToBeReturned): PartnerToBeReturned {
  const EXCLUSIVEPASS_API_BASE_URL = getEnvironmentVariable('EXCLUSIVEPASS_API_BASE_URL')

  partner.image = partner.image !== null
    ? `${EXCLUSIVEPASS_API_BASE_URL}/api/files/${partner.image}`
    : partner.image

  partner.logo = partner.logo !== null
    ? `${EXCLUSIVEPASS_API_BASE_URL}/api/files/${partner.logo}`
    : partner.logo

  return partner
}

export async function findOneById (accessTokenData: AccessTokenData, id: Partner['id']): Promise<PartnerToBeReturned> {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'

  const shouldReturnFullData = accessTokenData.roleId === role.MASTER

  const partner = await partnerRepositories.findOne({ id }, shouldReturnFullData)

  if (partner === null) throw new NotFoundError(PARTNER_NOT_FOUND)

  const partnerToBeReturned = formatPartnerImages(partner)

  return partnerToBeReturned
}
