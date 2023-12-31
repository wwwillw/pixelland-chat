import { GraphQLClient } from 'graphql-request';
import { GraphQLClientRequestHeaders } from 'graphql-request/build/cjs/types';
import { print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
  Uuid: { input: any; output: any; }
};

export enum Access {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type AppBadgesConnection = {
  __typename?: 'AppBadgesConnection';
  edges: Array<AppBadgesEdge>;
  pageInfo: PageInfo;
};

export type AppBadgesEdge = {
  __typename?: 'AppBadgesEdge';
  cursor: Scalars['String']['output'];
  node: Badge;
};

export type Author = {
  __typename?: 'Author';
  avatar: Scalars['String']['output'];
  banReason?: Maybe<Scalars['String']['output']>;
  bio: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  id: Scalars['Uuid']['output'];
  instanceId: Scalars['Uuid']['output'];
  name: Scalars['String']['output'];
  roles: Array<Role>;
  userId: Scalars['Uuid']['output'];
};

export type Badge = {
  __typename?: 'Badge';
  icon: Scalars['String']['output'];
  id: Scalars['Uuid']['output'];
  name: Scalars['String']['output'];
};

export type BadgeInput = {
  icon: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Channel = {
  __typename?: 'Channel';
  createdAt: Scalars['Time']['output'];
  id: Scalars['Uuid']['output'];
  instanceId: Scalars['Uuid']['output'];
  isCategory: Scalars['Boolean']['output'];
  isComments: Scalars['Boolean']['output'];
  lastMessageAddedAt?: Maybe<Scalars['Time']['output']>;
  messageCount: Scalars['Int']['output'];
  messagesConnection: ChannelMessagesConnection;
  name: Scalars['String']['output'];
  publishers: Array<Role>;
  rank: Scalars['String']['output'];
  readers: Array<Role>;
  updatedAt: Scalars['Time']['output'];
};


export type ChannelMessagesConnectionArgs = {
  before?: Scalars['String']['input'];
  last?: Scalars['Int']['input'];
};

export type ChannelInput = {
  instanceId: Scalars['Uuid']['input'];
  isCategory: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  publishers: Array<Role>;
  readers: Array<Role>;
};

export type ChannelMessagesConnection = {
  __typename?: 'ChannelMessagesConnection';
  edges: Array<ChannelMessagesEdge>;
  pageInfo: PageInfo;
};

export type ChannelMessagesEdge = {
  __typename?: 'ChannelMessagesEdge';
  cursor: Scalars['String']['output'];
  node: Message;
};

export type ChannelReorderInput = {
  prevChannelId?: InputMaybe<Scalars['Uuid']['input']>;
};

export type Instance = {
  __typename?: 'Instance';
  author: Author;
  authorsConnection: InstanceAuthorsConnection;
  channelsConnection: InstanceChannelsConnection;
  commentsCount: Scalars['Int']['output'];
  createdAt: Scalars['Time']['output'];
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  id: Scalars['Uuid']['output'];
  likesConnection: InstanceLikesConnection;
  likesCount: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  readAccess: Access;
  showAuthor: Scalars['Boolean']['output'];
  showChat: Scalars['Boolean']['output'];
  showComments: Scalars['Boolean']['output'];
  showLikes: Scalars['Boolean']['output'];
};


export type InstanceAuthorsConnectionArgs = {
  after?: Scalars['String']['input'];
  first?: Scalars['Int']['input'];
  roles: Array<Role>;
};


export type InstanceChannelsConnectionArgs = {
  after?: Scalars['String']['input'];
  first?: Scalars['Int']['input'];
};


export type InstanceLikesConnectionArgs = {
  after?: Scalars['String']['input'];
  first?: Scalars['Int']['input'];
};

export type InstanceAuthorsConnection = {
  __typename?: 'InstanceAuthorsConnection';
  edges: Array<InstanceAuthorsEdge>;
  pageInfo: PageInfo;
};

export type InstanceAuthorsEdge = {
  __typename?: 'InstanceAuthorsEdge';
  cursor: Scalars['String']['output'];
  node: Author;
};

export type InstanceChannelsConnection = {
  __typename?: 'InstanceChannelsConnection';
  edges: Array<InstanceChannelsEdge>;
  pageInfo: PageInfo;
};

export type InstanceChannelsEdge = {
  __typename?: 'InstanceChannelsEdge';
  cursor: Scalars['String']['output'];
  node: Channel;
};

export type InstanceInput = {
  description: Scalars['String']['input'];
  icon: Scalars['String']['input'];
  id?: InputMaybe<Scalars['Uuid']['input']>;
  name: Scalars['String']['input'];
  readAccess: Access;
  showAuthor: Scalars['Boolean']['input'];
  showChat: Scalars['Boolean']['input'];
  showComments: Scalars['Boolean']['input'];
  showLikes: Scalars['Boolean']['input'];
};

export type InstanceLikesConnection = {
  __typename?: 'InstanceLikesConnection';
  edges: Array<InstanceLikesEdge>;
  pageInfo: PageInfo;
};

export type InstanceLikesEdge = {
  __typename?: 'InstanceLikesEdge';
  cursor: Scalars['String']['output'];
  likedAt: Scalars['Time']['output'];
  node: Author;
};

export type InstancePinInput = {
  pinned: Scalars['Boolean']['input'];
};

export type InstanceReorderInput = {
  prevInstanceId?: InputMaybe<Scalars['Uuid']['input']>;
};

export type Invite = {
  __typename?: 'Invite';
  author: Author;
  code: Scalars['String']['output'];
  createdAt: Scalars['Time']['output'];
  expiresAt?: Maybe<Scalars['Time']['output']>;
  id: Scalars['Uuid']['output'];
  instance?: Maybe<Instance>;
  instanceId: Scalars['Uuid']['output'];
  redemptions?: Maybe<Scalars['Int']['output']>;
};

export type InviteInput = {
  expiresAt?: InputMaybe<Scalars['Time']['input']>;
  instanceId: Scalars['Uuid']['input'];
  redemptions?: InputMaybe<Scalars['Int']['input']>;
};

export type Message = {
  __typename?: 'Message';
  author: Author;
  channelId: Scalars['Uuid']['output'];
  createdAt: Scalars['Time']['output'];
  id: Scalars['Uuid']['output'];
  repliedMessage?: Maybe<Message>;
  text: Scalars['String']['output'];
};

export type MessageInput = {
  channelId: Scalars['Uuid']['input'];
  repliedMessageId?: InputMaybe<Scalars['Uuid']['input']>;
  text: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addBadge: Badge;
  addChannel: InstanceChannelsEdge;
  addInstance: UserInstancesEdge;
  addInvite: Invite;
  addLike: InstanceLikesEdge;
  addMessage: ChannelMessagesEdge;
  addRole: Author;
  assignBadge: Badge;
  pinInstance: UserInstancesEdge;
  redeemInvite: Invite;
  removeBadge: Badge;
  removeChannel: InstanceChannelsEdge;
  removeInstance: UserInstancesEdge;
  removeInvite: Invite;
  removeLike: InstanceLikesEdge;
  removeMessage: ChannelMessagesEdge;
  removeRole: Author;
  reorderChannel: InstanceChannelsEdge;
  reorderInstance: UserInstancesEdge;
  unassignBadge: Badge;
  updateBadge: Badge;
  updateChannel: InstanceChannelsEdge;
  updateInstance: UserInstancesEdge;
  updateUser: User;
};


export type MutationAddBadgeArgs = {
  input: BadgeInput;
};


export type MutationAddChannelArgs = {
  input: ChannelInput;
};


export type MutationAddInstanceArgs = {
  input: InstanceInput;
};


export type MutationAddInviteArgs = {
  input: InviteInput;
};


export type MutationAddLikeArgs = {
  instanceId: Scalars['Uuid']['input'];
};


export type MutationAddMessageArgs = {
  input: MessageInput;
};


export type MutationAddRoleArgs = {
  authorId: Scalars['Uuid']['input'];
  banReason?: InputMaybe<Scalars['String']['input']>;
  role: Role;
};


export type MutationAssignBadgeArgs = {
  badgeId: Scalars['Uuid']['input'];
  userId: Scalars['Uuid']['input'];
};


export type MutationPinInstanceArgs = {
  input: InstancePinInput;
  instanceId: Scalars['Uuid']['input'];
};


export type MutationRedeemInviteArgs = {
  code: Scalars['String']['input'];
};


export type MutationRemoveBadgeArgs = {
  badgeId: Scalars['Uuid']['input'];
};


export type MutationRemoveChannelArgs = {
  channelId: Scalars['Uuid']['input'];
};


export type MutationRemoveInstanceArgs = {
  instanceId: Scalars['Uuid']['input'];
};


export type MutationRemoveInviteArgs = {
  inviteId: Scalars['Uuid']['input'];
};


export type MutationRemoveLikeArgs = {
  instanceId: Scalars['Uuid']['input'];
};


export type MutationRemoveMessageArgs = {
  messageId: Scalars['Uuid']['input'];
};


export type MutationRemoveRoleArgs = {
  authorId: Scalars['Uuid']['input'];
  role: Role;
};


export type MutationReorderChannelArgs = {
  channelId: Scalars['Uuid']['input'];
  input: ChannelReorderInput;
};


export type MutationReorderInstanceArgs = {
  input: InstanceReorderInput;
  instanceId: Scalars['Uuid']['input'];
};


export type MutationUnassignBadgeArgs = {
  badgeId: Scalars['Uuid']['input'];
  userId: Scalars['Uuid']['input'];
};


export type MutationUpdateBadgeArgs = {
  badgeId: Scalars['Uuid']['input'];
  input: BadgeInput;
};


export type MutationUpdateChannelArgs = {
  channelId: Scalars['Uuid']['input'];
  input: ChannelInput;
};


export type MutationUpdateInstanceArgs = {
  input: InstanceInput;
  instanceId: Scalars['Uuid']['input'];
};


export type MutationUpdateUserArgs = {
  input: UserInput;
};

export type Notice = {
  __typename?: 'Notice';
  author?: Maybe<Author>;
  badge?: Maybe<Badge>;
  channelMessagesEdge?: Maybe<ChannelMessagesEdge>;
  instance?: Maybe<Instance>;
  instanceChannelsEdge?: Maybe<InstanceChannelsEdge>;
  instanceLikesEdge?: Maybe<InstanceLikesEdge>;
  kind: NoticeKind;
  user?: Maybe<User>;
  userInstancesEdge?: Maybe<UserInstancesEdge>;
  userNotificationsEdge?: Maybe<UserNotificationsEdge>;
};

export enum NoticeKind {
  AuthorUpdated = 'AUTHOR_UPDATED',
  BadgeAdded = 'BADGE_ADDED',
  ChannelAdded = 'CHANNEL_ADDED',
  ChannelRemoved = 'CHANNEL_REMOVED',
  ChannelUpdated = 'CHANNEL_UPDATED',
  InstanceRemoved = 'INSTANCE_REMOVED',
  InstanceUpdated = 'INSTANCE_UPDATED',
  LikeAdded = 'LIKE_ADDED',
  LikeRemoved = 'LIKE_REMOVED',
  MessageAdded = 'MESSAGE_ADDED',
  MessageRemoved = 'MESSAGE_REMOVED',
  NotificationAdded = 'NOTIFICATION_ADDED',
  UserUpdated = 'USER_UPDATED'
}

export type Notification = {
  __typename?: 'Notification';
  author?: Maybe<Author>;
  badge?: Maybe<Badge>;
  createdAt: Scalars['Time']['output'];
  id: Scalars['Uuid']['output'];
  instance?: Maybe<Instance>;
  kind: NotificationKind;
  message?: Maybe<Message>;
  reply?: Maybe<Message>;
};

export enum NotificationKind {
  BadgeAdded = 'BADGE_ADDED',
  CommentAdded = 'COMMENT_ADDED',
  LikeAdded = 'LIKE_ADDED',
  ReplyAdded = 'REPLY_ADDED'
}

export type PageInfo = {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  author: Author;
  badges: AppBadgesConnection;
  channel: Channel;
  checkInvite: Invite;
  instance: UserInstancesEdge;
  invite: Invite;
  user: User;
  userBadges: UserBadgesConnection;
};


export type QueryAuthorArgs = {
  id: Scalars['Uuid']['input'];
};


export type QueryBadgesArgs = {
  after?: Scalars['String']['input'];
  first?: Scalars['Int']['input'];
};


export type QueryChannelArgs = {
  id: Scalars['Uuid']['input'];
};


export type QueryCheckInviteArgs = {
  code: Scalars['String']['input'];
};


export type QueryInstanceArgs = {
  id: Scalars['Uuid']['input'];
};


export type QueryInviteArgs = {
  instanceId: Scalars['Uuid']['input'];
};


export type QueryUserBadgesArgs = {
  after?: Scalars['String']['input'];
  first?: Scalars['Int']['input'];
  userId: Scalars['Uuid']['input'];
};

export enum Role {
  Admin = 'ADMIN',
  AllUsers = 'ALL_USERS',
  Banned = 'BANNED',
  Member = 'MEMBER',
  Moderator = 'MODERATOR'
}

export type Subscription = {
  __typename?: 'Subscription';
  stream: Notice;
};


export type SubscriptionStreamArgs = {
  instanceId: Scalars['Uuid']['input'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String']['output'];
  bio: Scalars['String']['output'];
  id: Scalars['Uuid']['output'];
  instancesConnection: UserInstancesConnection;
  name: Scalars['String']['output'];
  notificationsConnection: UserNotificationsConnection;
  uid: Scalars['String']['output'];
};


export type UserInstancesConnectionArgs = {
  after?: Scalars['String']['input'];
  first?: Scalars['Int']['input'];
};


export type UserNotificationsConnectionArgs = {
  before?: Scalars['String']['input'];
  last?: Scalars['Int']['input'];
};

export type UserBadgesConnection = {
  __typename?: 'UserBadgesConnection';
  edges: Array<UserBadgesEdge>;
  pageInfo: PageInfo;
};

export type UserBadgesEdge = {
  __typename?: 'UserBadgesEdge';
  badgedAt: Scalars['Time']['output'];
  count: Scalars['Int']['output'];
  cursor: Scalars['String']['output'];
  node: Badge;
};

export type UserInput = {
  avatar: Scalars['String']['input'];
  bio: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type UserInstancesConnection = {
  __typename?: 'UserInstancesConnection';
  edges: Array<UserInstancesEdge>;
  pageInfo: PageInfo;
};

export type UserInstancesEdge = {
  __typename?: 'UserInstancesEdge';
  cursor: Scalars['String']['output'];
  instanceUser: Author;
  likedByMe: Scalars['Boolean']['output'];
  node: Instance;
  pinned: Scalars['Boolean']['output'];
  rank: Scalars['String']['output'];
};

export type UserNotificationsConnection = {
  __typename?: 'UserNotificationsConnection';
  edges: Array<UserNotificationsEdge>;
  hasUnread: Scalars['Boolean']['output'];
  pageInfo: PageInfo;
};

export type UserNotificationsEdge = {
  __typename?: 'UserNotificationsEdge';
  cursor: Scalars['String']['output'];
  node: Notification;
};

export type PageInfoFragmentFragment = { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean };

export type BadgeFragmentFragment = { __typename?: 'Badge', id: any, name: string, icon: string };

export type UserBadgesEdgeFragmentFragment = { __typename?: 'UserBadgesEdge', cursor: string, count: number, badgedAt: any, node: { __typename?: 'Badge', id: any, name: string, icon: string } };

export type AuthorFragmentFragment = { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null };

export type InviteFragmentFragment = { __typename?: 'Invite', id: any, instanceId: any, code: string, createdAt: any, expiresAt?: any | null, redemptions?: number | null, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } };

export type MessageFragmentFragment = { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null };

export type ChannelMessagesEdgeFragmentFragment = { __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } };

export type ChannelFragmentFragment = { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type InstanceChannelsEdgeFragmentFragment = { __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type InstanceLikesEdgeFragmentFragment = { __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } };

export type InstanceAuthorsEdgeFragmentFragment = { __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } };

export type InstanceFragmentFragment = { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type NotificationFragmentFragment = { __typename?: 'Notification', id: any, kind: NotificationKind, createdAt: any, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, message?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, reply?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null };

export type UserNotificationsEdgeFragmentFragment = { __typename?: 'UserNotificationsEdge', cursor: string, node: { __typename?: 'Notification', id: any, kind: NotificationKind, createdAt: any, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, message?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, reply?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null } };

export type UserInstancesEdgeFragmentFragment = { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } };

export type UserFragmentFragment = { __typename?: 'User', id: any, name: string, avatar: string, bio: string, uid: string, instancesConnection: { __typename?: 'UserInstancesConnection', edges: Array<{ __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, notificationsConnection: { __typename?: 'UserNotificationsConnection', hasUnread: boolean, edges: Array<{ __typename?: 'UserNotificationsEdge', cursor: string, node: { __typename?: 'Notification', id: any, kind: NotificationKind, createdAt: any, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, message?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, reply?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type AddRoleMutationVariables = Exact<{
  authorId: Scalars['Uuid']['input'];
  role: Role;
  banReason?: InputMaybe<Scalars['String']['input']>;
}>;


export type AddRoleMutation = { __typename?: 'Mutation', addRole: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } };

export type RemoveRoleMutationVariables = Exact<{
  authorId: Scalars['Uuid']['input'];
  role: Role;
}>;


export type RemoveRoleMutation = { __typename?: 'Mutation', removeRole: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } };

export type AddChannelMutationVariables = Exact<{
  input: ChannelInput;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type AddChannelMutation = { __typename?: 'Mutation', addChannel: { __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } } };

export type UpdateChannelMutationVariables = Exact<{
  input: ChannelInput;
  channelId: Scalars['Uuid']['input'];
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type UpdateChannelMutation = { __typename?: 'Mutation', updateChannel: { __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } } };

export type ReorderChannelMutationVariables = Exact<{
  input: ChannelReorderInput;
  channelId: Scalars['Uuid']['input'];
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type ReorderChannelMutation = { __typename?: 'Mutation', reorderChannel: { __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } } };

export type RemoveChannelMutationVariables = Exact<{
  channelId: Scalars['Uuid']['input'];
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type RemoveChannelMutation = { __typename?: 'Mutation', removeChannel: { __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } } };

export type AddInstanceMutationVariables = Exact<{
  input: InstanceInput;
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type AddInstanceMutation = { __typename?: 'Mutation', addInstance: { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type UpdateInstanceMutationVariables = Exact<{
  instanceId: Scalars['Uuid']['input'];
  input: InstanceInput;
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type UpdateInstanceMutation = { __typename?: 'Mutation', updateInstance: { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type RemoveInstanceMutationVariables = Exact<{
  instanceId: Scalars['Uuid']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type RemoveInstanceMutation = { __typename?: 'Mutation', removeInstance: { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type ReorderInstanceMutationVariables = Exact<{
  input: InstanceReorderInput;
  instanceId: Scalars['Uuid']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type ReorderInstanceMutation = { __typename?: 'Mutation', reorderInstance: { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type PinInstanceMutationVariables = Exact<{
  input: InstancePinInput;
  instanceId: Scalars['Uuid']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type PinInstanceMutation = { __typename?: 'Mutation', pinInstance: { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type AddInviteMutationVariables = Exact<{
  input: InviteInput;
}>;


export type AddInviteMutation = { __typename?: 'Mutation', addInvite: { __typename?: 'Invite', id: any, instanceId: any, code: string, createdAt: any, expiresAt?: any | null, redemptions?: number | null, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type RedeemInviteMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type RedeemInviteMutation = { __typename?: 'Mutation', redeemInvite: { __typename?: 'Invite', id: any, instanceId: any, code: string, createdAt: any, expiresAt?: any | null, redemptions?: number | null, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type AddLikeMutationVariables = Exact<{
  instanceId: Scalars['Uuid']['input'];
}>;


export type AddLikeMutation = { __typename?: 'Mutation', addLike: { __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type RemoveLikeMutationVariables = Exact<{
  instanceId: Scalars['Uuid']['input'];
}>;


export type RemoveLikeMutation = { __typename?: 'Mutation', removeLike: { __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type AddMessageMutationVariables = Exact<{
  input: MessageInput;
}>;


export type AddMessageMutation = { __typename?: 'Mutation', addMessage: { __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } } };

export type RemoveMessageMutationVariables = Exact<{
  messageId: Scalars['Uuid']['input'];
}>;


export type RemoveMessageMutation = { __typename?: 'Mutation', removeMessage: { __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } } };

export type UpdateUserMutationVariables = Exact<{
  input: UserInput;
  instancesFirst: Scalars['Int']['input'];
  instancesAfter: Scalars['String']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
  notificationsLast: Scalars['Int']['input'];
  notificationsBefore: Scalars['String']['input'];
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: any, name: string, avatar: string, bio: string, uid: string, instancesConnection: { __typename?: 'UserInstancesConnection', edges: Array<{ __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, notificationsConnection: { __typename?: 'UserNotificationsConnection', hasUnread: boolean, edges: Array<{ __typename?: 'UserNotificationsEdge', cursor: string, node: { __typename?: 'Notification', id: any, kind: NotificationKind, createdAt: any, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, message?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, reply?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type ChannelQueryVariables = Exact<{
  id: Scalars['Uuid']['input'];
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type ChannelQuery = { __typename?: 'Query', channel: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type InstanceQueryVariables = Exact<{
  id: Scalars['Uuid']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type InstanceQuery = { __typename?: 'Query', instance: { __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type InviteQueryVariables = Exact<{
  instanceId: Scalars['Uuid']['input'];
}>;


export type InviteQuery = { __typename?: 'Query', invite: { __typename?: 'Invite', id: any, instanceId: any, code: string, createdAt: any, expiresAt?: any | null, redemptions?: number | null, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type CheckInviteQueryVariables = Exact<{
  code: Scalars['String']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
}>;


export type CheckInviteQuery = { __typename?: 'Query', checkInvite: { __typename?: 'Invite', id: any, instanceId: any, code: string, createdAt: any, expiresAt?: any | null, redemptions?: number | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } };

export type UserQueryVariables = Exact<{
  instancesFirst: Scalars['Int']['input'];
  instancesAfter: Scalars['String']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
  notificationsLast: Scalars['Int']['input'];
  notificationsBefore: Scalars['String']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: any, name: string, avatar: string, bio: string, uid: string, instancesConnection: { __typename?: 'UserInstancesConnection', edges: Array<{ __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, notificationsConnection: { __typename?: 'UserNotificationsConnection', hasUnread: boolean, edges: Array<{ __typename?: 'UserNotificationsEdge', cursor: string, node: { __typename?: 'Notification', id: any, kind: NotificationKind, createdAt: any, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, message?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, reply?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } };

export type UserBadgesQueryVariables = Exact<{
  userId: Scalars['Uuid']['input'];
  badgesFirst: Scalars['Int']['input'];
  badgesAfter: Scalars['String']['input'];
}>;


export type UserBadgesQuery = { __typename?: 'Query', userBadges: { __typename?: 'UserBadgesConnection', edges: Array<{ __typename?: 'UserBadgesEdge', cursor: string, count: number, badgedAt: any, node: { __typename?: 'Badge', id: any, name: string, icon: string } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } };

export type StreamSubscriptionVariables = Exact<{
  instanceId: Scalars['Uuid']['input'];
  instancesFirst: Scalars['Int']['input'];
  instancesAfter: Scalars['String']['input'];
  channelsFirst: Scalars['Int']['input'];
  channelsAfter: Scalars['String']['input'];
  likesFirst: Scalars['Int']['input'];
  likesAfter: Scalars['String']['input'];
  authorsFirst: Scalars['Int']['input'];
  authorsAfter: Scalars['String']['input'];
  authorsRoles: Array<Role> | Role;
  messagesLast: Scalars['Int']['input'];
  messagesBefore: Scalars['String']['input'];
  notificationsLast: Scalars['Int']['input'];
  notificationsBefore: Scalars['String']['input'];
}>;


export type StreamSubscription = { __typename?: 'Subscription', stream: { __typename?: 'Notice', kind: NoticeKind, channelMessagesEdge?: { __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } } | null, instanceChannelsEdge?: { __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } } | null, instanceLikesEdge?: { __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null, user?: { __typename?: 'User', id: any, name: string, avatar: string, bio: string, uid: string, instancesConnection: { __typename?: 'UserInstancesConnection', edges: Array<{ __typename?: 'UserInstancesEdge', cursor: string, rank: string, pinned: boolean, likedByMe: boolean, node: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } }, instanceUser: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, notificationsConnection: { __typename?: 'UserNotificationsConnection', hasUnread: boolean, edges: Array<{ __typename?: 'UserNotificationsEdge', cursor: string, node: { __typename?: 'Notification', id: any, kind: NotificationKind, createdAt: any, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, message?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, reply?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, userNotificationsEdge?: { __typename?: 'UserNotificationsEdge', cursor: string, node: { __typename?: 'Notification', id: any, kind: NotificationKind, createdAt: any, author?: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } | null, instance?: { __typename?: 'Instance', id: any, name: string, readAccess: Access, icon: string, createdAt: any, description: string, showAuthor: boolean, showChat: boolean, showLikes: boolean, showComments: boolean, likesCount: number, commentsCount: number, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, likesConnection: { __typename?: 'InstanceLikesConnection', edges: Array<{ __typename?: 'InstanceLikesEdge', cursor: string, likedAt: any, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, channelsConnection: { __typename?: 'InstanceChannelsConnection', edges: Array<{ __typename?: 'InstanceChannelsEdge', cursor: string, node: { __typename?: 'Channel', id: any, name: string, rank: string, instanceId: any, readers: Array<Role>, publishers: Array<Role>, createdAt: any, updatedAt: any, lastMessageAddedAt?: any | null, messageCount: number, isCategory: boolean, isComments: boolean, messagesConnection: { __typename?: 'ChannelMessagesConnection', edges: Array<{ __typename?: 'ChannelMessagesEdge', cursor: string, node: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } }, authorsConnection: { __typename?: 'InstanceAuthorsConnection', edges: Array<{ __typename?: 'InstanceAuthorsEdge', cursor: string, node: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } }>, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean } } } | null, message?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, reply?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null }, repliedMessage?: { __typename?: 'Message', id: any, text: string, createdAt: any, channelId: any, author: { __typename?: 'Author', id: any, userId: any, instanceId: any, name: string, avatar: string, bio: string, roles: Array<Role>, createdAt: any, banReason?: string | null } } | null } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null } } | null, badge?: { __typename?: 'Badge', id: any, name: string, icon: string } | null } };

export const BadgeFragmentFragmentDoc = gql`
    fragment BadgeFragment on Badge {
  id
  name
  icon
}
    `;
export const UserBadgesEdgeFragmentFragmentDoc = gql`
    fragment UserBadgesEdgeFragment on UserBadgesEdge {
  cursor
  count
  badgedAt
  node {
    ...BadgeFragment
  }
}
    ${BadgeFragmentFragmentDoc}`;
export const AuthorFragmentFragmentDoc = gql`
    fragment AuthorFragment on Author {
  id
  userId
  instanceId
  name
  avatar
  bio
  roles
  createdAt
  banReason
}
    `;
export const InviteFragmentFragmentDoc = gql`
    fragment InviteFragment on Invite {
  id
  instanceId
  code
  createdAt
  expiresAt
  redemptions
  author {
    ...AuthorFragment
  }
}
    ${AuthorFragmentFragmentDoc}`;
export const InstanceLikesEdgeFragmentFragmentDoc = gql`
    fragment InstanceLikesEdgeFragment on InstanceLikesEdge {
  cursor
  likedAt
  node {
    ...AuthorFragment
  }
}
    ${AuthorFragmentFragmentDoc}`;
export const PageInfoFragmentFragmentDoc = gql`
    fragment PageInfoFragment on PageInfo {
  hasNextPage
  hasPreviousPage
}
    `;
export const MessageFragmentFragmentDoc = gql`
    fragment MessageFragment on Message {
  id
  author {
    ...AuthorFragment
  }
  text
  createdAt
  channelId
  repliedMessage {
    id
    author {
      ...AuthorFragment
    }
    text
    createdAt
    channelId
  }
}
    ${AuthorFragmentFragmentDoc}`;
export const ChannelMessagesEdgeFragmentFragmentDoc = gql`
    fragment ChannelMessagesEdgeFragment on ChannelMessagesEdge {
  cursor
  node {
    ...MessageFragment
  }
}
    ${MessageFragmentFragmentDoc}`;
export const ChannelFragmentFragmentDoc = gql`
    fragment ChannelFragment on Channel {
  id
  name
  rank
  instanceId
  readers
  publishers
  createdAt
  updatedAt
  lastMessageAddedAt
  messageCount
  isCategory
  isComments
  messagesConnection(last: $messagesLast, before: $messagesBefore) {
    edges {
      ...ChannelMessagesEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${ChannelMessagesEdgeFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;
export const InstanceChannelsEdgeFragmentFragmentDoc = gql`
    fragment InstanceChannelsEdgeFragment on InstanceChannelsEdge {
  cursor
  node {
    ...ChannelFragment
  }
}
    ${ChannelFragmentFragmentDoc}`;
export const InstanceAuthorsEdgeFragmentFragmentDoc = gql`
    fragment InstanceAuthorsEdgeFragment on InstanceAuthorsEdge {
  cursor
  node {
    ...AuthorFragment
  }
}
    ${AuthorFragmentFragmentDoc}`;
export const InstanceFragmentFragmentDoc = gql`
    fragment InstanceFragment on Instance {
  id
  name
  author {
    ...AuthorFragment
  }
  readAccess
  icon
  createdAt
  description
  showAuthor
  showChat
  showLikes
  showComments
  likesCount
  commentsCount
  likesConnection(first: $likesFirst, after: $likesAfter) {
    edges {
      ...InstanceLikesEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
  channelsConnection(first: $channelsFirst, after: $channelsAfter) {
    edges {
      ...InstanceChannelsEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
  authorsConnection(
    first: $authorsFirst
    after: $authorsAfter
    roles: $authorsRoles
  ) {
    edges {
      ...InstanceAuthorsEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${AuthorFragmentFragmentDoc}
${InstanceLikesEdgeFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}
${InstanceChannelsEdgeFragmentFragmentDoc}
${InstanceAuthorsEdgeFragmentFragmentDoc}`;
export const UserInstancesEdgeFragmentFragmentDoc = gql`
    fragment UserInstancesEdgeFragment on UserInstancesEdge {
  cursor
  node {
    ...InstanceFragment
  }
  instanceUser {
    ...AuthorFragment
  }
  rank
  pinned
  likedByMe
}
    ${InstanceFragmentFragmentDoc}
${AuthorFragmentFragmentDoc}`;
export const NotificationFragmentFragmentDoc = gql`
    fragment NotificationFragment on Notification {
  id
  kind
  author {
    ...AuthorFragment
  }
  instance {
    ...InstanceFragment
  }
  message {
    ...MessageFragment
  }
  reply {
    ...MessageFragment
  }
  badge {
    ...BadgeFragment
  }
  createdAt
}
    ${AuthorFragmentFragmentDoc}
${InstanceFragmentFragmentDoc}
${MessageFragmentFragmentDoc}
${BadgeFragmentFragmentDoc}`;
export const UserNotificationsEdgeFragmentFragmentDoc = gql`
    fragment UserNotificationsEdgeFragment on UserNotificationsEdge {
  cursor
  node {
    ...NotificationFragment
  }
}
    ${NotificationFragmentFragmentDoc}`;
export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  name
  avatar
  bio
  uid
  instancesConnection(first: $instancesFirst, after: $instancesAfter) {
    edges {
      ...UserInstancesEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
  notificationsConnection(last: $notificationsLast, before: $notificationsBefore) {
    edges {
      ...UserNotificationsEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
    hasUnread
  }
}
    ${UserInstancesEdgeFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}
${UserNotificationsEdgeFragmentFragmentDoc}`;
export const AddRoleDocument = gql`
    mutation addRole($authorId: Uuid!, $role: Role!, $banReason: String) {
  addRole(authorId: $authorId, role: $role, banReason: $banReason) {
    ...AuthorFragment
  }
}
    ${AuthorFragmentFragmentDoc}`;
export const RemoveRoleDocument = gql`
    mutation removeRole($authorId: Uuid!, $role: Role!) {
  removeRole(authorId: $authorId, role: $role) {
    ...AuthorFragment
  }
}
    ${AuthorFragmentFragmentDoc}`;
export const AddChannelDocument = gql`
    mutation addChannel($input: ChannelInput!, $messagesLast: Int!, $messagesBefore: String!) {
  addChannel(input: $input) {
    ...InstanceChannelsEdgeFragment
  }
}
    ${InstanceChannelsEdgeFragmentFragmentDoc}`;
export const UpdateChannelDocument = gql`
    mutation updateChannel($input: ChannelInput!, $channelId: Uuid!, $messagesLast: Int!, $messagesBefore: String!) {
  updateChannel(input: $input, channelId: $channelId) {
    ...InstanceChannelsEdgeFragment
  }
}
    ${InstanceChannelsEdgeFragmentFragmentDoc}`;
export const ReorderChannelDocument = gql`
    mutation reorderChannel($input: ChannelReorderInput!, $channelId: Uuid!, $messagesLast: Int!, $messagesBefore: String!) {
  reorderChannel(input: $input, channelId: $channelId) {
    ...InstanceChannelsEdgeFragment
  }
}
    ${InstanceChannelsEdgeFragmentFragmentDoc}`;
export const RemoveChannelDocument = gql`
    mutation removeChannel($channelId: Uuid!, $messagesLast: Int!, $messagesBefore: String!) {
  removeChannel(channelId: $channelId) {
    ...InstanceChannelsEdgeFragment
  }
}
    ${InstanceChannelsEdgeFragmentFragmentDoc}`;
export const AddInstanceDocument = gql`
    mutation addInstance($input: InstanceInput!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!) {
  addInstance(input: $input) {
    ...UserInstancesEdgeFragment
  }
}
    ${UserInstancesEdgeFragmentFragmentDoc}`;
export const UpdateInstanceDocument = gql`
    mutation updateInstance($instanceId: Uuid!, $input: InstanceInput!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!) {
  updateInstance(instanceId: $instanceId, input: $input) {
    ...UserInstancesEdgeFragment
  }
}
    ${UserInstancesEdgeFragmentFragmentDoc}`;
export const RemoveInstanceDocument = gql`
    mutation removeInstance($instanceId: Uuid!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!) {
  removeInstance(instanceId: $instanceId) {
    ...UserInstancesEdgeFragment
  }
}
    ${UserInstancesEdgeFragmentFragmentDoc}`;
export const ReorderInstanceDocument = gql`
    mutation reorderInstance($input: InstanceReorderInput!, $instanceId: Uuid!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!) {
  reorderInstance(input: $input, instanceId: $instanceId) {
    ...UserInstancesEdgeFragment
  }
}
    ${UserInstancesEdgeFragmentFragmentDoc}`;
export const PinInstanceDocument = gql`
    mutation pinInstance($input: InstancePinInput!, $instanceId: Uuid!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!) {
  pinInstance(input: $input, instanceId: $instanceId) {
    ...UserInstancesEdgeFragment
  }
}
    ${UserInstancesEdgeFragmentFragmentDoc}`;
export const AddInviteDocument = gql`
    mutation addInvite($input: InviteInput!) {
  addInvite(input: $input) {
    ...InviteFragment
  }
}
    ${InviteFragmentFragmentDoc}`;
export const RedeemInviteDocument = gql`
    mutation redeemInvite($code: String!) {
  redeemInvite(code: $code) {
    ...InviteFragment
  }
}
    ${InviteFragmentFragmentDoc}`;
export const AddLikeDocument = gql`
    mutation addLike($instanceId: Uuid!) {
  addLike(instanceId: $instanceId) {
    ...InstanceLikesEdgeFragment
  }
}
    ${InstanceLikesEdgeFragmentFragmentDoc}`;
export const RemoveLikeDocument = gql`
    mutation removeLike($instanceId: Uuid!) {
  removeLike(instanceId: $instanceId) {
    ...InstanceLikesEdgeFragment
  }
}
    ${InstanceLikesEdgeFragmentFragmentDoc}`;
export const AddMessageDocument = gql`
    mutation addMessage($input: MessageInput!) {
  addMessage(input: $input) {
    ...ChannelMessagesEdgeFragment
  }
}
    ${ChannelMessagesEdgeFragmentFragmentDoc}`;
export const RemoveMessageDocument = gql`
    mutation removeMessage($messageId: Uuid!) {
  removeMessage(messageId: $messageId) {
    ...ChannelMessagesEdgeFragment
  }
}
    ${ChannelMessagesEdgeFragmentFragmentDoc}`;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UserInput!, $instancesFirst: Int!, $instancesAfter: String!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!, $notificationsLast: Int!, $notificationsBefore: String!) {
  updateUser(input: $input) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const ChannelDocument = gql`
    query channel($id: Uuid!, $messagesLast: Int!, $messagesBefore: String!) {
  channel(id: $id) {
    ...ChannelFragment
  }
}
    ${ChannelFragmentFragmentDoc}`;
export const InstanceDocument = gql`
    query instance($id: Uuid!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!) {
  instance(id: $id) {
    ...UserInstancesEdgeFragment
  }
}
    ${UserInstancesEdgeFragmentFragmentDoc}`;
export const InviteDocument = gql`
    query invite($instanceId: Uuid!) {
  invite(instanceId: $instanceId) {
    ...InviteFragment
  }
}
    ${InviteFragmentFragmentDoc}`;
export const CheckInviteDocument = gql`
    query checkInvite($code: String!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!) {
  checkInvite(code: $code) {
    instance {
      ...InstanceFragment
    }
    ...InviteFragment
  }
}
    ${InstanceFragmentFragmentDoc}
${InviteFragmentFragmentDoc}`;
export const UserDocument = gql`
    query user($instancesFirst: Int!, $instancesAfter: String!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!, $notificationsLast: Int!, $notificationsBefore: String!) {
  user {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export const UserBadgesDocument = gql`
    query userBadges($userId: Uuid!, $badgesFirst: Int!, $badgesAfter: String!) {
  userBadges(userId: $userId, first: $badgesFirst, after: $badgesAfter) {
    edges {
      ...UserBadgesEdgeFragment
    }
    pageInfo {
      ...PageInfoFragment
    }
  }
}
    ${UserBadgesEdgeFragmentFragmentDoc}
${PageInfoFragmentFragmentDoc}`;
export const StreamDocument = gql`
    subscription stream($instanceId: Uuid!, $instancesFirst: Int!, $instancesAfter: String!, $channelsFirst: Int!, $channelsAfter: String!, $likesFirst: Int!, $likesAfter: String!, $authorsFirst: Int!, $authorsAfter: String!, $authorsRoles: [Role!]!, $messagesLast: Int!, $messagesBefore: String!, $notificationsLast: Int!, $notificationsBefore: String!) {
  stream(instanceId: $instanceId) {
    kind
    channelMessagesEdge {
      ...ChannelMessagesEdgeFragment
    }
    instanceChannelsEdge {
      ...InstanceChannelsEdgeFragment
    }
    instanceLikesEdge {
      ...InstanceLikesEdgeFragment
    }
    user {
      ...UserFragment
    }
    author {
      ...AuthorFragment
    }
    instance {
      ...InstanceFragment
    }
    userNotificationsEdge {
      ...UserNotificationsEdgeFragment
    }
    badge {
      ...BadgeFragment
    }
  }
}
    ${ChannelMessagesEdgeFragmentFragmentDoc}
${InstanceChannelsEdgeFragmentFragmentDoc}
${InstanceLikesEdgeFragmentFragmentDoc}
${UserFragmentFragmentDoc}
${AuthorFragmentFragmentDoc}
${InstanceFragmentFragmentDoc}
${UserNotificationsEdgeFragmentFragmentDoc}
${BadgeFragmentFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();
const AddRoleDocumentString = print(AddRoleDocument);
const RemoveRoleDocumentString = print(RemoveRoleDocument);
const AddChannelDocumentString = print(AddChannelDocument);
const UpdateChannelDocumentString = print(UpdateChannelDocument);
const ReorderChannelDocumentString = print(ReorderChannelDocument);
const RemoveChannelDocumentString = print(RemoveChannelDocument);
const AddInstanceDocumentString = print(AddInstanceDocument);
const UpdateInstanceDocumentString = print(UpdateInstanceDocument);
const RemoveInstanceDocumentString = print(RemoveInstanceDocument);
const ReorderInstanceDocumentString = print(ReorderInstanceDocument);
const PinInstanceDocumentString = print(PinInstanceDocument);
const AddInviteDocumentString = print(AddInviteDocument);
const RedeemInviteDocumentString = print(RedeemInviteDocument);
const AddLikeDocumentString = print(AddLikeDocument);
const RemoveLikeDocumentString = print(RemoveLikeDocument);
const AddMessageDocumentString = print(AddMessageDocument);
const RemoveMessageDocumentString = print(RemoveMessageDocument);
const UpdateUserDocumentString = print(UpdateUserDocument);
const ChannelDocumentString = print(ChannelDocument);
const InstanceDocumentString = print(InstanceDocument);
const InviteDocumentString = print(InviteDocument);
const CheckInviteDocumentString = print(CheckInviteDocument);
const UserDocumentString = print(UserDocument);
const UserBadgesDocumentString = print(UserBadgesDocument);
const StreamDocumentString = print(StreamDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    addRole(variables: AddRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: AddRoleMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddRoleMutation>(AddRoleDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addRole', 'mutation');
    },
    removeRole(variables: RemoveRoleMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: RemoveRoleMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<RemoveRoleMutation>(RemoveRoleDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeRole', 'mutation');
    },
    addChannel(variables: AddChannelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: AddChannelMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddChannelMutation>(AddChannelDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addChannel', 'mutation');
    },
    updateChannel(variables: UpdateChannelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UpdateChannelMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UpdateChannelMutation>(UpdateChannelDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateChannel', 'mutation');
    },
    reorderChannel(variables: ReorderChannelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ReorderChannelMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ReorderChannelMutation>(ReorderChannelDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'reorderChannel', 'mutation');
    },
    removeChannel(variables: RemoveChannelMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: RemoveChannelMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<RemoveChannelMutation>(RemoveChannelDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeChannel', 'mutation');
    },
    addInstance(variables: AddInstanceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: AddInstanceMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddInstanceMutation>(AddInstanceDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addInstance', 'mutation');
    },
    updateInstance(variables: UpdateInstanceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UpdateInstanceMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UpdateInstanceMutation>(UpdateInstanceDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateInstance', 'mutation');
    },
    removeInstance(variables: RemoveInstanceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: RemoveInstanceMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<RemoveInstanceMutation>(RemoveInstanceDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeInstance', 'mutation');
    },
    reorderInstance(variables: ReorderInstanceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ReorderInstanceMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ReorderInstanceMutation>(ReorderInstanceDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'reorderInstance', 'mutation');
    },
    pinInstance(variables: PinInstanceMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: PinInstanceMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<PinInstanceMutation>(PinInstanceDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'pinInstance', 'mutation');
    },
    addInvite(variables: AddInviteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: AddInviteMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddInviteMutation>(AddInviteDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addInvite', 'mutation');
    },
    redeemInvite(variables: RedeemInviteMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: RedeemInviteMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<RedeemInviteMutation>(RedeemInviteDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'redeemInvite', 'mutation');
    },
    addLike(variables: AddLikeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: AddLikeMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddLikeMutation>(AddLikeDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addLike', 'mutation');
    },
    removeLike(variables: RemoveLikeMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: RemoveLikeMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<RemoveLikeMutation>(RemoveLikeDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeLike', 'mutation');
    },
    addMessage(variables: AddMessageMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: AddMessageMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<AddMessageMutation>(AddMessageDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'addMessage', 'mutation');
    },
    removeMessage(variables: RemoveMessageMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: RemoveMessageMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<RemoveMessageMutation>(RemoveMessageDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'removeMessage', 'mutation');
    },
    updateUser(variables: UpdateUserMutationVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UpdateUserMutation; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UpdateUserMutation>(UpdateUserDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'updateUser', 'mutation');
    },
    channel(variables: ChannelQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: ChannelQuery; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<ChannelQuery>(ChannelDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'channel', 'query');
    },
    instance(variables: InstanceQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: InstanceQuery; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<InstanceQuery>(InstanceDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'instance', 'query');
    },
    invite(variables: InviteQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: InviteQuery; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<InviteQuery>(InviteDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'invite', 'query');
    },
    checkInvite(variables: CheckInviteQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: CheckInviteQuery; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<CheckInviteQuery>(CheckInviteDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'checkInvite', 'query');
    },
    user(variables: UserQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UserQuery; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UserQuery>(UserDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'user', 'query');
    },
    userBadges(variables: UserBadgesQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: UserBadgesQuery; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<UserBadgesQuery>(UserBadgesDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'userBadges', 'query');
    },
    stream(variables: StreamSubscriptionVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: StreamSubscription; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<StreamSubscription>(StreamDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'stream', 'subscription');
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;