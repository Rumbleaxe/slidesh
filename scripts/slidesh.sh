#!/bin/bash

# slidesh - Dual-target presentation engine (Unix/macOS)
# Usage: slidesh [mode] [file] [options]
#        slidesh --mode cli|browser|pdf --theme <theme> <file>
#        slidesh --list-themes

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
NODE_PATH="$PROJECT_ROOT/packages/cli/dist/index.js"

# If no arguments, show help
if [ $# -eq 0 ]; then
    cat <<EOF
slidesh - Dual-target presentation engine

Usage:
  slidesh [mode] [file] [options]

Modes:
  cli       - Terminal presentation (default)
  browser   - Web browser presentation
  pdf       - PDF export

Options:
  --theme <name>      - Use theme (dracula, nord, solarized, etc.)
  --list-themes       - List all available themes
  --save-config       - Save current settings to .slideshrc

Examples:
  slidesh cli presentation.md
  slidesh browser presentation.md --theme nord
  slidesh --mode cli --theme dracula presentation.md
  slidesh --list-themes
EOF
    exit 0
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    exit 1
fi

# Run the CLI with all arguments
node "$NODE_PATH" "$@"
exit $?
