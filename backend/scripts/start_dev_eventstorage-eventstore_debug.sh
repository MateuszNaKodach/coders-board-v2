#!/usr/bin/env bash
docker-compose -f docker-compose.local.yml up -d  --remove-orphans

npm run cross-env EVENTSOURCING_MODE=eventstore cross-env EVENTSTORE_URL=http://127.0.0.1:2113 cross-env EVENTSTORE_USERNAME=admin cross-env EVENTSTORE_PASSWORD=changeit nest start --debug '0.0.0.0:9229' --watch
