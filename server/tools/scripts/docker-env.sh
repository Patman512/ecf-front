#!/usr/bin/env bash

SCRIPT_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
OS=$(uname)
COMPOSE=podman-compose
INITDB=true
CMD="up -d"

while [ "$#" -ge 1 ]; do
    case "$1" in
        --kill)
            CMD="down"
            INITDB=false
            shift 1
            ;;
        --podman)
            COMPOSE=podman-compose
            shift 1
            ;;
        --docker)
            COMPOSE=docker-compose
            shift 1
            ;;
        *)
            echo "Error: unknown argument $1" >&2
            exit 1
            ;;
    esac
done


"${COMPOSE}" -f "${SCRIPT_DIR}/docker-compose.yml" ${CMD}


if [ "${INITDB}" = true ]; then
    export MYSQL_USER_HOST=127.0.0.1
    export MYSQL_USER_PORT=13305
    export MYSQL_USER_USER=root
    export MYSQL_USER_PASSWORD=admin

    "${SCRIPT_DIR}/init-db.sh"
fi
