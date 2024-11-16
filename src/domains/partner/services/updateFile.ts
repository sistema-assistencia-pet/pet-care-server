import { partnerRepositories } from '../repositories/partnerRepositories'
import type { FILE_FIELD_NAMES } from '../../../enums/fileFieldNames'

export async function updateFile (
  { id, fileName, fieldName }: { id: string, fileName: string, fieldName: FILE_FIELD_NAMES }
): Promise<void> {
  await partnerRepositories.updateOne(id, { [fieldName]: fileName })
}
