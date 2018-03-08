curl "http://localhost:4741/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "'"${EMAIL}"'",
      "user_name": "'"${USER_NAME}"'",
      "password": "'"${PASSWORD}"'"
    }
  }'

echo
