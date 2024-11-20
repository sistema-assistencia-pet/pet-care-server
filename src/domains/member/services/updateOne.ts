/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { Member } from '@prisma/client'
import type { MemberToBeUpdated } from '../memberInterfaces'
import { memberRepositories } from '../repositories/memberRepositories'
import { NotFoundError } from '../../../errors'
import { addressRepositories } from '../../address/repositories/addressRepositories'

export async function updateOne (
  memberId: string,
  memberToBeUpdated: MemberToBeUpdated
): Promise<Member['id']> {
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'

  const currentMember = await memberRepositories.findOne({ id: memberId }, false)

  if (currentMember === null) throw new NotFoundError(MEMBER_NOT_FOUND)

  const { address: currentAddress } = currentMember
  const { address: newAddress, ...updatedMemberWithoutAddress } = memberToBeUpdated

  if (currentAddress) { // endereço antigo é diferente de null
    if (newAddress) { // novo endereço é diferente de null - atualizar endereço antigo
      await addressRepositories.updateOne(currentAddress.id, newAddress)
    } else { // novo endereço é null - excluir endereço antigo
      await memberRepositories.updateOne(currentMember.id, { addressId: null })
      await addressRepositories.deleteOne(currentAddress.id)
    }
  } else if (newAddress) { // endereço antigo é null e novo endereço é diferente de null - criar novo endereço
    const { id: addressId } = await addressRepositories.createOne(newAddress)
    await memberRepositories.updateOne(currentMember.id, { addressId })
  }

  const id = await memberRepositories.updateOne(memberId, updatedMemberWithoutAddress)

  return id
}
