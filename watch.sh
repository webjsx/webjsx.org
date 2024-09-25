#!/bin/sh

# FROM: github.com/jeswin/bash-snippets/watch

killall http-server
npx http-server build/ &
while inotifywait -r -e modify -e create src; do
  npm run build
  killall http-server
  npx http-server build/ &
done