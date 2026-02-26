#!/bin/bash

# slidesh - Installation Helper Script
# Adds slidesh to PATH for convenient command-line access

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

# Determine shell
SHELL_NAME=$(basename "$SHELL")

echo "slidesh - Installation Helper"
echo "=============================="
echo ""

# Make scripts executable
chmod +x "$SCRIPT_DIR/slidesh.sh"
chmod +x "$SCRIPT_DIR/slidesh.zsh"

echo "✓ Made shell scripts executable"
echo ""

# Detect shell configuration file
if [[ "$SHELL_NAME" == "zsh" ]]; then
    RC_FILE="$HOME/.zshrc"
    SCRIPT="$SCRIPT_DIR/slidesh.zsh"
    SHELL_TYPE="Zsh"
elif [[ "$SHELL_NAME" == "bash" ]]; then
    RC_FILE="$HOME/.bashrc"
    SCRIPT="$SCRIPT_DIR/slidesh.sh"
    SHELL_TYPE="Bash"
else
    echo "Note: Detected shell is $SHELL_NAME"
    echo ""
    echo "Please manually add the following to your shell configuration file:"
    echo "  export PATH=\"$SCRIPT_DIR:\$PATH\""
    echo ""
    exit 0
fi

# Check if already in PATH
if grep -q "slidesh" "$RC_FILE" 2>/dev/null; then
    echo "✓ slidesh is already in your $SHELL_TYPE PATH"
    exit 0
fi

# Add to PATH
echo "" >> "$RC_FILE"
echo "# slidesh - Dual-target presentation engine" >> "$RC_FILE"
echo "export PATH=\"$SCRIPT_DIR:\$PATH\"" >> "$RC_FILE"

echo "✓ Added slidesh to $SHELL_TYPE PATH"
echo ""
echo "To activate, run:"
echo "  source $RC_FILE"
echo ""
echo "Then test with:"
echo "  slidesh --list-themes"
