# Kafka and Node.js

Simple docker stack showing how to create a topic, produce messages within
that topic and balance them with 2 partitions, and then
finally consume messages on topic partitions with 2 instances.

source the scripts:
```
source scripts.sh
```

To start the thing:
```
deploy
```

To tear down and clean up:
```
teardown
```

To view what's going on inside producer/consumer:
```
logs producer
logs consumer
```

### Explore ksqldb

Under ./ksql there's some Node.js stuff exploring ksqldb's http2 streaming interfaces.
Ksqldb lets you make sql-like queries on topics.