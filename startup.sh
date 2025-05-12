#!/bin/bash

function up() {
    if [ -d "$MYSQLPATH" ]
        then
            if [ "$(ls -A $MYSQLPATH)" ]; then
                echo "Dir already exists"
                sudo rm -rf $MYSQLPATH
                mkdir $MYSQLPATH
            fi
            echo "Dir is empty"
        else
            echo "$MYSQLPATH" not found
            echo "Creating $MYSQLPATH ..."
            mkdir $MYSQLPATH
    fi
    echo Running 'docker compose up --build'
    docker compose up --build
}

function down() {
    echo Running "docker compose down --rmi 'all'"
    echo $MYSQLPATH

    docker compose down --rmi 'all'
    sudo rm -rf $MYSQLPATH
}
