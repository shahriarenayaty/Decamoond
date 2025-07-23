# check-package-changes.sh
#!/bin/bash
set -e

# Calculate checksum of package.json
PACKAGE_JSON_CHECKSUM=$(sha256sum /app/package.json | awk '{ print $1 }')
CHECKSUM_FILE=/app/node_modules/.package-json-checksum

# Check if node_modules exists and if package.json has changed
if [ ! -d /app/node_modules ] || [ ! -f "$CHECKSUM_FILE" ] || [ "$(cat $CHECKSUM_FILE)" != "$PACKAGE_JSON_CHECKSUM" ]; then
    echo "package.json has changed or node_modules is missing. Running npm ci..."
    npm ci
    # Store the new checksum
    echo "$PACKAGE_JSON_CHECKSUM" > "$CHECKSUM_FILE"
else
    echo "No changes in package.json. Skipping npm ci."
fi

# Start the application
exec "$@"