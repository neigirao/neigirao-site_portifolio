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
# Set origin push URL to GitHub directly (fetch stays on local proxy).
# This lets `git push origin` work while `git fetch origin` uses the proxy.
# Requires GITHUB_PAT, GITHUB_USER, GITHUB_REPO in .claude/settings.local.json (gitignored).
if [ -n "${GITHUB_PAT:-}" ] && [ -n "${GITHUB_USER:-}" ] && [ -n "${GITHUB_REPO:-}" ]; then
  git remote set-url --push origin "https://${GITHUB_USER}:${GITHUB_PAT}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
  echo "Git origin push URL set to GitHub (direct)."
else
  echo "GITHUB_PAT/GITHUB_USER/GITHUB_REPO not set — push URL unchanged."
fi

echo "Session start hook complete."
