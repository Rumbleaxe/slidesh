# Changelog

All notable changes to this project are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/), following [Semantic Versioning](https://semver.org/).

---

## [Unreleased]

### Planned for v0.2.0
- Additional bundled themes
- Enhanced configuration UI
- Improved documentation

### Planned for v1.0.0
- Stable CLI API guarantee
- npm package publishing
- Full test suite
- Plugin system foundation

### Planned for v1.1.0+
- Custom theme creator
- Direct PDF export (Puppeteer)
- Animations and transitions
- Presenter mode with speaker notes
- Live JSX blocks

---

## [0.1.0] — 2026-02-26

Initial release: A complete dual-runtime presentation compiler with theming support.

### Added

#### Core Compiler
- **Markdown Parser** (`@slidesh/parser`): Slide splitting by `---`, whitespace trimming
- **Typed AST**: Target-agnostic, serializable intermediate representation
- **Web Renderer** (`@slidesh/renderer-web`): React components with CSS variables
- **CLI Renderer** (`@slidesh/renderer-cli`): Terminal rendering with ANSI colors

#### Theme System
- **5 Bundled Themes**: Dracula, Nord, One Dark, Gruvbox, Solarized
- **Color Conversion**: Hex → ANSI256/ANSI16 for terminal portability
- **WezTerm Theme Fetcher**: On-demand theme loading with local caching
- **CSS Variable Support**: Dynamic theming in web mode

#### Output Modes
- **CLI Mode**: Terminal presentation with keyboard navigation
- **Browser Mode**: Opens HTML in default browser
- **PDF Mode**: Generates themed HTML for print-to-PDF

#### Configuration System
- **CLI Arguments**: `--theme`, `--mode`, `--list-themes`, `--save-config`
- **Config Files**: `.slideshrc` (JSON), sidecar files (`presentation.slidesh.json`)
- **Precedence**: CLI args > sidecar > .slideshrc > defaults
- **Custom Parser**: No external CLI dependencies

#### Navigation
- **CLI**: Arrow keys, optional vim keys (h/j/k/l), q to quit
- **Web**: Arrow keys, click, URL-based slide indexing

#### Cross-Platform Support
- **Entry Points**: Windows (.bat), Unix/Bash (.sh), Zsh (.zsh)
- **Installation Helper**: Automatic PATH setup (`install.sh`)
- **Supported Platforms**: Windows, macOS, Linux
- **Terminal Compatibility**: WezTerm, Alacritty, Kitty, Windows Terminal, iTerm2

#### Code Quality
- **TypeScript**: Strict mode enabled, zero errors
- **Build**: All packages compile successfully (~5 seconds)
- **Web Bundle**: 144.86 KB (46.59 KB gzipped)
- **Documentation**: Comprehensive README, CHANGELOG, VERSIONING guides

### Changed

- Refactored CLI entry point with custom argument parser
- Enhanced project structure: separate packages for parser, themes, renderers
- Improved error messages with clear, actionable guidance
- Added comprehensive metadata to package.json

### Fixed

- **Path Resolution Bug** (#1): PDF/Browser modes now work when run from different directories
  - Enhanced project root detection (searches from file directory upward)
  - Proper handling of relative and absolute file paths
  - Executes child processes with correct working directory context

### Security

- MIT License applied
- No security vulnerabilities identified
- No unvetted external CLI dependencies

### Known Issues

- PDF export generates HTML (requires browser print-to-PDF or external tools)
- Browser mode uses `file://` URLs (HTTP server recommended for full compatibility)
- WezTerm theme fetching requires network access (local cache available after first fetch)
- Terminal support optimized for modern emulators (degrades gracefully on basic ones)

### Technical Details

**Packages**:
- `@slidesh/themes@0.1.0` - 1.5 KB
- `@slidesh/parser@0.1.0` - 2.1 KB
- `@slidesh/renderer-cli@0.1.0` - 3.2 KB
- `@slidesh/renderer-web@0.1.0` - 4.8 KB
- `@slidesh/cli@0.1.0` - 2.9 KB
- `slidesh-web@0.1.0` - 144.86 KB (46.59 KB gzipped)

**Build Stats**:
- TypeScript strict mode: ✅ 0 errors
- Build time: ~5 seconds
- Source files: 73 tracked
- Git commits: 3

### Dependencies

**Runtime**:
- TypeScript ^5.3.3
- React 18+ (web only)
- chalk (ANSI colors)
- remark (Markdown parsing)
- Vite 5+ (web build)
- Node.js >=18.0.0

**Development**:
- @types/node ^20.10.0
- TypeScript ^5.3.3

### Testing

Manual testing completed:
- ✅ CLI navigation (arrow keys, exit)
- ✅ Web server startup and navigation
- ✅ Theme selection and application
- ✅ PDF HTML generation
- ✅ Cross-platform entry points

Automated test suite planned for v1.0.0.

---

## How to Report Issues

Report bugs and feature requests at: https://github.com/Rumbleaxe/slidesh/issues

## How to Contribute

See `.reports/AGENTS.md` for architecture and design guidelines.

---

**Last Updated**: 2026-02-26  
**Current Version**: 0.1.0  
**Repository**: https://github.com/Rumbleaxe/slidesh
