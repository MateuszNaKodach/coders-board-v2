#!/usr/bin/env bash
docker-compose -f docker-compose.local.yml up -d  --remove-orphans

cross-env EVENTSOURCING_MODE=eventstore EVENTSTORE_URL=http://127.0.0.1:2113 EVENTSTORE_USERNAME=admin EVENTSTORE_PASSWORD=changeit nest start --watch
