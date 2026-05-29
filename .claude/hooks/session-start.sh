#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code environments
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(pwd)}"

echo "Installing dependencies..."
# npm ci uses the lock file exactly and does NOT modify package-lock.json
# This prevents the stop hook from seeing "uncommitted changes"
npm ci

# Configure git remote with write access (bypasses the read-only local proxy).
# Requires GITHUB_PAT, GITHUB_USER, GITHUB_REPO set in .claude/settings.local.json (gitignored).
# Set origin push URL to GitHub directly (fetch stays on local proxy).
# This lets `git push origin` work while `git fetch origin` uses the proxy.
if [ -n "${GITHUB_PAT:-}" ] && [ -n "${GITHUB_USER:-}" ] && [ -n "${GITHUB_REPO:-}" ]; then
  git remote set-url --push origin "https://${GITHUB_USER}:${GITHUB_PAT}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git"

  # Also add lovable remote pointing to GitHub if not present
  if ! git remote get-url lovable >/dev/null 2>&1; then
    git remote add lovable "https://${GITHUB_USER}:${GITHUB_PAT}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
  else
    git remote set-url lovable "https://${GITHUB_USER}:${GITHUB_PAT}@github.com/${GITHUB_USER}/${GITHUB_REPO}.git"
  fi

  # Sync origin remote refs from GitHub (lovable) so the stop hook sees
  # correct pushed state instead of the stale local proxy state
  current_branch=$(git branch --show-current 2>/dev/null || true)
  if [ -n "$current_branch" ]; then
    git fetch lovable "${current_branch}" 2>/dev/null || true
    git update-ref "refs/remotes/origin/${current_branch}" "refs/remotes/lovable/${current_branch}" 2>/dev/null || true
  fi
  git fetch lovable main 2>/dev/null || true
  git update-ref refs/remotes/origin/main refs/remotes/lovable/main 2>/dev/null || true

  echo "Git remotes configured (origin push → GitHub, lovable refs synced)."
else
  echo "GITHUB_PAT/GITHUB_USER/GITHUB_REPO not set — push URL unchanged."
fi

echo "Session start hook complete."
