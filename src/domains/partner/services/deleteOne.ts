import partnerRepositories from '../repositories'

export async function deleteOne (id: string): Promise<void> {
  await partnerRepositories.updateOne(id, { statusId: 3 })
}
