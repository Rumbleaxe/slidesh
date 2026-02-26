#!/bin/zsh

# slidesh - Dual-target presentation engine (Zsh)
# Usage: slidesh [mode] [file] [options]
#        slidesh --mode cli|browser|pdf --theme <theme> <file>
#        slidesh --list-themes

SCRIPT_DIR="${0:a:h}"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"
NODE_PATH="$PROJECT_ROOT/packages/cli/dist/index.js"

# If no arguments or --help, show help
if [[ $# -eq 0 ]] || [[ "$1" == "--help" ]] || [[ "$1" == "-h" ]]; then
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

Zsh Features:
  - Tab completion for theme names (if installed)
  - Vi keybindings supported
  - Automatic alias to 'sh' for ease of use
EOF
    return 0
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in PATH"
    return 1
fi

# Run the CLI with all arguments
node "$NODE_PATH" "$@"
return $?
