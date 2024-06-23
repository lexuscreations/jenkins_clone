#!/bin/bash

# Get the directory of the current script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

REPO_URL="https://github.com/lexuscreations/react_vite_helloworld_test_demo.git"
CLONE_DIR="$SCRIPT_DIR/apps/react_vite_helloworld_test_demo"
LOG_DIR="$SCRIPT_DIR/logs"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
LOG_FILE="$LOG_DIR/vite_$TIMESTAMP.log"

# Ensure the logs directory exists
mkdir -p $LOG_DIR

if [ -d "$CLONE_DIR/.git" ]; then
    echo "Repository already exists. Fetching latest changes..."
    cd $CLONE_DIR
    git pull
else
    echo "Cloning repository..."
    mkdir -p $CLONE_DIR
    cd $CLONE_DIR
    git clone $REPO_URL .
fi

echo "Installing dependencies..."
npm i

echo "Starting development server on port 5000 and logging output to $LOG_FILE..."
npm run dev -- --host 0.0.0.0 2>&1 | sed -r "s/\x1b\[[0-9;]*m//g" > $LOG_FILE &
