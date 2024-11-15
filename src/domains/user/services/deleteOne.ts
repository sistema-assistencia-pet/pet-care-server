import { status } from '../../../enums/statusEnum'
import { NotFoundError } from '../../../errors'
import { userRepositories } from '../repositories/userRepositories'

export async function deleteOne (userToBeDeletedId: string): Promise<string> {
  const user = await userRepositories.findOneById({ id: userToBeDeletedId })

  if (user === null) throw new NotFoundError('Usuário não encontrado.')

  const userId = await userRepositories.updateOne(userToBeDeletedId, { cpf: `${user.cpf}_EXCLUIDO`, statusId: status.DELETED })

  return userId
}
