#!/usr/bin/env bash
docker-compose -f docker-compose.local.yml up -d  --remove-orphans

npm run env EVENTSOURCING_MODE=eventstore env EVENTSTORE_URL=http://127.0.0.1:2113 env EVENTSTORE_USERNAME=admin env EVENTSTORE_PASSWORD=changeit nest start --watch
