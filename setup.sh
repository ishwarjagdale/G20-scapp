#! /bin/bash

forever stopall
npm install package.json --legacy-peer-deps
npm run build
forever start start-server.js