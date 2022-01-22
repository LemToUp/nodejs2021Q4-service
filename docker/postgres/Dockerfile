FROM postgres:14-alpine

RUN mkdir -p "$PGDATA" && chmod 700 "$PGDATA"

RUN mkdir -p /logs
RUN chown -R postgres:postgres /logs
