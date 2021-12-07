#!/bin/bash

docker ps --format "{{.Names}}" | grep "rdmo"
