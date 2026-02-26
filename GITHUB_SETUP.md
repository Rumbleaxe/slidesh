# GitHub Publishing Guide

## Quick Start

This guide walks you through publishing slidesh to GitHub.

---

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository with these settings:

   - **Repository name**: `slidesh`
   - **Description**: `Write once. Present anywhere. Markdown to Web + CLI + PDF.`
   - **Visibility**: Public
   - **Initialize repository**: NO (we already have git history)
   - **License**: MIT (already added locally)
   - **Gitignore**: Node (already configured)

3. Click "Create repository"

---

## Step 2: Add Remote and Push

After creating the repository, GitHub will show commands. Use these (replace USERNAME):

```bash
# Add GitHub as remote
git remote add origin https://github.com/USERNAME/slidesh.git

# Rename default branch to main (if needed)
git branch -M main

# Push all commits
git push -u origin main

# Push all tags
git push origin --tags
```

---

## Step 3: Verify Push

Check that files are visible on GitHub:
- Repository should show 71 files
- LICENSE file should display
- README.md should be featured
- Tags section should show v0.1.0

---

## Step 4: Configure GitHub Settings

### Repository Settings
1. Go to Settings → General
   - Set default branch to `main`
   - Enable "Always suggest updating pull request branches"

2. Settings → Code security & analysis
   - Enable "Dependabot alerts"
   - Enable "Dependabot security updates"

3. Settings → Branches
   - Add branch protection rule for `main`
   - Require pull request reviews

### Repository Topics
Add topics in repository details (right sidebar):
- `presentation`
- `markdown`
- `cli`
- `terminal`
- `theme`
- `typescript`
- `dual-runtime`

---

## Step 5: Create Release on GitHub

1. Go to Releases → Draft a new release
2. Select tag: `v0.1.0`
3. Release title: `v0.1.0 - Initial Release`
4. Use this description:

```markdown
# v0.1.0 - Initial Release

Write once. Present anywhere.

## What's New

### 🎨 Complete Theme System
- 5 bundled themes: Dracula, Nord, One Dark, Gruvbox, Solarized
- WezTerm theme fetcher with local caching
- Dynamic theme application to all output targets

### 🎯 Multiple Output Modes
- **CLI**: Terminal presentation with ANSI theme colors
- **Browser**: Opens HTML in default browser
- **PDF**: Generates themed HTML for print-to-PDF

### ⚙️ Configuration System
- `.slideshrc` JSON config file support
- Sidecar file support (presentation.slidesh.json)
- CLI argument override (--theme, --mode, --save-config)
- Flexible precedence: CLI > sidecar > .slideshrc > defaults

### 🔧 Cross-Platform Support
- Windows batch script (`slidesh.bat`)
- Unix/Bash shell script (`slidesh.sh`)
- Zsh shell script with enhancements (`slidesh.zsh`)
- Automatic PATH installation

### 📚 Features
- `--mode <cli|browser|pdf>` - Output mode selection
- `--theme <name>` - Theme selection
- `--list-themes` - Display available themes
- `--save-config` - Persist configuration
- Interactive CLI with arrow key navigation

### ✅ Quality
- TypeScript strict mode (0 errors)
- Full type definitions
- No external CLI dependencies
- MIT License
- Comprehensive documentation

## Installation

```bash
# Clone repository
git clone https://github.com/USERNAME/slidesh.git
cd slidesh

# Install dependencies
npm install

# Build all packages
npm run build

# Try CLI
node packages/cli/dist/index.js --list-themes
```

## Usage

```bash
# Terminal presentation
slidesh presentation.md

# With theme
slidesh --theme nord presentation.md

# Browser mode
slidesh --mode browser presentation.md

# PDF generation
slidesh --mode pdf presentation.md

# List themes
slidesh --list-themes
```

## Documentation

- [README.md](./README.md) - Main documentation
- [FINAL_REPORT.md](./FINAL_REPORT.md) - Implementation details
- [VERSIONING.md](./VERSIONING.md) - Version strategy
- [CHANGELOG.md](./CHANGELOG.md) - Version history

## Known Issues

- PDF export requires external tools (html2pdf, wkhtmltopdf) or browser print
- Browser mode uses file:// URLs (HTTP server recommended)
- WezTerm fetching requires network access

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - See [LICENSE](./LICENSE) file

---

Made with ❤️ by the slidesh community
```

5. Attach `presentation.html` as a release asset (optional)
6. Check "This is a pre-release" (uncheck to mark as stable)
7. Click "Publish release"

---

## Step 6: Create GitHub Pages (Optional)

To host documentation and demos:

1. Go to Settings → Pages
2. Choose:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /docs (or root)
3. Wait for deployment to complete

Then create a docs site in `/docs` folder with:
- `index.html` - Landing page
- `getting-started.md` - Quick start
- `api.md` - API documentation
- `themes.md` - Theme documentation

---

## Step 7: Add GitHub Badges to README

Update `README.md` with badges:

```markdown
[![GitHub Release](https://img.shields.io/github/v/release/USERNAME/slidesh?style=flat-square)](https://github.com/USERNAME/slidesh/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=flat-square)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-brightgreen?style=flat-square)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?style=flat-square)](https://www.typescriptlang.org/)
```

---

## Step 8: Set Up Branch Protection

1. Settings → Branches → Add rule
2. Branch name pattern: `main`
3. Enable:
   - Require pull request reviews
   - Require status checks to pass
   - Require branches to be up to date
   - Include administrators

---

## Step 9: Set Up GitHub Actions (Future)

When ready to add CI/CD:

1. Create `.github/workflows/build.yml`
2. Configure:
   - Run tests on push/PR
   - Build all packages
   - Upload coverage reports
   - Release automation

Example workflow:
```yaml
name: Build & Test
on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
```

---

## Step 10: Create CONTRIBUTING.md

Create contributor guidelines:

```markdown
# Contributing to slidesh

## Development Setup

```bash
git clone https://github.com/USERNAME/slidesh.git
cd slidesh
npm install
npm run build
```

## Making Changes

1. Fork repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m "Add amazing feature"`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## Code Standards

- TypeScript strict mode
- ESLint compliance
- Test coverage required
- Documentation updates

## Reporting Issues

Use issue templates for:
- Bug reports
- Feature requests
- Documentation improvements
```

---

## Troubleshooting

### Push Rejected
```bash
# If you get "rejected" error, check remote:
git remote -v

# If URL is wrong, update it:
git remote set-url origin https://github.com/USERNAME/slidesh.git
```

### Authentication Failed
```bash
# Use personal access token instead:
git remote set-url origin https://USERNAME:TOKEN@github.com/USERNAME/slidesh.git

# Or use SSH:
git remote set-url origin git@github.com:USERNAME/slidesh.git
```

### Large Files
If `.git` is too large, create `.gitattributes`:
```
*.md filter=lfs diff=lfs merge=lfs -text
*.html filter=lfs diff=lfs merge=lfs -text
```

---

## After Publishing

### Monitor
1. Watch for issues and discussions
2. Check GitHub insights for usage patterns
3. Monitor security alerts from Dependabot

### Promote
1. Add links to Twitter, blog, etc.
2. Submit to awesome-list repositories
3. Announce in relevant communities
4. Write blog post about release

### Maintain
1. Regular dependency updates
2. Security patches promptly
3. Respond to issues and PRs
4. Plan next version roadmap

---

## Package Management (Future)

When ready for npm publishing:

```bash
# Login to npm
npm login

# Update version
npm version minor

# Build
npm run build

# Publish
npm publish --access public

# Push git changes
git push origin main
git push origin --tags
```

---

## Quick Reference

| Task | Command |
|------|---------|
| Add remote | `git remote add origin <url>` |
| Push commits | `git push -u origin main` |
| Push tags | `git push origin --tags` |
| Create tag | `git tag -a v0.1.0 -m "message"` |
| List tags | `git tag -l` |
| Delete tag | `git tag -d v0.1.0` |

---

## Contact & Support

- Issues: https://github.com/USERNAME/slidesh/issues
- Discussions: https://github.com/USERNAME/slidesh/discussions
- Email: dev@slidesh.local

---

**Last Updated**: February 26, 2026  
**Status**: Ready for GitHub Publishing
