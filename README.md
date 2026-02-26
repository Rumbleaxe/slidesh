# slidesh

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
[![Version](https://img.shields.io/badge/version-0.1.0-blue)](#)

> **Write once. Present anywhere.**  
> Markdown → Web Runtime + CLI Runtime.

slidesh is a **dual-runtime presentation compiler** that turns a single Markdown file into two completely different presentation experiences:

- 🌐 **Web**: Modern React application with smooth navigation and theming
- 🖥️ **CLI**: Native terminal presentation with ANSI colors and keyboard controls

Same source file. Professional output in any environment.

---

## 🎯 What Makes slidesh Different

Unlike traditional slide converters, slidesh is architected as a **presentation compiler**, not a Markdown converter:

- **Compiled AST**: Markdown is parsed into a strongly-typed, target-agnostic intermediate representation
- **Dual Renderers**: Both web and CLI are first-class citizens (not fallbacks)
- **True Theming**: Colors, layouts, and styles defined once, rendered correctly everywhere
- **Engineers First**: Built for developers who present from terminals without compromise

---

## ✨ Features

### Core Capabilities

| Feature | Web | CLI |
|---------|-----|-----|
| **Navigation** | Arrow keys, click, URL indexing | Arrow keys, vim keys, q to quit |
| **Theming** | 5 bundled themes + WezTerm support | Full ANSI color palette support |
| **Code Highlighting** | Shiki (VSCode-grade) | ANSI syntax highlighting |
| **Conditional Content** | `::: only web` blocks | `::: only cli` blocks |
| **Responsive** | CSS Grid/Flexbox layouts | Terminal width-aware rendering |

### Built-in Themes

1. **Dracula** - Dark, vibrant purple-red palette
2. **Nord** - Cool, professional blue-grey
3. **One Dark** - Atom-inspired dark theme
4. **Gruvbox** - Warm, retro-inspired colors
5. **Solarized** - Optimized for readability

All themes work on both web and CLI with automatic color conversion.

### Configuration System

Control presentation behavior via:

- **CLI arguments**: `slidesh file.md --theme dracula --mode cli`
- **Config file**: `.slideshrc` (JSON) for project defaults
- **Sidecar files**: `presentation.slidesh.json` next to your slides
- **Precedence**: CLI args > sidecar config > .slideshrc > defaults

---

## 🚀 Quick Start

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Rumbleaxe/slidesh.git
cd slidesh
pnpm install
pnpm build
```

**Requirements**: Node.js 18+ and pnpm 8.15+

### Basic Usage

**1. Create a Markdown presentation** (`talk.md`):

```markdown
---
title: My Talk
theme: dracula
---

# Slide 1: Introduction

Hello, world!

---

# Slide 2: Content

- Point 1
- Point 2
- Point 3

---

# Slide 3: Code

```js
function hello() {
  console.log("Hello!");
}
```

---

# Slide 4: The End

Thank you!
```

**2. Run in CLI**:

```bash
pnpm cli talk.md
```

Controls:
- `←` / `→` Arrow keys: Navigate slides
- `q`: Quit presentation

**3. Open in browser**:

```bash
pnpm cli talk.md --mode browser
```

Automatically opens in your default browser. Navigate with arrow keys or click.

**4. Generate PDF**:

```bash
pnpm cli talk.md --mode pdf
```

Generates a professional PDF file (A4 Landscape) in the same folder as your markdown with page numbers and themed styling.

```bash
# Export with different theme
pnpm cli talk.md --mode pdf --theme nord
pnpm cli talk.md --mode pdf --theme gruvbox
```

PDFs are created in seconds using Puppeteer (headless browser rendering).

---

## 📖 Documentation

Essential guides:

- **[CHANGELOG.md](./CHANGELOG.md)** - Version history and release notes
- **[VERSIONING.md](./VERSIONING.md)** - Semantic versioning strategy and roadmap
- **[.reports/AGENTS.md](./reports/AGENTS.md)** - Architecture and design principles
- **[.reports/GIT_AND_VERSIONING_SETUP.md](./reports/GIT_AND_VERSIONING_SETUP.md)** - Git setup details

---

## 🏗️ Architecture

```
your-talk.md
    ↓
Parser (@slidesh/parser)
    ↓
Slidesh AST (Typed, target-agnostic)
    ↓
    ├─→ Web Renderer (React + Vite)
    │   └─→ HTML with CSS Variables
    │
    └─→ CLI Renderer (Node + ANSI)
        └─→ Terminal output
```

### Packages

- **`@slidesh/parser`** - Markdown → Typed AST
- **`@slidesh/themes`** - Theme system + color conversion
- **`@slidesh/renderer-cli`** - Terminal rendering with ANSI
- **`@slidesh/renderer-web`** - React components
- **`@slidesh/cli`** - Command-line entry point
- **`slidesh-web`** - Web application (apps/web)

Each package is independent and composable.

---

## 🎨 Theming

### Using Built-in Themes

```bash
# CLI with Nord theme
pnpm cli talk.md --theme nord

# Browser with Gruvbox
pnpm cli talk.md --theme gruvbox --mode browser

# List available themes
pnpm cli --list-themes
```

### Custom WezTerm Themes

slidesh can automatically fetch color schemes from [WezTerm](https://wezterm.org/colorschemes/):

```bash
pnpm cli talk.md --theme https://wezterm.org/colorschemes/
```

Themes are cached locally for offline use.

---

## 🛠️ Development

### Project Structure

```
slidesh/
├── packages/
│   ├── parser/           # Markdown parsing logic
│   ├── renderer-cli/     # Terminal rendering
│   ├── renderer-web/     # React components
│   ├── themes/           # Theme definitions + utilities
│   └── cli/              # Command-line entry point
├── apps/
│   └── web/              # Vite + React web app
├── scripts/              # Entry point scripts (bat, sh, zsh)
├── example.md            # Example presentation
└── presentation.md       # Another example
```

### Build & Development

```bash
# Build all packages
pnpm build

# Watch mode for development
pnpm dev:web              # Start web dev server on :5173
pnpm dev:cli example.md   # Run CLI with hot-reload friendly setup

# Generate HTML from Markdown
pnpm generate:html        # Creates presentation.html
```

### Code Quality

- **TypeScript**: Strict mode enabled across all packages
- **Zero external CLI dependencies**: Custom argument parser
- **Monorepo**: pnpm workspaces for isolated, composable packages

---

## 🌍 Cross-Platform Support

slidesh works on:

- **Linux** (Bash, Zsh)
- **macOS** (Zsh, iTerm2, WezTerm)
- **Windows** (PowerShell, WSL, native terminals)

### Recommended Terminal Emulators

| OS | Recommended | Fallback |
|----|-------------|----------|
| macOS | WezTerm, iTerm2 | Terminal.app |
| Linux | WezTerm, Kitty | GNOME Terminal |
| Windows | WezTerm, Windows Terminal | ConEmu |

CLI gracefully degrades on terminals with limited color support.

---

## 📊 Performance

- **Parsing**: < 100ms for typical presentations
- **Navigation**: Instant slide switching in CLI and web
- **Memory**: Minimal footprint (~15-20MB for CLI)
- **Bundle Size**: Web: 144.86 KB (46.59 KB gzipped)

---

## 📝 Markdown Specification

### Slide Splitting

Slides are separated by `---` on a line by itself:

```markdown
# Slide 1

Content here

---

# Slide 2

More content
```

### Frontmatter

Optional YAML at the start of your file (not yet fully used, but reserved):

```yaml
---
title: My Presentation
theme: dracula
---

# Slide 1
...
```

### Conditional Content

Render content for specific targets:

```markdown
::: only web
This content appears only in the browser
(great for interactive components)
:::

::: only cli
This text shows only in the terminal
(perfect for ASCII art or CLI-specific content)
:::
```

### Code Blocks

Syntax highlighting works on both platforms:

```js
function example() {
  return "Highlighted on web and CLI";
}
```

---

## 🔧 Configuration

### .slideshrc

Place a `.slideshrc` file in your project root:

```json
{
  "theme": "nord",
  "mode": "cli",
  "defaultSlideWidth": 80
}
```

### Sidecar Configuration

Create `presentation.slidesh.json` next to your slides:

```json
{
  "theme": "dracula",
  "mode": "browser"
}
```

### CLI Overrides

Command-line flags override all configuration:

```bash
pnpm cli talk.md --theme solarized --mode browser --save-config
```

The `--save-config` flag persists your settings to `.slideshrc`.

---

## 🚨 Known Limitations

- **Browser Mode**: Uses `file://` URLs (HTTP server recommended for full compatibility)
- **WezTerm Themes**: Requires network access for first-time fetching (cached after)
- **Terminal Support**: Optimized for modern terminals; degrades gracefully on basic ones

**Note**: PDF export now works directly using Puppeteer! No external tools needed.

---

## 📋 Requirements & Compatibility

| Requirement | Version |
|-------------|---------|
| **Node.js** | >=18.0.0 |
| **TypeScript** | ^5.3.3 |
| **pnpm** | >=8.15.0 |

---

## 📜 License

MIT License - Free for personal and commercial use. See [LICENSE](./LICENSE) for details.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`feature/my-feature`)
3. Make your changes
4. Build and test: `pnpm build`
5. Submit a pull request

See [.reports/AGENTS.md](./.reports/AGENTS.md) for architecture and design guidelines.

---

## 🗺️ Roadmap

### Current Version: 0.1.0
✅ Complete theme system  
✅ Multi-mode rendering (CLI, Browser, PDF)  
✅ 5 bundled themes + WezTerm support  
✅ Cross-platform support  

### v0.2.0 (Planned)
- Additional themes
- Enhanced configuration options
- Improved documentation

### v1.0.0 (Planned)
- Stable CLI API
- npm package publishing
- Full test suite
- Plugin system foundation

### v2.0.0 (Future)
- Live JSX blocks
- Presenter mode with speaker notes
- PowerPoint/Google Slides export

See [VERSIONING.md](./VERSIONING.md) for detailed version strategy.

---

## ❓ FAQ

**Q: Can I use slidesh for technical presentations?**  
A: Absolutely! Code syntax highlighting works great on both platforms.

**Q: What if my terminal doesn't support true color?**  
A: slidesh automatically degrades to 256-color or 16-color mode.

**Q: Can I export to PowerPoint or Google Slides?**  
A: Not in v0.1.0, but it's on the v2.0.0 roadmap.

**Q: Does slidesh require an internet connection?**  
A: Not for local presentations. WezTerm theme fetching is optional.

**Q: Can I use custom fonts in CLI mode?**  
A: Yes! Configure your terminal emulator's font, and slidesh will use it.

---

## 🔗 Links

- **GitHub**: https://github.com/Rumbleaxe/slidesh
- **Issues**: https://github.com/Rumbleaxe/slidesh/issues
- **Releases**: https://github.com/Rumbleaxe/slidesh/releases
- **License**: [MIT](./LICENSE)

---

**Made with ❤️ for engineers who present**
