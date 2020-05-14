#!/usr/bin/env bash
docker-compose -f docker-compose.test-integration.yml up -d  --remove-orphans

jest --config test-integration/jest-integration.json