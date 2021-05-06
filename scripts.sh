#!/usr/bin/env sh

tick() {
  n=$1
  i=0
  t=1
  while [ "$i" -lt "$n" ]; do
    echo -ne "$2"
    sleep $t
    i=$((i + t))
  done
  echo "$3"
}

teardown() {
  docker compose down
  docker compose --profile app-only down
  for img in kafka-node-stack_producer kafka-node-stack_consumer; do
    id=$(docker image ls -q "$img")
    if [ -n "$id" ]; then
      echo "removing $id ($img)"
      docker image rm "$id"
    fi
  done
}

deploy() {
  docker compose build
  docker compose up -d
  s=15
  echo "Wait $s seconds for kafka to settle ..."
  tick $s "." "done"
  docker compose --profile app-only up --scale consumer=2 -d
}

logs() {
  if [ -n "$1" ]
  then
    docker compose logs "$1" -f
  else
    echo "No service name given. Bye bye!"
  fi
}

image_parents() {
  found=0
  for id in $(docker image ls -a -q); do
    parent_id=$(docker inspect --format='{{.Parent}}' "$id")
    if [ -n "$parent_id" ]; then
      echo "$id has parent $parent_id"
      found=1
    fi
  done
  return $found
}

if [ -n "$1" ]; then
  case "$1" in
  start)
    echo "starting"
    deploy
    ;;
  stop)
    echo "stopping"
    teardown
    ;;
  *)
    echo "nothing to do"
    ;;
  esac
fi
