#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

echo "Installing dependencies..."
npm install

# Configure git remote with write access (bypasses the read-only local proxy).
# Requires GITHUB_PAT, GITHUB_USER, GITHUB_REPO set in .claude/settings.local.json (gitignored).
if [ -n "${GITHUB_PAT:-}" ] && [ -n "${GITHUB_USER:-}" ] && [ -n "${GITHUB_REPO:-}" ]; then
  git remote remove lovable 2>/dev/null || true
  git remote add lovable "https://${GITHUB_USER}:${GITHUB_PAT}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
  echo "Git remote 'lovable' configured."
else
  echo "GITHUB_PAT/GITHUB_USER/GITHUB_REPO not set — skipping 'lovable' remote setup."
fi

echo "Session start hook complete."
