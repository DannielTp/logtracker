#!/bin/sh
set -e

echo "🟢 Generating runtime env.js"

envsubst < /usr/share/nginx/html/env.template.js \
         > /usr/share/nginx/html/env.js

exec "$@"
