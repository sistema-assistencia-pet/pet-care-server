import type { Partner } from '@prisma/client'

import { getEnvironmentVariable } from '../../../utils/getEnvironmentVariable'
import { NotFoundError } from '../../../errors'
import { partnerRepositories } from '../repositories/partnerRepositories'
import type { PartnerToBeReturned } from '../partnerInterfaces'

export async function findOneById (id: Partner['id']): Promise<PartnerToBeReturned> {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'
  const API_BASE_URL = getEnvironmentVariable('API_BASE_URL')

  const partner = await partnerRepositories.findOne({ id })

  if (partner === null) throw new NotFoundError(PARTNER_NOT_FOUND)

  partner.image = partner.image !== null
    ? `${API_BASE_URL}/api/files/${partner.image}`
    : partner.image

  partner.logo = partner.logo !== null
    ? `${API_BASE_URL}/api/files/${partner.logo}`
    : partner.logo

  return partner
}
