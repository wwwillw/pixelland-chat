package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.22

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/lib/pq"
	"github.com/rs/zerolog/log"
	"github.com/wwwillw/pixelland-chat/graph/model"
	"github.com/wwwillw/pixelland-chat/interfaces"
	"github.com/xissy/lexorank"
	"gorm.io/gorm"
)

// MessagesConnection is the resolver for the messagesConnection field.
func (r *channelResolver) MessagesConnection(ctx context.Context, obj *model.Channel, last *int, before *string) (*model.ChannelMessagesConnection, error) {
	db := interfaces.GetDatabase()
	messages := []model.Message{}

	tx := db.Model(&obj).Limit(*last + 1).Order("created_at desc")

	if *before != "" {
		createdAt, err := fromCursorHash(*before)
		if err != nil {
			return nil, err
		}
		tx = tx.Where("created_at < ?", createdAt)
	}

	tx.Preload("Author").Association("Messages").Find(&messages)

	hasPreviousPage := (len(messages) == *last+1)
	if len(messages) > 0 && hasPreviousPage {
		messages = messages[:len(messages)-1]
	}

	edges := []*model.ChannelMessagesEdge{}
	for i := len(messages) - 1; i >= 0; i-- {
		edge, err := createChannelMessagesEdge(&messages[i])
		if err != nil {
			return nil, err
		}
		edges = append(edges, edge)
	}

	return &model.ChannelMessagesConnection{
		Edges: edges,
		PageInfo: &model.PageInfo{
			HasPreviousPage: hasPreviousPage,
			HasNextPage:     false, // TODO
		},
	}, nil
}

// Publishers is the resolver for the publishers field.
func (r *channelResolver) Publishers(ctx context.Context, obj *model.Channel) ([]model.Role, error) {
	return stringsToRoles(obj.Publishers), nil
}

// Readers is the resolver for the readers field.
func (r *channelResolver) Readers(ctx context.Context, obj *model.Channel) ([]model.Role, error) {
	return stringsToRoles(obj.Readers), nil
}

// Author is the resolver for the author field.
func (r *instanceResolver) Author(ctx context.Context, obj *model.Instance) (*model.Author, error) {
	db := interfaces.GetDatabase()
	instanceUser := model.InstanceUser{}
	if err := db.Model(&obj).Association("Author").Find(&instanceUser); err != nil {
		log.Error().Err(err).Msg("failed to get instance author")
		return nil, err
	}

	return instanceUserToAuthor(&instanceUser), nil
}

// ReadAccess is the resolver for the readAccess field.
func (r *instanceResolver) ReadAccess(ctx context.Context, obj *model.Instance) (model.Access, error) {
	return model.Access(obj.ReadAccess), nil
}

// ChannelsConnection is the resolver for the channelsConnection field.
func (r *instanceResolver) ChannelsConnection(ctx context.Context, obj *model.Instance, first *int, after *string) (*model.InstanceChannelsConnection, error) {
	callerInstanceUser, err := getCallerInstanceUser(ctx, obj.ID)
	if err != nil {
		return nil, err
	}

	if contains(callerInstanceUser.Roles, model.RoleBanned.String()) || (obj.ReadAccess == model.AccessPrivate.String() && len(callerInstanceUser.Roles) == 0) {
		return &model.InstanceChannelsConnection{
			Edges: make([]*model.InstanceChannelsEdge, 0),
			PageInfo: &model.PageInfo{
				HasNextPage:     false,
				HasPreviousPage: false,
			},
		}, nil
	}

	db := interfaces.GetDatabase()
	channels := []model.Channel{}

	tx := db.Model(&obj).Limit(*first + 1).Order("rank asc")

	roles := append(callerInstanceUser.Roles, model.RoleAllUsers.String())
	tx = tx.Where("readers && ?", pq.Array(roles))

	if *after != "" {
		rank, err := fromCursorHash(*after)
		if err != nil {
			return nil, err
		}
		tx = tx.Where("rank > ?", rank)
	}

	if err := tx.Association("Channels").Find(&channels); err != nil {
		return nil, err
	}

	hasNextPage := (len(channels) == *first+1)
	if len(channels) > 0 && hasNextPage {
		channels = channels[:len(channels)-1]
	}

	edges := []*model.InstanceChannelsEdge{}
	for i := 0; i < len(channels); i++ {
		edge, err := createInstanceChannelsEdge(&channels[i])
		if err != nil {
			return nil, err
		}
		edges = append(edges, edge)
	}

	return &model.InstanceChannelsConnection{
		Edges: edges,
		PageInfo: &model.PageInfo{
			HasNextPage:     hasNextPage,
			HasPreviousPage: false, // TODO
		},
	}, nil
}

// LikesConnection is the resolver for the likesConnection field.
func (r *instanceResolver) LikesConnection(ctx context.Context, obj *model.Instance, first *int, after *string) (*model.InstanceLikesConnection, error) {
	db := interfaces.GetDatabase()
	instanceUsers := []model.InstanceUser{}

	tx := db.Model(&obj).Limit(*first + 1).Order("created_at asc")
	tx = tx.Where("liked_by_me = ?", true)

	if *after != "" {
		likedAt, err := fromCursorHash(*after)
		if err != nil {
			return nil, err
		}
		tx = tx.Where("liked_at > ?", likedAt)
	}

	if err := tx.Association("Users").Find(&instanceUsers); err != nil {
		return nil, err
	}

	hasNextPage := (len(instanceUsers) == *first+1)
	if len(instanceUsers) > 0 && hasNextPage {
		instanceUsers = instanceUsers[:len(instanceUsers)-1]
	}

	edges := []*model.InstanceLikesEdge{}
	for i := 0; i < len(instanceUsers); i++ {
		edge, err := createInstanceLikesEdge(&instanceUsers[i])
		if err != nil {
			return nil, err
		}
		edges = append(edges, edge)
	}

	return &model.InstanceLikesConnection{
		Edges: edges,
		PageInfo: &model.PageInfo{
			HasNextPage:     hasNextPage,
			HasPreviousPage: false, // TODO
		},
	}, nil
}

// Author is the resolver for the author field.
func (r *inviteResolver) Author(ctx context.Context, obj *model.Invite) (*model.Author, error) {
	return instanceUserToAuthor(obj.Author), nil
}

// Author is the resolver for the author field.
func (r *messageResolver) Author(ctx context.Context, obj *model.Message) (*model.Author, error) {
	return instanceUserToAuthor(obj.Author), nil
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, input model.UserInput) (*model.User, error) {
	caller, err := upsertCaller(ctx)
	if err != nil {
		return nil, err
	}

	changed := caller.Name != input.Name || caller.Avatar != input.Avatar || caller.Bio != input.Bio

	if changed {

		caller.Name = input.Name
		caller.Avatar = input.Avatar
		caller.Bio = input.Bio

		log.Info().Msgf("UpdateUser: %+v", caller)

		db := interfaces.GetDatabase()
		if err := db.Save(&caller).Error; err != nil {
			return nil, err
		}

		if err := db.Model(model.InstanceUser{}).Where("user_id = ?", caller.ID).Updates(model.InstanceUser{
			Name:   caller.Name,
			Avatar: caller.Avatar,
			Bio:    caller.Bio,
		}).Error; err != nil {
			return nil, err
		}

		sendUserNotification(r.InstanceStreamObservers, caller, model.MutationTypeUserUpdated)
	}

	return caller, nil
}

// AddInstance is the resolver for the addInstance field.
func (r *mutationResolver) AddInstance(ctx context.Context, input model.InstanceInput) (*model.UserInstancesEdge, error) {
	db := interfaces.GetDatabase()

	instance := model.Instance{
		IsGroup: false,
	}
	populateInstanceFromInput(&instance, input)

	if err := db.Create(&instance).Error; err != nil {
		return nil, err
	}

	caller, err := upsertCaller(ctx)
	if err != nil {
		return nil, err
	}

	roles := []string{
		model.RoleAdmin.String(),
		model.RoleModerator.String(),
		model.RoleMember.String(),
	}
	instanceUser := userToInstanceUser(caller, instance, roles)

	// set the new channels rank
	var rank string
	// TODO use COLLATE "C"
	row := db.Table("instance_users").Where("user_id = ? AND deleted_at is NULL", caller.ID).Select("coalesce(max(rank), '0')").Row()
	if err := row.Scan(&rank); err != nil {
		if err != sql.ErrNoRows {
			rank = "0"
		} else {
			log.Info().Err(err).Msg("failed to get instance rank")
			return nil, err
		}
	}
	if newRank, ok := lexorank.Rank(rank, ""); ok {
		instanceUser.Rank = newRank
	} else {
		return nil, errors.New("failed to get instance rank")
	}

	if err := db.Save(&instanceUser).Error; err != nil {
		return nil, err
	}

	instance.Author = instanceUser
	instance.AuthorID = instanceUser.ID
	if err := db.Save(&instance).Error; err != nil {
		return nil, err
	}

	// create comments channel
	commentsChannel := model.Channel{}
	commentsChannel.AuthorID = instanceUser.ID
	commentsChannel.Author = instanceUser
	commentsChannel.IsComments = true
	commentsChannel.Rank = "a"
	commentsChannelInput := model.ChannelInput{
		Name:       "Comments",
		InstanceID: instance.ID,
		Publishers: []model.Role{
			model.RoleAllUsers,
		},
		Readers: []model.Role{
			model.RoleAllUsers,
		},
	}
	if err := populateChannelFromInput(&commentsChannel, commentsChannelInput); err != nil {
		return nil, err
	}
	if err := db.Create(&commentsChannel).Error; err != nil {
		return nil, err
	}

	edge, err := createUserInstancesEdge(instanceUser, instanceUser.Instance)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// UpdateInstance is the resolver for the updateInstance field.
func (r *mutationResolver) UpdateInstance(ctx context.Context, instanceID uuid.UUID, input model.InstanceInput) (*model.UserInstancesEdge, error) {
	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsAdmin(*callerInstanceUser); err != nil {
		return nil, err
	}

	if input.ID != nil && *input.ID != instanceID {
		return nil, errors.New("cannot change instance id")
	}

	db := interfaces.GetDatabase()

	instance := model.Instance{}
	if err := db.First(&instance, instanceID).Error; err != nil {
		return nil, err
	}

	populateInstanceFromInput(&instance, input)

	if err := db.Save(&instance).Error; err != nil {
		return nil, err
	}

	sendInstanceNotification(r.InstanceStreamObservers, &instance, model.MutationTypeInstanceUpdated)

	client := interfaces.GetPubSubClient()
	go client.PublishInstanceEvent(ctx, model.MutationTypeInstanceUpdated, instance)

	edge, err := createUserInstancesEdge(callerInstanceUser, &instance)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// RemoveInstance is the resolver for the removeInstance field.
func (r *mutationResolver) RemoveInstance(ctx context.Context, instanceID uuid.UUID) (*model.UserInstancesEdge, error) {
	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsAdmin(*callerInstanceUser); err != nil {
		return nil, err
	}

	db := interfaces.GetDatabase()

	instance := model.Instance{
		ID: instanceID,
	}
	if err := db.Delete(&instance, instance).Error; err != nil {
		return nil, err
	}

	if err := db.Delete(&model.InstanceUser{}, "instance_id = ?", instanceID).Error; err != nil {
		return nil, err
	}

	if err := db.Delete(&model.Invite{}, "instance_id = ?", instanceID).Error; err != nil {
		return nil, err
	}

	sendInstanceNotification(r.InstanceStreamObservers, &instance, model.MutationTypeInstanceRemoved)

	edge, err := createUserInstancesEdge(callerInstanceUser, &instance)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// ReorderInstance is the resolver for the reorderInstance field.
func (r *mutationResolver) ReorderInstance(ctx context.Context, instanceID uuid.UUID, input model.InstanceReorderInput) (*model.UserInstancesEdge, error) {
	caller, err := upsertCaller(ctx)
	if err != nil {
		return nil, err
	}

	db := interfaces.GetDatabase()
	instanceUser := model.InstanceUser{}
	instanceUser.InstanceID = instanceID
	instanceUser.UserID = caller.ID
	if err := db.Preload("Instance").First(&instanceUser, instanceUser).Error; err != nil {
		return nil, err
	}

	instanceUser.Pinned = true

	prevInstance := model.InstanceUser{}
	if input.PrevInstanceID != nil {
		prevInstance.InstanceID = *input.PrevInstanceID
		prevInstance.UserID = caller.ID
		if err := db.First(&prevInstance, prevInstance).Error; err != nil {
			return nil, err
		}
	}

	// update the instance's rank
	var nextRank string
	row := db.Raw(`
		SELECT rank FROM instance_users
		WHERE user_id = ? AND deleted_at is NULL AND pinned = ? AND rank > ? COLLATE "C"
		ORDER BY rank LIMIT 1`,
		caller.ID, true, prevInstance.Rank).Row()
	if err := row.Scan(&nextRank); err != nil {
		if err == sql.ErrNoRows {
			nextRank = "z"
		} else {
			log.Info().Err(err).Msg("failed to get next channel rank")
			return nil, err
		}
	}

	if prevInstance.Rank == nextRank {
		nextRank += "u"
	}

	log.Info().Str("prev", prevInstance.Rank).Str("next", nextRank).Msg("reordering instance")
	if newRank, ok := lexorank.Rank(prevInstance.Rank, nextRank); ok {
		instanceUser.Rank = newRank
	} else {
		// TODO this might actually happen, need to handle this case
		log.Info().Msg("failed to get instance rank")
		return nil, errors.New("failed to get channel rank")
	}

	if err := db.Save(&instanceUser).Error; err != nil {
		return nil, err
	}

	edge, err := createUserInstancesEdge(&instanceUser, instanceUser.Instance)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// PinInstance is the resolver for the pinInstance field.
func (r *mutationResolver) PinInstance(ctx context.Context, instanceID uuid.UUID, input model.InstancePinInput) (*model.UserInstancesEdge, error) {
	caller, err := upsertCaller(ctx)
	if err != nil {
		return nil, err
	}

	db := interfaces.GetDatabase()
	instanceUser := model.InstanceUser{}
	instanceUser.InstanceID = instanceID
	instanceUser.UserID = caller.ID
	if err := db.Preload("Instance").First(&instanceUser, instanceUser).Error; err != nil {
		return nil, err
	}

	instanceUser.Pinned = input.Pinned

	// pinning an instance moves it to the last rank
	if input.Pinned {
		var lastRank string
		row := db.Raw(`
			SELECT rank FROM instance_users
			WHERE user_id = ? AND deleted_at is NULL AND pinned = ?
			ORDER BY rank COLLATE "C" DESC LIMIT 1`,
			caller.ID, true).Row()
		if err := row.Scan(&lastRank); err != nil {
			if err == sql.ErrNoRows {
				lastRank = "a"
			} else {
				log.Info().Err(err).Msg("failed to get next channel rank")
				return nil, err
			}
		}

		if lastRank != instanceUser.Rank {
			lastRank += "u"
		}
		instanceUser.Rank = lastRank
	}

	if err := db.Save(&instanceUser).Error; err != nil {
		return nil, err
	}

	edge, err := createUserInstancesEdge(&instanceUser, instanceUser.Instance)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// AddGroup is the resolver for the addGroup field.
func (r *mutationResolver) AddGroup(ctx context.Context, input model.GroupInput) (*model.Instance, error) {
	db := interfaces.GetDatabase()

	instance := model.Instance{
		IsGroup: true,
	}

	if err := db.Create(&instance).Error; err != nil {
		return nil, err
	}

	caller, err := upsertCaller(ctx)
	if err != nil {
		return nil, err
	}

	roles := []string{
		model.RoleMember.String(),
	}
	instanceUser := userToInstanceUser(caller, instance, roles)
	if err := db.Save(&instanceUser).Error; err != nil {
		return nil, err
	}

	channel := model.Channel{
		InstanceID: instance.ID,
		AuthorID:   instanceUser.ID,
		Publishers: []string{
			model.RoleMember.String(),
		},
		Readers: []string{
			model.RoleMember.String(),
		},
	}
	if err := db.Create(&channel).Error; err != nil {
		return nil, err
	}

	instance.PrimaryChannel = &channel
	if err := db.Save(&instance).Error; err != nil {
		return nil, err
	}

	return &instance, nil
}

// AddChannel is the resolver for the addChannel field.
func (r *mutationResolver) AddChannel(ctx context.Context, input model.ChannelInput) (*model.InstanceChannelsEdge, error) {
	callerInstanceUser, err := getCallerInstanceUser(ctx, input.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsModerator(*callerInstanceUser); err != nil {
		return nil, err
	}

	db := interfaces.GetDatabase()

	channel := model.Channel{}
	channel.AuthorID = callerInstanceUser.ID
	channel.Author = callerInstanceUser
	if err := populateChannelFromInput(&channel, input); err != nil {
		return nil, err
	}

	// set the new channels rank
	var rank string
	// TODO use COLLATE "C"
	row := db.Table("channels").Where("instance_id = ? AND deleted_at is NULL", input.InstanceID).Select("coalesce(max(rank), '0')").Row()
	if err := row.Scan(&rank); err != nil {
		if err != sql.ErrNoRows {
			rank = "0"
		} else {
			log.Info().Err(err).Msg("failed to get channel rank")
			return nil, err
		}
	}
	if newRank, ok := lexorank.Rank(rank, ""); ok {
		channel.Rank = newRank
	} else {
		return nil, errors.New("failed to get channel rank")
	}

	if err := assertCanPublish(*callerInstanceUser, channel); err != nil {
		return nil, err
	}
	if err := db.Create(&channel).Error; err != nil {
		return nil, err
	}

	sendChannelNotification(r.InstanceStreamObservers, &channel, model.MutationTypeChannelAdded)

	edge, err := createInstanceChannelsEdge(&channel)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// UpdateChannel is the resolver for the updateChannel field.
func (r *mutationResolver) UpdateChannel(ctx context.Context, channelID uuid.UUID, input model.ChannelInput) (*model.InstanceChannelsEdge, error) {
	callerInstanceUser, err := getCallerInstanceUser(ctx, input.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsModerator(*callerInstanceUser); err != nil {
		return nil, err
	}

	db := interfaces.GetDatabase()
	channel := model.Channel{}
	if err := db.First(&channel, channelID).Error; err != nil {
		return nil, err
	}

	if channel.IsCategory != input.IsCategory {
		return nil, errors.New("cannot change channel type")
	}

	if err := populateChannelFromInput(&channel, input); err != nil {
		return nil, err
	}

	if err := db.Save(&channel).Error; err != nil {
		return nil, err
	}

	sendChannelNotification(r.InstanceStreamObservers, &channel, model.MutationTypeChannelUpdated)

	edge, err := createInstanceChannelsEdge(&channel)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// ReorderChannel is the resolver for the reorderChannel field.
func (r *mutationResolver) ReorderChannel(ctx context.Context, channelID uuid.UUID, input model.ChannelReorderInput) (*model.InstanceChannelsEdge, error) {
	db := interfaces.GetDatabase()
	channel := model.Channel{}
	if err := db.First(&channel, channelID).Error; err != nil {
		return nil, err
	}

	prevChannel := model.Channel{}
	if input.PrevChannelID != nil {
		if err := db.First(&prevChannel, input.PrevChannelID).Error; err != nil {
			return nil, err
		}
		if prevChannel.InstanceID != channel.InstanceID {
			return nil, errors.New("prevChannelID must be in the same instance")
		}
	}

	// set the new channels rank
	var nextRank string
	row := db.Raw(`
		SELECT rank FROM channels
		WHERE instance_id = ? AND deleted_at is NULL AND rank > ? COLLATE "C"
		ORDER BY rank LIMIT 1`,
		channel.InstanceID, prevChannel.Rank).Row()
	if err := row.Scan(&nextRank); err != nil {
		if err == sql.ErrNoRows {
			nextRank = "z"
		} else {
			log.Info().Err(err).Msg("failed to get next channel rank")
			return nil, err
		}
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, channel.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsModerator(*callerInstanceUser); err != nil {
		return nil, err
	}

	if prevChannel.Rank == nextRank {
		nextRank += "u"
	}
	log.Info().Str("prev", prevChannel.Rank).Str("next", nextRank).Msg("reordering channel")
	if newRank, ok := lexorank.Rank(prevChannel.Rank, nextRank); ok {
		channel.Rank = newRank
	} else {
		// TODO this might actually happen, need to handle this case
		log.Info().Msg("failed to get channel rank")
		return nil, errors.New("failed to get channel rank")
	}

	if err := db.Save(&channel).Error; err != nil {
		return nil, err
	}

	sendChannelNotification(r.InstanceStreamObservers, &channel, model.MutationTypeChannelUpdated)

	edge, err := createInstanceChannelsEdge(&channel)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// RemoveChannel is the resolver for the removeChannel field.
func (r *mutationResolver) RemoveChannel(ctx context.Context, channelID uuid.UUID) (*model.InstanceChannelsEdge, error) {
	db := interfaces.GetDatabase()

	channel := model.Channel{}
	if err := db.First(&channel, channelID).Error; err != nil {
		return nil, err
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, channel.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsModerator(*callerInstanceUser); err != nil {
		return nil, err
	}

	db.Delete(&channel, channelID)

	sendChannelNotification(r.InstanceStreamObservers, &channel, model.MutationTypeChannelRemoved)

	edge, err := createInstanceChannelsEdge(&channel)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// AddMessage is the resolver for the addMessage field.
func (r *mutationResolver) AddMessage(ctx context.Context, input model.MessageInput) (*model.ChannelMessagesEdge, error) {
	db := interfaces.GetDatabase()
	channel := model.Channel{}
	if err := db.First(&channel, input.ChannelID).Error; err != nil {
		return nil, err
	}
	callerInstanceUser, err := getCallerInstanceUser(ctx, channel.InstanceID)
	if err != nil {
		return nil, err
	}

	if channel.IsCategory {
		return nil, errors.New("You can't publish to a category")
	}
	if err := assertCanPublish(*callerInstanceUser, channel); err != nil {
		return nil, err
	}
	if r.ProfanityDetector.IsProfane(input.Text) {
		return nil, errors.New("Message contains contains language that is not allowed.")
	}

	message := model.Message{}
	message.Text = input.Text
	message.AuthorID = callerInstanceUser.ID
	message.Author = callerInstanceUser

	db.Model(&channel).Association("Messages").Append(&message)

	sendMessageNotification(r.InstanceStreamObservers, &message, &channel, model.MutationTypeMessageAdded)

	edge, err := createChannelMessagesEdge(&message)
	if err != nil {
		return nil, err
	}

	channel.LastMessageAddedAt = &message.CreatedAt
	channel.MessageCount++
	if err := db.Save(&channel).Error; err != nil {
		return nil, err
	}

	return edge, nil
}

// RemoveMessage is the resolver for the removeMessage field.
func (r *mutationResolver) RemoveMessage(ctx context.Context, messageID uuid.UUID) (*model.ChannelMessagesEdge, error) {
	db := interfaces.GetDatabase()

	message := model.Message{}
	if err := db.Preload("Author").First(&message, messageID).Error; err != nil {
		return nil, err
	}

	channel := model.Channel{}
	if err := db.First(&channel, message.ChannelID).Error; err != nil {
		return nil, err
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, channel.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertCanPublish(*callerInstanceUser, channel); err != nil {
		return nil, err
	}

	if message.AuthorID != callerInstanceUser.ID {
		if err := assertIsModerator(*callerInstanceUser); err != nil {
			return nil, err
		}
	}

	db.Delete(&message)

	channel.MessageCount--
	if err := db.Save(&channel).Error; err != nil {
		return nil, err
	}

	sendMessageNotification(r.InstanceStreamObservers, &message, &channel, model.MutationTypeMessageRemoved)

	edge, err := createChannelMessagesEdge(&message)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// AddRole is the resolver for the AddRole field.
func (r *mutationResolver) AddRole(ctx context.Context, authorID uuid.UUID, role model.Role) (*model.Author, error) {
	db := interfaces.GetDatabase()
	instanceUser := model.InstanceUser{}
	if err := db.Find(&instanceUser, authorID).Error; err != nil {
		return nil, err
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceUser.InstanceID)
	if err != nil {
		return nil, err
	}

	if contains(instanceUser.Roles, role.String()) {
		return nil, fmt.Errorf("user already has role %s", role)
	}

	if role == model.RoleModerator {
		if err := assertIsAdmin(*callerInstanceUser); err != nil {
			return nil, err
		}
		if err := assertIsNotBanned(instanceUser); err != nil {
			return nil, err
		}
	} else if role == model.RoleBanned {
		if err := assertIsModerator(*callerInstanceUser); err != nil {
			return nil, err
		}
		if err := assertIsNotAdmin(instanceUser); err != nil {
			return nil, err
		}

		// // TODO Make this more efficient
		// messages := []model.Message{}
		// if db.Where("author_id = ?", authorID).Preload("Channel").Find(&messages); err != nil {
		// 	return nil, err
		// }
		// for _, message := range messages {
		// 	sendMessageNotification(r.InstanceStreamObservers, &message, message.Channel, model.MutationTypeMessageRemoved)
		// }
		// if err := db.Where("author_id = ?", authorID).Delete(&model.Message{}).Error; err != nil {
		// 	return nil, err
		// }

	} else {
		return nil, fmt.Errorf("role %s is not allowed to be added", role)
	}

	instanceUser.Roles = append(instanceUser.Roles, role.String())

	// if adding moderator, make sure they are also a member
	if role == model.RoleModerator && !contains(instanceUser.Roles, model.RoleMember.String()) {
		instanceUser.Roles = append(instanceUser.Roles, model.RoleMember.String())
	}

	if err := db.Save(&instanceUser).Error; err != nil {
		return nil, err
	}

	refreshInstanceStreamRoles(r.InstanceStreamObservers, &instanceUser)

	author := instanceUserToAuthor(&instanceUser)
	sendAuthorNotification(r.InstanceStreamObservers, author, model.MutationTypeAuthorUpdated)

	client := interfaces.GetPubSubClient()
	go client.PublishAuthorEvent(ctx, model.MutationTypeAuthorUpdated, *author)
	return author, nil
}

// RemoveRole is the resolver for the RemoveRole field.
func (r *mutationResolver) RemoveRole(ctx context.Context, authorID uuid.UUID, role model.Role) (*model.Author, error) {
	db := interfaces.GetDatabase()
	instanceUser := model.InstanceUser{}
	if err := db.Find(&instanceUser, authorID).Error; err != nil {
		return nil, err
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceUser.InstanceID)
	if err != nil {
		return nil, err
	}

	if !contains(instanceUser.Roles, role.String()) {
		return nil, fmt.Errorf("user does not have role %s", role)
	}

	if role == model.RoleModerator {
		if err := assertIsAdmin(*callerInstanceUser); err != nil {
			return nil, err
		}
	} else if role == model.RoleBanned {
		if err := assertIsModerator(*callerInstanceUser); err != nil {
			return nil, err
		}
	} else {
		return nil, fmt.Errorf("role %s is not allowed to be removed", role)
	}

	instanceUser.Roles = RemoveFromSlice(instanceUser.Roles, role.String())

	if err := db.Save(&instanceUser).Error; err != nil {
		return nil, err
	}

	refreshInstanceStreamRoles(r.InstanceStreamObservers, &instanceUser)

	author := instanceUserToAuthor(&instanceUser)
	sendAuthorNotification(r.InstanceStreamObservers, author, model.MutationTypeAuthorUpdated)

	client := interfaces.GetPubSubClient()
	go client.PublishAuthorEvent(ctx, model.MutationTypeAuthorUpdated, *author)

	return author, nil
}

// AddInvite is the resolver for the addInvite field.
func (r *mutationResolver) AddInvite(ctx context.Context, input model.InviteInput) (*model.Invite, error) {
	db := interfaces.GetDatabase()

	callerInstanceUser, err := getCallerInstanceUser(ctx, input.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsModerator(*callerInstanceUser); err != nil {
		return nil, err
	}

	invite := model.Invite{}
	invite.InstanceID = input.InstanceID
	invite.AuthorID = callerInstanceUser.ID
	invite.Author = callerInstanceUser
	if input.ExpiresAt != nil {
		invite.ExpiresAt = input.ExpiresAt
	}
	if input.Redemptions != nil {
		invite.Redemptions = input.Redemptions
	}
	invite.Code = generateInviteCode()

	invite.Instance = &model.Instance{}
	if err := db.First(invite.Instance, invite.InstanceID).Error; err != nil {
		return nil, err
	}

	if err := db.Create(&invite).Error; err != nil {
		return nil, err
	}

	return &invite, nil
}

// RemoveInvite is the resolver for the removeInvite field.
func (r *mutationResolver) RemoveInvite(ctx context.Context, inviteID uuid.UUID) (*model.Invite, error) {
	db := interfaces.GetDatabase()

	invite := model.Invite{}
	if err := db.Preload("instance").Preload("Author").First(&invite, inviteID).Error; err != nil {
		return nil, err
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, invite.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsModerator(*callerInstanceUser); err != nil {
		return nil, err
	}

	db.Delete(&invite)

	return &invite, nil
}

// RedeemInvite is the resolver for the redeemInvite field.
func (r *mutationResolver) RedeemInvite(ctx context.Context, code string) (*model.Invite, error) {
	db := interfaces.GetDatabase()

	invite := model.Invite{}
	if err := db.Where("code = ?", code).Preload("Instance").Preload("Author").First(&invite).Error; err != nil {
		return nil, err
	}

	if invite.ExpiresAt != nil && invite.ExpiresAt.Before(time.Now()) {
		return nil, errors.New("invite expired")
	}

	if invite.Redemptions != nil && *invite.Redemptions <= 0 {
		return nil, errors.New("invite has no redemptions left")
	}

	if err := assertIsModerator(*invite.Author); err != nil {
		return nil, errors.New("invite author is no longer a moderator")
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, invite.InstanceID)
	if err != nil {
		return nil, err
	}

	if contains(callerInstanceUser.Roles, model.RoleMember.String()) {
		return nil, errors.New("caller is already a member")
	}

	callerInstanceUser.Roles = append(callerInstanceUser.Roles, model.RoleMember.String())
	if invite.Redemptions != nil {
		*invite.Redemptions--
	}

	if err := db.Transaction(func(tx *gorm.DB) error {
		if err := tx.Save(&callerInstanceUser).Error; err != nil {
			return err
		}

		if err := db.Save(&invite).Error; err != nil {
			return err
		}

		return nil
	}); err != nil {
		return nil, err
	}

	refreshInstanceStreamRoles(r.InstanceStreamObservers, callerInstanceUser)

	author := instanceUserToAuthor(callerInstanceUser)
	sendAuthorNotification(r.InstanceStreamObservers, author, model.MutationTypeAuthorUpdated)

	client := interfaces.GetPubSubClient()
	go client.PublishAuthorEvent(ctx, model.MutationTypeAuthorUpdated, *author)

	return &invite, nil
}

// AddLike is the resolver for the addLike field.
func (r *mutationResolver) AddLike(ctx context.Context, instanceID uuid.UUID) (*model.InstanceLikesEdge, error) {
	// TODO consider using transaction here
	db := interfaces.GetDatabase()

	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceID)
	if err != nil {
		return nil, err
	}

	if callerInstanceUser.LikedByMe {
		return nil, errors.New("user already likes instance")
	}

	callerInstanceUser.LikedByMe = true
	now := time.Now()
	callerInstanceUser.LikedAt = &now
	if err := db.Save(&callerInstanceUser).Error; err != nil {
		return nil, err
	}

	instance := model.Instance{}
	if err := db.First(&instance, instanceID).Error; err != nil {
		return nil, err
	}
	instance.LikesCount += 1
	if err := db.Save(&instance).Error; err != nil {
		return nil, err
	}

	edge, err := createInstanceLikesEdge(callerInstanceUser)
	if err != nil {
		return nil, err
	}

	sendLikeNotification(r.InstanceStreamObservers, edge, model.MutationTypeLikeAdded)

	return edge, nil
}

// RemoveLike is the resolver for the removeLike field.
func (r *mutationResolver) RemoveLike(ctx context.Context, instanceID uuid.UUID) (*model.InstanceLikesEdge, error) {
	// TODO consider using transaction here
	db := interfaces.GetDatabase()

	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceID)
	if err != nil {
		return nil, err
	}

	if !callerInstanceUser.LikedByMe {
		return nil, errors.New("user doesn't already like instance")
	}

	callerInstanceUser.LikedByMe = false
	if err := db.Save(&callerInstanceUser).Error; err != nil {
		return nil, err
	}

	instance := model.Instance{}
	if err := db.First(&instance, instanceID).Error; err != nil {
		return nil, err
	}
	instance.LikesCount -= 1
	if err := db.Save(&instance).Error; err != nil {
		return nil, err
	}

	edge, err := createInstanceLikesEdge(callerInstanceUser)
	if err != nil {
		return nil, err
	}

	sendLikeNotification(r.InstanceStreamObservers, edge, model.MutationTypeLikeRemoved)

	return edge, nil
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, uid string) (*model.User, error) {
	db := interfaces.GetDatabase()
	user := model.User{}

	if err := db.FirstOrCreate(&user, "uid = ?", uid).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

// Instance is the resolver for the instance field.
func (r *queryResolver) Instance(ctx context.Context, id uuid.UUID) (*model.UserInstancesEdge, error) {
	instanceUser, err := getCallerInstanceUser(ctx, id)
	if err != nil {
		return nil, err
	}

	edge, err := createUserInstancesEdge(instanceUser, instanceUser.Instance)
	if err != nil {
		return nil, err
	}
	return edge, nil
}

// Channel is the resolver for the channel field.
func (r *queryResolver) Channel(ctx context.Context, id uuid.UUID) (*model.Channel, error) {
	db := interfaces.GetDatabase()
	channel := model.Channel{}
	if err := db.First(&channel, id).Error; err != nil {
		return nil, err
	}

	callerInstanceUser, err := getCallerInstanceUser(ctx, channel.InstanceID)
	if err != nil {
		return nil, err
	}

	if err := assertCanRead(*callerInstanceUser, channel); err != nil {
		return nil, err
	}

	return &channel, nil
}

// Invite is the resolver for the invite field.
func (r *queryResolver) Invite(ctx context.Context, instanceID uuid.UUID) (*model.Invite, error) {
	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceID)
	if err != nil {
		return nil, err
	}

	if err := assertIsModerator(*callerInstanceUser); err != nil {
		return nil, err
	}

	db := interfaces.GetDatabase()
	invite := model.Invite{}

	instance := model.Instance{}
	if err := db.First(&instance, instanceID).Error; err != nil {
		return nil, err
	}

	if err := db.Model(invite).
		Order("created_at desc").
		Where("instance_id = ?", instanceID).
		Where("expires_at > ? OR expires_at is NULL", time.Now()).
		Where("redemptions > ? OR redemptions is NULL", 0).
		Where("author_id = ?", callerInstanceUser.ID).
		Preload("Author").
		First(&invite).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			invite.InstanceID = instanceID
			invite.AuthorID = callerInstanceUser.ID
			invite.Author = callerInstanceUser
			invite.Code = generateInviteCode()
			if err := db.Create(&invite).Error; err != nil {
				return nil, err
			}
		} else {
			return nil, err
		}
	}

	invite.Instance = &instance

	return &invite, nil
}

// CheckInvite is the resolver for the checkInvite field.
func (r *queryResolver) CheckInvite(ctx context.Context, code string) (*model.Invite, error) {
	db := interfaces.GetDatabase()
	invite := model.Invite{
		Code: code,
	}

	if err := db.Preload("Instance").Preload("Author").First(&invite, invite).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, errors.New("invite not found")
		} else {
			return nil, err
		}
	}

	if invite.ExpiresAt != nil && invite.ExpiresAt.Before(time.Now()) {
		return nil, errors.New("invite has expired")
	}

	if invite.Redemptions != nil && *invite.Redemptions <= 0 {
		return nil, errors.New("invite has no redemptions left")
	}

	log.Info().Msgf("invite: %+v", invite)

	callerInstanceUser, err := getCallerInstanceUser(ctx, invite.InstanceID)
	if err != nil {
		return nil, err
	}
	if contains(callerInstanceUser.Roles, model.RoleMember.String()) {
		return nil, errors.New("cannot redeem invite, you are already a member")
	}

	return &invite, nil
}

// InstanceStream is the resolver for the instanceStream field.
func (r *subscriptionResolver) InstanceStream(ctx context.Context, instanceID uuid.UUID) (<-chan *model.InstanceStreamNotification, error) {
	callerInstanceUser, err := getCallerInstanceUser(ctx, instanceID)
	if err != nil {
		return nil, err
	}

	stream := make(chan *model.InstanceStreamNotification, 1)
	listenerId := uuid.New().String()
	go func() {
		<-ctx.Done()
		r.InstanceStreamObservers.Delete(listenerId)
	}()

	roles := append(callerInstanceUser.Roles, model.RoleAllUsers.String())
	r.InstanceStreamObservers.Store(listenerId, &InstanceStreamObserver{
		instanceId: instanceID,
		roles:      roles,
		stream:     stream,
	})

	return stream, nil
}

// InstancesConnection is the resolver for the instancesConnection field.
func (r *userResolver) InstancesConnection(ctx context.Context, obj *model.User, first *int, after *string) (*model.UserInstancesConnection, error) {
	db := interfaces.GetDatabase()
	instanceUsers := []*model.InstanceUser{}

	tx := db.
		Joins("INNER JOIN instances ON instances.id = instance_users.instance_id AND instances.is_group = ?", false).
		Preload("Instance").Limit(*first + 1).
		Order("created_at asc")

	if *after != "" {
		created_at, err := fromCursorHash(*after)
		if err != nil {
			return nil, err
		}
		tx = tx.Where("created_at < ?", created_at)
	}

	if err := tx.Find(&instanceUsers, &model.InstanceUser{UserID: obj.ID, Pinned: true}).Error; err != nil {
		return nil, err
	}
	log.Info().Msgf("instanceUsers: %+v", instanceUsers)

	hasNextPage := (len(instanceUsers) == *first+1)
	if len(instanceUsers) > 0 && hasNextPage {
		instanceUsers = instanceUsers[:len(instanceUsers)-1]
	}

	edges := []*model.UserInstancesEdge{}
	for i := 0; i < len(instanceUsers); i++ {
		edge, err := createUserInstancesEdge(instanceUsers[i], instanceUsers[i].Instance)
		if err != nil {
			return nil, err
		}
		edges = append(edges, edge)
	}

	return &model.UserInstancesConnection{
		Edges: edges,
		PageInfo: &model.PageInfo{
			HasNextPage:     hasNextPage,
			HasPreviousPage: false, // TODO
		},
	}, nil
}

// Channel returns ChannelResolver implementation.
func (r *Resolver) Channel() ChannelResolver { return &channelResolver{r} }

// Instance returns InstanceResolver implementation.
func (r *Resolver) Instance() InstanceResolver { return &instanceResolver{r} }

// Invite returns InviteResolver implementation.
func (r *Resolver) Invite() InviteResolver { return &inviteResolver{r} }

// Message returns MessageResolver implementation.
func (r *Resolver) Message() MessageResolver { return &messageResolver{r} }

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

// Subscription returns SubscriptionResolver implementation.
func (r *Resolver) Subscription() SubscriptionResolver { return &subscriptionResolver{r} }

// User returns UserResolver implementation.
func (r *Resolver) User() UserResolver { return &userResolver{r} }

type channelResolver struct{ *Resolver }
type instanceResolver struct{ *Resolver }
type inviteResolver struct{ *Resolver }
type messageResolver struct{ *Resolver }
type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type subscriptionResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
