#!/bin/bash

PROJECT_DIR="$(git rev-parse --show-toplevel || echo ".")"
git config core.hooksPath "${PROJECT_DIR}/scripts/git-hooks"
