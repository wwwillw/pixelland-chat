import * as Types from '../types.gen';

import * as Operations from './instance.js';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type InstanceQueryVariables = Types.Exact<{
  id: Types.Scalars['Uuid'];
  channelsFirst?: Types.InputMaybe<Types.Scalars['Int']>;
  channelsAfter?: Types.InputMaybe<Types.Scalars['String']>;
  messagesLast?: Types.InputMaybe<Types.Scalars['Int']>;
  messagesBefore?: Types.InputMaybe<Types.Scalars['String']>;
}>;


export type InstanceQuery = { __typename?: 'Query', instance: { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Types.Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Types.Role> }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Types.Role>, publishers: Array<Types.Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Types.Role> } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Types.Role> } } };

export declare const instance: import("graphql").DocumentNode;

export function useInstanceQuery(variables: InstanceQueryVariables | VueCompositionApi.Ref<InstanceQueryVariables> | ReactiveFunction<InstanceQueryVariables>, options: VueApolloComposable.UseQueryOptions<InstanceQuery, InstanceQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<InstanceQuery, InstanceQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<InstanceQuery, InstanceQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<InstanceQuery, InstanceQueryVariables>(Operations.instance, variables, options);
}
export function useInstanceLazyQuery(variables: InstanceQueryVariables | VueCompositionApi.Ref<InstanceQueryVariables> | ReactiveFunction<InstanceQueryVariables>, options: VueApolloComposable.UseQueryOptions<InstanceQuery, InstanceQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<InstanceQuery, InstanceQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<InstanceQuery, InstanceQueryVariables>> = {}) {
  return VueApolloComposable.useLazyQuery<InstanceQuery, InstanceQueryVariables>(Operations.instance, variables, options);
}
export type InstanceQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<InstanceQuery, InstanceQueryVariables>;