#!/bin/sh

sudo chown -R node:container /admin

npm install

if [ ! -f ".env" ]; then
  cp .env.example .env
fi

if [ "$NODE_ENV" == "production" ]; then
  npm run build && npm run start
else
  npm run dev
fi
