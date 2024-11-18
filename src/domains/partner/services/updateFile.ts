import { partnerRepositories } from '../repositories/partnerRepositories'
import type { fileFieldName } from '../../../enums/fileFieldName'

export async function updateFile (
  { id, fileName, fieldName }: { id: string, fileName: string, fieldName: fileFieldName }
): Promise<void> {
  await partnerRepositories.updateOne(id, { [fieldName]: fileName })
}
