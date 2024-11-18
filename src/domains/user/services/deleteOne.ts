import { status } from '../../../enums/status'
import { NotFoundError } from '../../../errors'
import { userRepositories } from '../repositories/userRepositories'

export async function deleteOne (userToBeDeletedId: string): Promise<string> {
  const user = await userRepositories.findOne({ id: userToBeDeletedId })

  if (user === null) throw new NotFoundError('Usuário não encontrado.')

  const userId = await userRepositories.updateOne(userToBeDeletedId, { cpf: `${user.cpf}_EXCLUIDO`, statusId: status.DELETED })

  return userId
}
