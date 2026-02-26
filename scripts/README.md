# slidesh - Cross-Platform Entry Points

This directory contains shell scripts for convenient command-line access to slidesh on different platforms.

## Files

- **slidesh.bat** - Windows batch script entry point
- **slidesh.sh** - Bash/Unix shell script entry point
- **slidesh.zsh** - Zsh shell script entry point (with additional features)
- **install.sh** - Installation helper to add slidesh to PATH

## Installation

### Windows

Add the `scripts` directory to your PATH:

1. Press `Win+R` and type `sysdm.cpl`
2. Click "Environment Variables"
3. Under "User variables", click "New"
4. Variable name: `PATH`
5. Variable value: `C:\Users\YourUsername\Projects\slidesh\scripts`
6. Click OK and restart your terminal

Then use:
```cmd
slidesh --list-themes
slidesh example.md
slidesh --mode cli --theme nord presentation.md
```

### macOS/Linux (Bash)

Run the install script:
```bash
bash scripts/install.sh
```

Then restart your shell or run:
```bash
source ~/.bashrc
```

### macOS/Linux (Zsh)

Run the install script:
```bash
bash scripts/install.sh
```

Then restart your shell or run:
```bash
source ~/.zshrc
```

## Usage

### Basic CLI Mode (default)
```bash
slidesh presentation.md
```

### With Theme Selection
```bash
slidesh --theme dracula presentation.md
slidesh --theme nord presentation.md
slidesh --theme solarized presentation.md
```

### List Available Themes
```bash
slidesh --list-themes
```

### Browser Mode
```bash
slidesh --mode browser presentation.md
```

### PDF Export
```bash
slidesh --mode pdf presentation.md
```

### Save Configuration
```bash
slidesh --mode cli --theme dracula --save-config presentation.md
```

This creates a `.slideshrc` file in the current directory with your preferences.

## Modes

- **cli** - Terminal/ANSI presentation (default)
- **browser** - Web browser presentation
- **pdf** - PDF export

## Available Themes

- dracula - A dark theme with vibrant colors
- nord - Polar night, frost, aurora theme
- one-dark - Atom inspired dark theme
- gruvbox - Retro groove color scheme
- solarized - Precision colors for machines and people

## Requirements

- Node.js 18 or higher
- npm or pnpm (for development)

## Troubleshooting

### "Node.js is not installed or not in PATH"

Ensure Node.js is installed and accessible from command line:
```bash
node --version
```

### Command not found

Make sure the scripts directory is in your PATH and scripts are executable:

On Unix/macOS:
```bash
chmod +x scripts/slidesh.sh scripts/slidesh.zsh scripts/install.sh
```

On Windows:
- Add the full path to scripts folder in Environment Variables PATH

### Theme not found

Use `slidesh --list-themes` to see available themes.
Theme names are case-insensitive.

## Development

To test scripts during development:

### Windows
```cmd
node packages\cli\dist\index.js --list-themes
```

### Unix/macOS
```bash
node packages/cli/dist/index.js --list-themes
```

## Notes

- On Windows, the `.bat` file requires `node` to be in PATH
- On Unix/macOS, the shell scripts require execute permissions
- The install script automatically detects your shell (Bash or Zsh)
- Configuration files (.slideshrc) are loaded with precedence: CLI args > sidecar > .slideshrc > defaults
