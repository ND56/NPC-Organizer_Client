curl "http://localhost:4741/npcs/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Token token=$TOKEN" \
  --data '{
    "npc": {
      "name": "'"${NAME}"'",
      "race": "'"${RACE}"'",
      "challenge_rating": "'"${CHALLENGE_RATING}"'",
      "stats": "'"${STATS}"'",
      "traits": "'"${TRAITS}"'",
      "notes": "'"${NOTES}"'",
      "private": "'"${PRIVATE}"'",
      "dnd_class": "'"${DND_CLASS}"'"
    }
  }'

echo
