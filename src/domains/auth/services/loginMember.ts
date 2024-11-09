import * as bcrypt from 'bcrypt'

import { UnauthorizedError } from '../../../errors'
import type { ILoginResponse } from '../interfaces'
import { memberRepositories } from '../../member/repositories/memberRepositories'
import { role } from '../../../enums/roleEnum'

export async function loginMember (cpf: string, password: string): Promise<ILoginResponse> {
  const BAD_CREDENTIALS = 'Credenciais inválidas.'
  const MEMBER_NOT_FOUND = 'Associado não encontrado.'
  const MEMBER_WITHOUT_PASSWORD = 'Associado ainda não criou a senha. Por favor, realize o primeiro acesso.'

  const member = await memberRepositories.findOneByCpf(cpf)

  if (member === null) {
    logger.error({ cpf }, MEMBER_NOT_FOUND)

    throw new UnauthorizedError(BAD_CREDENTIALS)
  }

  if (!member.createdPassword || member.password === null) throw new UnauthorizedError(MEMBER_WITHOUT_PASSWORD)

  const isPasswordValid = await bcrypt.compare(password, member.password)

  if (!isPasswordValid) throw new UnauthorizedError(BAD_CREDENTIALS)

  const accessToken = await generateAccessToken(member.id, role.MEMBER)

  return {
    accessToken,
    user: {
      id: member.id,
      name: member.name,
      roleId: role.MEMBER
    }
  }
}
