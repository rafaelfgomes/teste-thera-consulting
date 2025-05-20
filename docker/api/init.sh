#!/bin/sh

sudo chown -R node:container /api

npm install

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

if [ "$NODE_ENV" == "production" ]; then
  npm run start:prod
else
  npm run start:dev
fi

sleep 5

npm run seed
