# Kafka and Node.js

Simple docker stack showing how to create a topic, produce messages within
that topic and balance them with 2 partitions, and then 
finally consume messages on topic partitions with 2 instances.

```
docker-compose build
```

```
docker-compose up --scale consumer=2
```
