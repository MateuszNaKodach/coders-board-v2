@echo off
#!/usr/bin/env bash
docker-compose -f docker-compose.local.yml up -d  --remove-orphans

#cross-env EVENTSOURCING_MODE=eventstore EVENTSTORE_URL=http://127.0.0.1:2113 EVENTSTORE_USERNAME=admin EVENTSTORE_PASSWORD=changeit nest start --debug '0.0.0.0:9229' --watch
set EVENTSOURCING_MODE=eventstore
set EVENTSTORE_URL=http://127.0.0.1:2113
set EVENTSTORE_USERNAME=admin
set EVENTSTORE_PASSWORD=changeit
nest start --debug '0.0.0.0:9229' --watch
