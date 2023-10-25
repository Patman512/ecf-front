#!/bin/bash

try_connect(){
    echo 'SHOW DATABASES' | MYSQL_PWD="$MYSQL_USER_PASSWORD" mysql \
            -h "$MYSQL_USER_HOST" \
            -P "$MYSQL_USER_PORT" \
            -u "$MYSQL_USER_USER" &>/dev/null
}

# Make sure the MySQL server is properly started before we start doing requests
while ! try_connect; do
    sleep 0.1
done

mysql -h "$MYSQL_USER_HOST" -P "$MYSQL_USER_PORT" -u "$MYSQL_USER_USER" -p"$MYSQL_USER_PASSWORD" < ./src/database/database.sql
mysql -h "$MYSQL_USER_HOST" -P "$MYSQL_USER_PORT" -u "$MYSQL_USER_USER" -p"$MYSQL_USER_PASSWORD" < ./src/database/populate.sql
