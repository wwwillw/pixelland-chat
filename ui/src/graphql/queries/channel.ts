import gql from 'graphql-tag'

import { ChannelFragment } from '@/graphql/fragments/fragments'

export const channel = gql`
  query channel($id: Uuid!, $messagesLast: Int!, $messagesBefore: String!) {
    channel(id: $id) {
      ...ChannelFragment
    }
  }
  ${ChannelFragment}
`
