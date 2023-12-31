package graph

import (
	"encoding/json"
	"io/ioutil"
	"sync"

	goaway "github.com/TwiN/go-away"
	"github.com/google/uuid"
	"github.com/rs/zerolog/log"

	"github.com/wwwillw/pixelland-chat/graph/directives"
	"github.com/wwwillw/pixelland-chat/graph/generated"
	"github.com/wwwillw/pixelland-chat/graph/model"
)

type StreamObserver struct {
	UserId     uuid.UUID
	InstanceId uuid.UUID
	Roles      []string
	Stream     chan *model.Notice
}

type Resolver struct {
	StreamObservers   sync.Map
	MessageLog        sync.Map
	ProfanityDetector *goaway.ProfanityDetector
}

func New() generated.Config {

	bytes, err := ioutil.ReadFile("./assets/profanities.json")
	if err != nil {
		log.Fatal().Err(err).Msg("Error reading file")
	}

	var profanities []string
	err = json.Unmarshal(bytes, &profanities)
	if err != nil {
		log.Fatal().Err(err).Msg("Error unmarshalling portals")
	}

	falsePositives := []string{}
	falseNegatives := []string{}
	profanityDetector := goaway.NewProfanityDetector().WithCustomDictionary(profanities, falsePositives, falseNegatives)

	return generated.Config{
		Resolvers: &Resolver{
			StreamObservers:   sync.Map{},
			MessageLog:        sync.Map{},
			ProfanityDetector: profanityDetector,
		},
		Directives: generated.DirectiveRoot{
			Constraint: directives.ConstraintDirective,
			Auth:       directives.AuthDirective,
		},
	}
}
