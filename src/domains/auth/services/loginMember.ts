import * as bcrypt from 'bcrypt'

import { generateAccessToken } from '../../../utils/generateAccessToken'
import type { IMemberLoginResponse } from '../authInterfaces'
import { memberRepositories } from '../../member/repositories/memberRepositories'
import { role } from '../../../enums/roleEnum'
import { UnauthorizedError } from '../../../errors'

export async function loginMember (cpf: string, password: string): Promise<IMemberLoginResponse> {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const MEMBER_NOT_FOUND = 'Associado não encontrado ou roleId inválido.'
  const MEMBER_WITHOUT_PASSWORD = 'Associado ainda não criou a senha. Por favor, realize o primeiro acesso.'

  const member = await memberRepositories.findOneByCpf(cpf)

  if (member === null || (member.roleId !== role.MEMBER)) {
    logger.error({ cpf }, MEMBER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  if (!member.hasCreatedPassword || member.password === null) throw new UnauthorizedError(MEMBER_WITHOUT_PASSWORD)

  const isPasswordValid = await bcrypt.compare(password, member.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const { id, client, roleId } = member

  const accessToken = await generateAccessToken({
    id,
    clientId: client === null ? '' : client.id,
    roleId
  })

  return {
    accessToken,
    user: {
      id: member.id,
      name: member.name,
      roleId: member.roleId,
      client: member.client
    }
  }
}
