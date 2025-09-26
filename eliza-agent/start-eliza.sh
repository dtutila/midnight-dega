#!/bin/bash

# ElizaOS Startup Script with Proxy Configuration
# This script works around the express-rate-limit trust proxy issue

echo "Starting ElizaOS with network configuration..."

# Set Express environment to development to bypass some strict checks
export NODE_ENV=development

# Force localhost IP detection
export HOSTNAME=127.0.0.1
export HOST=127.0.0.1


# Disable IPv6 to avoid IP detection issues
export NODE_OPTIONS="--dns-result-order=ipv4first"

# Start ElizaOS
echo "Launching ElizaOS..."
elizaos start --port 3010
