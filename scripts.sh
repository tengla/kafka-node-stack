function teardown {
  docker compose down
  docker volume prune -f
  docker image rm kafka-node-stack_producer kafka-node-stack_consumer
  docker image prune -f
}

function deploy {
  docker compose build
  docker compose up kafka zookeeper -d
  echo "Wait for kafka to settle ... "
  sleep 10
  docker compose up --scale consumer=2 -d
}

function logs {
  docker compose logs "$1" -f
}

function image_parents {
  let found=0
  for id in $(docker image ls -a -q); do
    parent_id=$(docker inspect --format='{{.Parent}}' $id)
    if [ -n "$parent_id" ]; then
      echo "$id has parent $parent_id"
      found=1
    fi
  done
}
