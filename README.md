# Explore Kafka and Ksqldb with Node.js

Simple docker stack showing how to create a topic, produce messages within
that topic and balance them with 2 partitions, and then
finally consume messages on topic partitions with 2 instances.

Get function aliases into your environment:
```
source scripts.sh
```

To start the stack:
```
deploy
```

To view what's going on inside producer/consumer:
```
logs producer
logs consumer
```

To tear down and clean up the stack:
```
teardown
```

### Explore ksqldb

Under ./ksql there's some Node.js stuff exploring ksqldb's http2 streaming interfaces.
Ksqldb lets you make sql-like queries on topics.

### Ksqldb-cli

To open the ksql-cli you can attach to it via docker:

```
docker compose up ksqldb-server ksqldb-cli -d
docker exec -it ksqldb-cli ksql http://ksqldb-server:8088
```

See the quickstart at https://ksqldb.io/quickstart.html
