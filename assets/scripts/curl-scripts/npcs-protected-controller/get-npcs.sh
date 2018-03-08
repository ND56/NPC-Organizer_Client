#!/bin/bash

curl "http://localhost:4741/npcs" \
  --include \
  --request GET \
  --header "Authorization: Token token=$TOKEN"

echo
