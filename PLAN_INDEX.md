# Plan Implementation Index

## Quick Navigation

### 📄 Plan Documents (Read in Order)

1. **PLAN_APPROVAL_SUMMARY.md** ⭐ START HERE
   - Quick overview of what was planned
   - Usage examples
   - Success criteria
   - Next steps

2. **IMPLEMENTATION_PLAN.md**
   - Comprehensive plan summary
   - Feature breakdown
   - Implementation phases
   - Timeline estimate

3. **plan.md** (in session folder)
   - Complete detailed plan (9754 bytes)
   - Full architecture design
   - File structure
   - Technical specifications

---

## The Plan at a Glance

### What Was Requested
- ✅ .bat file with arguments (Windows entry point)
- ✅ Multiple output modes (CLI, Browser, PDF)
- ✅ WezTerm theme support with `--theme` argument
- ✅ Theme persistence (.slideshrc, sidecar files)
- ✅ Cross-platform scripts (zsh equivalent for Unix)

### What Was Planned
A 5-phase implementation to deliver:

**Phase 1**: Theme Infrastructure (packages/themes)
- WezTerm theme fetcher
- Theme parser (JSON → CLI/Web formats)
- 5 bundled default themes
- Color mapping (hex → ANSI)

**Phase 2**: CLI Enhancement
- Argument parser for modes and themes
- Config file loading
- Mode handlers (cli/browser/pdf)

**Phase 3**: Theme Integration
- Apply colors to CLIRenderer
- Apply CSS to HTML generator
- Apply theme to React app

**Phase 4**: PDF Export (Optional)
- html2pdf integration
- Theme colors in PDF output

**Phase 5**: Cross-Platform Scripts
- Windows: slidesh.bat
- Unix: slidesh.sh
- Zsh: slidesh.zsh with extras

### Total Effort: 12-15 hours

---

## Command Examples (After Implementation)

```bash
# CLI presentation with theme
slidesh --mode cli --theme dracula presentation.md

# Browser with theme
slidesh --mode browser --theme nord presentation.md

# PDF with theme
slidesh --mode pdf --theme solarized presentation.md

# List available themes
slidesh --list-themes

# Save configuration
slidesh --mode cli --theme dracula --save-config presentation.md

# Use sidecar config (auto-detected)
slidesh presentation.md
# Automatically loads: presentation.slidesh.css (if exists)
```

---

## Success Criteria

After implementation:

- [x] Users can select WezTerm themes via `--theme <name>`
- [x] Themes apply to CLI (ANSI colors)
- [x] Themes apply to Browser (CSS variables)
- [x] Themes apply to PDF (embedded styles)
- [x] Configuration persists in .slideshrc or sidecar files
- [x] Cross-platform entry points work (.bat, .sh, .zsh)
- [x] All existing functionality preserved
- [x] Default themes included
- [x] Theme caching reduces fetches
- [x] Clear error messages

---

## Key Design Decisions

1. **Fetch Strategy**: WezTerm themes fetched on-demand with local caching
2. **Config Format**: JSON (.slideshrc) + optional sidecar CSS files
3. **Priority Order**: CLI args > sidecar files > .slideshrc > defaults
4. **PDF Library**: html2pdf (lightweight, ~200KB) instead of puppeteer
5. **Bundled Themes**: 5 popular defaults (Dracula, Nord, One Dark, Gruvbox, Solarized)

---

## Architecture Changes

### New Files
- `packages/themes/` - New theme management package
- `scripts/slidesh.bat` - Windows entry point
- `scripts/slidesh.sh` - Unix entry point
- `scripts/slidesh.zsh` - Zsh entry point

### Modified Files
- `packages/cli/src/index.ts` - Add argument parsing
- `packages/cli/src/modes.ts` - New file for mode handlers
- `packages/cli/src/config.ts` - New file for config loading
- `packages/renderer-cli/src/index.ts` - Theme color support
- `apps/web/src/App.tsx` - CSS variable integration
- `generate.mjs` - Theme CSS embedding

### No Breaking Changes
- Existing commands continue to work
- Default behavior (CLI mode) unchanged
- Backward compatible with current codebase

---

## Dependencies

### New Additions (Optional)
- `html2pdf` (~200KB) - For PDF export
- Small CLI arg parser - Already using Node.js process.argv

### Existing (Already Have)
- `chalk` - For ANSI colors
- `typescript` - For development
- `react` - For web app

### Minimal Impact
- No large dependencies required
- Optional PDF feature doesn't block other work
- Easy to add/remove later

---

## Next Phase: Implementation

When ready to start:

### Phase 1 Checklist
- [ ] Create `packages/themes` directory structure
- [ ] Define Theme TypeScript interface
- [ ] Implement WezTerm fetcher with caching
- [ ] Create 5 bundled themes
- [ ] Add color mapping utilities
- [ ] Write tests for theme infrastructure

### Phase 2 Checklist
- [ ] Enhance CLI argument parsing
- [ ] Create config loader
- [ ] Implement mode handlers
- [ ] Add --list-themes command

### And so on...

---

## Status

✅ Plan created  
✅ Plan reviewed  
✅ Plan approved  
⏳ Ready for implementation

---

## Questions Before Starting?

Review these documents:
1. `PLAN_APPROVAL_SUMMARY.md` - For overview
2. `IMPLEMENTATION_PLAN.md` - For details
3. `plan.md` - For complete specifications

If you'd like to:
- **Start Phase 1**: Let me know and I'll begin creating the theme infrastructure
- **Modify the plan**: Share feedback and I'll update before implementation
- **Ask questions**: Check the plan documents or ask directly

---

**Plan Status**: ✅ APPROVED AND READY  
**Created**: February 26, 2026  
**Effort Estimate**: 12-15 hours  
**Complexity**: Medium (new package + CLI enhancement + integration)
