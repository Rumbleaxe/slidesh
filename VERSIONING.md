# Versioning Strategy for slidesh

## Version Numbering System

slidesh follows **Semantic Versioning 2.0.0** (https://semver.org/)

### Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (X.0.0): Breaking changes to CLI, theme system, or API
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, no new features

### Current Version: 0.1.0

This is the **initial public release** with full theme system implementation.

---

## Version History

### v0.1.0 (2026-02-26) - Initial Release
**Status**: Stable - Ready for Production

#### Features
- Complete theme system with 5 bundled themes
- Multi-target rendering (CLI, Browser, PDF)
- Cross-platform support (Windows, macOS, Linux)
- Configuration persistence (.slideshrc, sidecar files)
- Theme selection via --theme flag
- Mode selection via --mode flag
- WezTerm color scheme fetching + caching

#### Packages
- `@slidesh/parser@0.1.0` - Markdown parser
- `@slidesh/themes@0.1.0` - Theme system
- `@slidesh/renderer-cli@0.1.0` - Terminal renderer
- `@slidesh/renderer-web@0.1.0` - React web renderer
- `@slidesh/cli@0.1.0` - CLI entry point
- `slidesh-web@0.1.0` - Web application

#### Breaking Changes
None (initial release)

#### Known Issues
- PDF export requires external tools or browser print-to-PDF
- Browser mode uses file:// URLs (HTTP server recommended)
- WezTerm theme fetching requires network access

#### Migration Path
N/A - First release

---

## Versioning in Monorepo

### Root Package (slidesh-monorepo)
- Version: X.Y.Z
- Incremented for major releases with multiple package changes

### Individual Packages
Each package in `/packages` and `/apps` maintains its own version:
- `packages/themes/package.json` - @slidesh/themes version
- `packages/parser/package.json` - @slidesh/parser version
- `packages/cli/package.json` - @slidesh/cli version
- `packages/renderer-cli/package.json` - @slidesh/renderer-cli version
- `apps/web/package.json` - slidesh-web version

**Policy**: Keep all packages synchronized with root version for coherence.

---

## Release Process

### Before Release
1. Update version in `/package.json`
2. Update version in all `/packages/*/package.json`
3. Update version in all `/apps/*/package.json`
4. Run `npm run build` - ensure all packages compile
5. Run tests (when test suite is added)
6. Update CHANGELOG.md

### During Release
1. Create git tag: `git tag vX.Y.Z`
2. Push to GitHub: `git push origin vX.Y.Z`
3. Create GitHub Release with changelog
4. Publish to npm (when ready): `npm publish`

### Branching Strategy
- `main` - Stable releases
- `develop` - Integration branch
- `feature/*` - Feature branches
- `bugfix/*` - Bug fix branches

---

## Pre-release Versions

For pre-release and development versions:

### Alpha Releases
- Format: `0.1.0-alpha.1`, `0.1.0-alpha.2`
- Unstable, for early testing
- Published to npm with `next` tag

### Beta Releases
- Format: `0.1.0-beta.1`, `0.1.0-beta.2`
- Feature-complete, testing phase
- Published to npm with `next` tag

### Release Candidates
- Format: `0.1.0-rc.1`, `0.1.0-rc.2`
- Final testing before release
- Published to npm with `next` tag

---

## Publishing to npm

When packages are ready for npm publishing:

```bash
# Build all packages
npm run build

# Publish root monorepo (if needed)
npm publish --access public

# Or publish individual packages
npm --prefix packages/themes publish
npm --prefix packages/parser publish
npm --prefix packages/cli publish
```

**Note**: As of v0.1.0, packages are not published to npm. First npm release planned for v1.0.0.

---

## Version Constraints

### Node.js
- Minimum: Node.js 18.0.0
- Tested: Node.js 18 LTS, 20 LTS
- Recommended: Latest LTS

### TypeScript
- Minimum: TypeScript 5.0
- Current: 5.3.3
- Strict mode: Enabled

### npm/pnpm
- pnpm: >=8.15.0
- npm: >=10.0.0

---

## Deprecation Policy

When a feature needs to be removed:

1. **Announce** in release notes and CHANGELOG
2. **Deprecate** in v(X+1).0.0 with warnings
3. **Remove** in v(X+2).0.0

Example:
- v0.1.0: Feature added
- v1.0.0: Feature deprecated with warnings
- v2.0.0: Feature removed

---

## Changelog Format

Changes documented in `CHANGELOG.md`:

```markdown
## [0.1.0] - 2026-02-26

### Added
- Complete theme system with 5 bundled themes
- Multi-target rendering (CLI, Browser, PDF)

### Changed
- Improved project structure

### Fixed
- Fixed path resolution in PDF/Browser modes

### Removed
- Nothing in this release
```

Use format from: https://keepachangelog.com/

---

## Long-term Roadmap

### v1.0.0 (Target: Q2 2026)
- Stable CLI API
- npm package publishing
- Comprehensive documentation
- Full test suite
- Expanded theme library

### v1.1.0 (Target: Q3 2026)
- Custom theme creator
- Theme marketplace
- Direct PDF export (Puppeteer)
- Animations and transitions

### v2.0.0 (Target: Q4 2026)
- Plugin system
- Presenter mode with speaker notes
- Live JSX blocks
- PowerPoint/Google Slides export

---

## Version Badges

For README.md:

```markdown
[![NPM Version](https://img.shields.io/npm/v/slidesh)](https://www.npmjs.com/package/slidesh)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)
```

---

## Questions & Support

For version-related questions:
- Check [CHANGELOG.md](./CHANGELOG.md)
- See [GitHub Releases](https://github.com/YOUR_USERNAME/slidesh/releases)
- Open an issue: [Issues](https://github.com/YOUR_USERNAME/slidesh/issues)

---

**Last Updated**: February 26, 2026  
**Current Version**: 0.1.0  
**Status**: Ready for GitHub Publishing
