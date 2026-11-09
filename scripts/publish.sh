#!/usr/bin/env bash
# Commit (if needed) and push to GitHub as ChilivereRithvik.
# Usage:
#   ./scripts/publish.sh "your commit message"
#   bun run publish -- "your commit message"

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

GIT_NAME="Chilivere Rithvik"
GIT_EMAIL="chiliveririthvik444@gmail.com"
REMOTE="https://github.com/ChilivereRithvik/portfolio.git"
BRANCH="${BRANCH:-main}"

git_as_author() {
  git -c "user.name=${GIT_NAME}" -c "user.email=${GIT_EMAIL}" "$@"
}

if ! command -v git >/dev/null 2>&1; then
  echo "git is not installed."
  exit 1
fi

if command -v gh >/dev/null 2>&1; then
  login="$(gh api user -q .login 2>/dev/null || true)"
  if [[ -n "$login" && "$login" != "ChilivereRithvik" ]]; then
    echo "gh is logged in as '$login', expected ChilivereRithvik."
    echo "Run: gh auth login"
    exit 1
  fi
else
  echo "Warning: gh not found; ensure HTTPS credentials work for git push."
fi

if git remote get-url origin >/dev/null 2>&1; then
  current="$(git remote get-url origin)"
  if [[ "$current" != "$REMOTE" ]]; then
    echo "Updating origin → $REMOTE"
    git remote set-url origin "$REMOTE"
  fi
else
  git remote add origin "$REMOTE"
fi

if [[ -n "$(git status --porcelain)" ]]; then
  MSG="${1:-}"
  if [[ -z "$MSG" ]]; then
    echo "There are uncommitted changes. Pass a commit message:"
    echo "  ./scripts/publish.sh \"describe your changes\""
    exit 1
  fi
  git add -A
  git_as_author commit -m "$MSG"
  echo "Committed as ${GIT_NAME} <${GIT_EMAIL}>"
else
  echo "Working tree clean — nothing to commit."
fi

git push -u origin "$BRANCH"
echo "Pushed to origin/${BRANCH}."
