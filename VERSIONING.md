# Versioning Strategy

slidesh follows **Semantic Versioning 2.0.0** ([semver.org](https://semver.org/))

## Version Format: `MAJOR.MINOR.PATCH`

- **MAJOR** (X.0.0): Breaking changes to CLI or API
- **MINOR** (0.X.0): New features, backward compatible  
- **PATCH** (0.0.X): Bug fixes only

## Current Release: v0.1.0 (2026-02-26)

Initial public release with complete theme system, multi-mode rendering, and cross-platform support.

**Status**: Stable and production-ready

**Packages**:
- `@slidesh/parser@0.1.0`
- `@slidesh/themes@0.1.0`
- `@slidesh/renderer-cli@0.1.0`
- `@slidesh/renderer-web@0.1.0`
- `@slidesh/cli@0.1.0`
- `slidesh-web@0.1.0`

---

## Release Process

### Before Release

1. Update version in root `package.json`
2. Update version in all `packages/*/package.json` and `apps/*/package.json`
3. Run `pnpm build` — ensure all packages compile
4. Update `CHANGELOG.md`
5. Run tests (when test suite is complete)

### During Release

1. Create git tag: `git tag vX.Y.Z`
2. Push tag: `git push origin vX.Y.Z`
3. Create GitHub Release with changelog
4. Publish to npm: `npm publish` (when ready)

---

## Branching Strategy

- `main` — Stable releases only
- `develop` — Integration branch
- `feature/*` — Feature branches
- `bugfix/*` — Bug fix branches

---

## Pre-release Versions

- **Alpha**: `0.1.0-alpha.1` — Unstable, early testing
- **Beta**: `0.1.0-beta.1` — Feature-complete, testing phase  
- **RC**: `0.1.0-rc.1` — Ready for release

All pre-releases published to npm with `next` tag.

---

## Long-term Roadmap

| Version | Target | Focus |
|---------|--------|-------|
| **v0.1.0** | ✅ Complete | Theme system, multi-mode rendering |
| **v0.2.0** | Planned | Additional themes, enhanced config |
| **v1.0.0** | Q2 2026 | Stable API, npm publishing, full test suite |
| **v1.1.0** | Q3 2026 | Custom theme creator, PDF export |
| **v2.0.0** | Q4 2026 | Plugin system, presenter mode, live JSX |

---

## Requirements

- **Node.js**: >=18.0.0 (minimum)
- **TypeScript**: ^5.3.3
- **pnpm**: >=8.15.0

---

## Deprecation Policy

When removing features:

1. **Announce** in release notes + CHANGELOG
2. **Deprecate** in v(X+1).0.0 with warnings
3. **Remove** in v(X+2).0.0

---

## Publishing to npm

When packages are ready for npm:

```bash
pnpm build
npm publish --access public
```

**Note**: As of v0.1.0, packages are not yet on npm. First npm release planned for v1.0.0.

---

## Support & Questions

- **Issues**: [GitHub Issues](https://github.com/Rumbleaxe/slidesh/issues)
- **Releases**: [GitHub Releases](https://github.com/Rumbleaxe/slidesh/releases)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md)
