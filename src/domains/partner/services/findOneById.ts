import partnerRepositories from '../repositories'
import type { PartnerToBeReturned } from '../partnerInterfaces'
import { NotFoundError } from '../../../errors'
import { getEnvironmentVariable } from '../../../utils/getEnvironmentVariable'

export async function findOneById (id: string): Promise<PartnerToBeReturned> {
  const PARTNER_NOT_FOUND = 'Estabelecimento não encontrado.'
  const API_BASE_URL = getEnvironmentVariable('API_BASE_URL')

  const partner = await partnerRepositories.findOneById(id)

  if (partner === null) throw new NotFoundError(PARTNER_NOT_FOUND)

  partner.image = partner.image !== null
    ? `${API_BASE_URL}/api/files/${partner.image}`
    : partner.image

  partner.logo = partner.logo !== null
    ? `${API_BASE_URL}/api/files/${partner.logo}`
    : partner.logo

  const { updatedAt, ...partnerToBeReturned } = partner

  return partnerToBeReturned
}
