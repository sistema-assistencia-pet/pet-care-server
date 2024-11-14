import type { Status } from '@prisma/client'

export type StatusMinData = Pick<Status, 'id' | 'translation'>
