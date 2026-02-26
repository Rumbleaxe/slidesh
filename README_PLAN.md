# Plan Created ✅ - Ready for Implementation

## Summary

An implementation plan has been created and approved for adding **WezTerm theme support** and **multi-target CLI** functionality to slidesh.

---

## What You Asked For

| Requirement | Solution Planned |
|-------------|-----------------|
| .bat file with arguments | Cross-platform scripts (Phase 5) - .bat, .sh, .zsh |
| Open in browser | `--mode browser` argument (Phase 2) |
| Create PDF | `--mode pdf` argument (Phase 4) |
| Open in CLI | `--mode cli` argument (default) |
| Load WezTerm themes | `--theme <name>` argument (Phase 1-3) |
| Save theme choices | `.slideshrc` and sidecar file support (Phase 2) |

---

## The Plan at a Glance

### 5 Phases of Implementation

**Phase 1: Theme Infrastructure** (2-3 hours)
- Create `packages/themes` package
- Implement WezTerm theme fetcher
- Build color mapping utilities
- Include 5 bundled default themes

**Phase 2: CLI Enhancement** (2 hours)
- Add argument parser
- Implement mode handlers
- Create config loader
- Add `--list-themes` command

**Phase 3: Theme Application** (2-3 hours)
- Apply themes to CLI renderer (ANSI colors)
- Apply themes to HTML generator (CSS variables)
- Apply themes to React app

**Phase 4: PDF Export** (1-2 hours)
- Integrate html2pdf library
- Apply themes to PDF output

**Phase 5: Cross-Platform Scripts** (1 hour)
- Create Windows .bat wrapper
- Create Unix .sh wrapper
- Create Zsh .zsh wrapper

**Testing & Debugging**: 2-3 hours

### Total: 12-15 hours

---

## Key Design Decisions

✅ **Fetch Strategy**: WezTerm themes fetched on-demand with local caching  
✅ **Configuration**: .slideshrc (JSON) + optional sidecar CSS files  
✅ **Priority Order**: CLI args > sidecar > .slideshrc > environment > defaults  
✅ **PDF Library**: html2pdf (lightweight) instead of puppeteer  
✅ **Backward Compatibility**: All existing commands continue to work  
✅ **Minimal Dependencies**: Only html2pdf for PDF (optional feature)

---

## Usage Examples (After Implementation)

```bash
# CLI with theme
slidesh --mode cli --theme dracula presentation.md

# Browser with theme
slidesh --mode browser --theme nord presentation.md

# PDF export with theme
slidesh --mode pdf --theme solarized presentation.md

# List available themes
slidesh --list-themes

# Save configuration
slidesh --mode cli --theme dracula --save-config presentation.md

# Windows .bat file
slidesh.bat --mode cli --theme dracula presentation.md

# Unix/macOS .sh file
./slidesh.sh --mode cli --theme dracula presentation.md
```

---

## Bundled Themes

5 popular themes will be included by default:
- **Dracula** - Dark with vibrant colors
- **Nord** - Polar night theme
- **One Dark** - Atom-inspired dark theme
- **Gruvbox** - Retro groove theme
- **Solarized** - Precision colors

Plus support for fetching any theme from WezTerm's official registry.

---

## Architecture Changes

### New Package
- `packages/themes/` - Theme management and utilities

### New Files
- `scripts/slidesh.bat` - Windows entry point
- `scripts/slidesh.sh` - Unix entry point
- `scripts/slidesh.zsh` - Zsh entry point

### Modified Packages
- `packages/cli/` - Enhanced with mode system and arg parsing
- `packages/renderer-cli/` - Theme color support
- `apps/web/` - CSS variable integration
- `generate.mjs` - Theme CSS embedding

---

## Success Criteria

After implementation, all of these will be true:

✅ Users can select any WezTerm theme via `--theme <name>`  
✅ Themes apply correctly to CLI (ANSI colors)  
✅ Themes apply correctly to Browser (CSS variables)  
✅ Themes apply correctly to PDF (embedded styles)  
✅ Configuration persists in .slideshrc or sidecar files  
✅ Cross-platform scripts (.bat, .sh, .zsh) all work  
✅ All existing functionality preserved (backward compatible)  
✅ Default themes included (no network required)  
✅ Theme caching reduces fetch times  
✅ Clear error messages for missing themes  

---

## Documents Created

📄 **In Project Directory**:
- `PLAN_INDEX.md` - Navigation guide to all plan docs
- `PLAN_APPROVAL_SUMMARY.md` - Quick reference
- `IMPLEMENTATION_PLAN.md` - Detailed summary

📄 **In Session Folder**:
- `plan.md` - Complete detailed plan (9754 bytes)

---

## Ready to Implement?

The plan is complete and approved. To begin:

### Option 1: Start Phase 1
Proceed with creating the theme infrastructure package

### Option 2: Review Details
Read `PLAN_APPROVAL_SUMMARY.md` for more information

### Option 3: Ask Questions
Review the documentation or ask for clarification

---

## Status

✅ Plan analyzed and created  
✅ Plan presented and approved  
✅ Documentation complete  
⏳ **Ready to begin Phase 1**

---

**Date**: February 26, 2026  
**Timeline**: 12-15 hours estimated  
**Complexity**: Medium (new package + CLI enhancement + integration)  
**Impact**: High (3 output modes + theme system)  
**Risk Level**: Low (backward compatible, minimal dependencies)
