# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned for v1.0.0
- Custom theme creator UI
- npm package publishing
- Comprehensive test suite
- Expanded documentation
- Additional bundled themes

---

## [0.1.0] - 2026-02-26

### Added

#### Core Features
- **Theme System**: Complete theme infrastructure with @slidesh/themes package
  - 5 bundled default themes: Dracula, Nord, One Dark, Gruvbox, Solarized
  - WezTerm color scheme fetcher with local caching
  - Hex to ANSI256/ANSI16 color conversion
  - Theme parser for external color schemes

- **Multiple Output Modes**:
  - CLI mode: Terminal presentation with ANSI theme colors
  - Browser mode: Opens HTML presentation in default browser
  - PDF mode: Generates themed HTML ready for print-to-PDF

- **Configuration System**:
  - .slideshrc JSON config file support
  - Sidecar file support (presentation.slidesh.json)
  - CLI argument override (--theme, --mode, --save-config)
  - Configuration precedence: CLI args > sidecar > .slideshrc > defaults

- **CLI Enhancements**:
  - Custom argument parser (no external CLI dependencies)
  - --mode <cli|browser|pdf> flag
  - --theme <name> flag with theme selection
  - --list-themes command to display available themes
  - --save-config flag to persist settings

- **Theme Application**:
  - HTML generator with CSS theme variables
  - React web app with CSS variable support
  - CLI renderer with ANSI color application
  - Dynamic theme injection in HTML output

- **Cross-Platform Support**:
  - Windows batch script entry point (slidesh.bat)
  - Unix/Bash shell script entry point (slidesh.sh)
  - Zsh shell script with enhanced features (slidesh.zsh)
  - Installation helper script (install.sh)
  - Automatic PATH setup for easy command-line access

#### Code Quality
- TypeScript strict mode enabled
- Full type definitions for all interfaces
- No external CLI dependencies
- Modular architecture (separate packages)
- Proper error handling and validation

#### Documentation
- Comprehensive README with examples
- FINAL_REPORT.md with implementation details
- BUG_FIX_REPORT.md documenting path resolution fix
- scripts/README.md with usage documentation
- VERSIONING.md with version strategy
- CHANGELOG.md (this file)

### Changed

- Refactored CLI entry point for argument parsing
- Enhanced project structure with themes package
- Improved error messages with clear instructions
- Added comprehensive metadata to package.json

### Fixed

- **Path Resolution Bug**: Fixed PDF/Browser modes failing when run from different directories
  - Enhanced project root detection
  - Search from both current directory and file directory
  - Works with relative and absolute file paths

### Security

- MIT License applied to all code
- No security vulnerabilities identified
- No unvetted external dependencies for core CLI

### Technical Details

#### Packages Created
- `@slidesh/themes@0.1.0` - Theme system and color utilities
- `@slidesh/parser@0.1.0` - Markdown parser
- `@slidesh/renderer-cli@0.1.0` - Terminal renderer
- `@slidesh/renderer-web@0.1.0` - React web renderer
- `@slidesh/cli@0.1.0` - CLI entry point with modes

#### Build Output
- TypeScript errors: 0 (strict mode)
- Build time: ~5 seconds
- Web bundle: 144.86 KB (46.59 KB gzipped)
- All packages compile successfully

### Known Issues

- **PDF Export**: Generates HTML requiring external tools (html2pdf, wkhtmltopdf) or browser print-to-PDF
- **Browser Mode**: Uses file:// URLs; HTTP server recommended for full compatibility
- **WezTerm Fetcher**: Requires network access for on-demand theme fetching (local cache available)
- **Terminal Support**: Optimized for modern terminals (WezTerm, iTerm2, GNOME Terminal); degrades gracefully on basic terminals

### Dependencies

**New**
- (None - uses only existing dependencies)

**Existing**
- TypeScript ^5.3.3
- React (for web app)
- chalk (for ANSI colors)
- remark (for Markdown parsing)
- Vite (for web build)
- Node.js >=18.0.0

### Migration Guide

N/A - Initial release. No migration needed.

### Contributors

- slidesh Contributors (Initial implementation)

---

## [Unreleased - Future Versions]

### Planned for v0.2.0
- Additional bundled themes
- Theme customization options
- Enhanced configuration UI

### Planned for v1.0.0
- Stable CLI API guarantee
- npm package publishing
- Full test suite
- Plugin system foundation

### Planned for v1.1.0
- Custom theme creator
- Theme marketplace
- Direct PDF export via Puppeteer
- Animations and transitions

### Planned for v2.0.0
- Plugin system
- Presenter mode with speaker notes
- Live JSX blocks
- Export formats (PowerPoint, Google Slides)

---

## How to Report Issues

Please report bugs and feature requests at:
https://github.com/YOUR_USERNAME/slidesh/issues

## How to Contribute

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

**Last Updated**: February 26, 2026  
**Maintainer**: slidesh Contributors
