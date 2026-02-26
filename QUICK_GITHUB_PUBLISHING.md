# Quick Start: Publish slidesh to GitHub

## 🚀 Three Simple Steps (7-20 minutes)

### Step 1: Create GitHub Repository (2 minutes)

1. Open https://github.com/new
2. Fill in:
   - **Repository name**: `slidesh`
   - **Description**: `Write once. Present anywhere. Markdown to Web + CLI + PDF.`
   - **Visibility**: Public
3. **IMPORTANT**: Do NOT initialize with README, license, or gitignore
4. Click "Create repository"
5. GitHub will show you the next commands ✅

---

### Step 2: Push to GitHub (2 minutes)

Replace `YOUR_USERNAME` with your GitHub username, then run:

```bash
cd C:\Users\User\Projects\slidesh

# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/slidesh.git

# Rename default branch to main
git branch -M main

# Push all commits
git push -u origin main

# Push all tags
git push origin --tags
```

**Expected Output**:
```
Enumerating objects: ...
Counting objects: ...
Compressing objects: ...
Writing objects: ...
Total ...
To https://github.com/YOUR_USERNAME/slidesh.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

✅ Done! Check GitHub - all files should now appear.

---

### Step 3: Create Release (3 minutes)

1. Go to your GitHub repository: https://github.com/YOUR_USERNAME/slidesh
2. Click "Releases" (right side of page)
3. Click "Draft a new release"
4. Select tag: `v0.1.0`
5. Release title: `v0.1.0 - Initial Release`
6. Copy this description:

```
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
- Sidecar file support
- CLI argument override
- Flexible configuration precedence

### 🔧 Cross-Platform Support
- Windows batch script (`slidesh.bat`)
- Unix/Bash shell script (`slidesh.sh`)
- Zsh shell script (`slidesh.zsh`)
- Automatic PATH installation

### 📚 Features
- `--mode cli|browser|pdf` for output selection
- `--theme <name>` for theme selection
- `--list-themes` to display available themes
- `--save-config` to persist configuration
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
git clone https://github.com/YOUR_USERNAME/slidesh.git
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
- [VERSIONING.md](./VERSIONING.md) - Version strategy
- [CHANGELOG.md](./CHANGELOG.md) - Version history

## License

MIT License - See [LICENSE](./LICENSE)
```

7. Click "Publish release"

✅ Done! Your first release is live.

---

## Verification Checklist

After completing all steps, verify:

```bash
# Check that everything is pushed
git remote -v
# Should show: origin    https://github.com/YOUR_USERNAME/slidesh.git

git branch -a
# Should show: * main, remotes/origin/main

git tag -l
# Should show: v0.1.0

# Verify on GitHub
# 1. Visit https://github.com/YOUR_USERNAME/slidesh
# 2. Should see "main" branch indicator
# 3. Should see 73 files
# 4. README.md should display
# 5. LICENSE file should be visible
# 6. Go to Releases tab - should see v0.1.0
```

---

## Troubleshooting

### Error: "fatal: remote origin already exists"
```bash
# Remove the existing remote first
git remote remove origin
# Then run the add command again
git remote add origin https://github.com/YOUR_USERNAME/slidesh.git
```

### Error: "Authentication failed"
Use a personal access token instead of password:
1. Go to GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token with `repo` scope
3. Copy token
4. When prompted for password, paste token instead

Or use SSH:
```bash
git remote set-url origin git@github.com:YOUR_USERNAME/slidesh.git
```

### Push seems stuck
```bash
# Try with more verbosity
git push -u origin main -v

# Or check your internet connection and GitHub status
```

### Files not showing on GitHub
Wait 30-60 seconds for GitHub to process.
Then refresh the page (Ctrl+Shift+R for hard refresh).

---

## After Publishing

### Recommended Next Steps

1. **Configure Repository** (5 min)
   - Go to Settings → General
   - Add repository topics: presentation, markdown, cli, terminal, theme
   - Enable Dependabot

2. **Set Up Branch Protection** (2 min)
   - Settings → Branches
   - Add protection rule for `main`
   - Require pull request reviews

3. **Add GitHub Pages** (5 min)
   - Settings → Pages
   - Deploy from branch → main
   - Create docs/index.html with landing page

4. **Create CONTRIBUTING.md** (10 min)
   - Add contributing guidelines
   - Add code of conduct
   - Add development setup instructions

---

## Version for npm (Future)

When ready to publish to npm (v1.0.0 or later):

```bash
# Build
npm run build

# Login to npm
npm login

# Update version
npm version minor

# Publish
npm publish --access public

# Push changes
git push origin main --tags
```

---

## Quick Command Reference

```bash
# View status
git status
git log --oneline
git tag -l

# Add remote
git remote add origin <url>

# Push everything
git push -u origin main
git push origin --tags

# Verify
git remote -v
git branch -a
```

---

## Support

- **GitHub Publishing Help**: See `GITHUB_SETUP.md` for detailed guide
- **Version Strategy**: See `VERSIONING.md` for complete version plan
- **Version History**: See `CHANGELOG.md` for all versions
- **Setup Summary**: See `GIT_AND_VERSIONING_SETUP.md` for setup details

---

## Summary

✅ **Git repository is ready**  
✅ **2 commits are staged**  
✅ **Version tag v0.1.0 created**  
✅ **MIT License included**  
✅ **All documentation complete**  

**Now publish to GitHub in 3 simple steps above!**

---

**Setup Date**: February 26, 2026  
**Current Version**: 0.1.0  
**Status**: Ready for Publishing  
**Estimated Publishing Time**: 7-20 minutes
