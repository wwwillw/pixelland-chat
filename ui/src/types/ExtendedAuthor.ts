import { Author } from '@/graphql/types.gen'

interface Extension {
  // accessedAtDate: Date
  likedAtDate?: Date
  likedAtTimeSince?: string
}

export type ExtendedAuthor = Author & Extension
