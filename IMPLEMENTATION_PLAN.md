# Implementation Plan Approved ✅

## What Was Planned

A comprehensive theme system for slidesh with:

1. **WezTerm Theme Support**
   - Fetch color schemes from WezTerm's official registry
   - Cache themes locally for performance
   - Include 5 popular defaults (Dracula, Nord, One Dark, Gruvbox, Solarized)

2. **Three Output Modes**
   - `--mode cli` - Interactive terminal presentation with theme colors
   - `--mode browser` - Web presentation with theme-based CSS
   - `--mode pdf` - PDF export with theme applied

3. **Theme Selection & Persistence**
   - Select theme via `--theme <name>` CLI argument
   - Save config to `.slideshrc` (JSON) or sidecar files (`.slidesh.css`)
   - Configuration hierarchy: CLI args > sidecar > .slideshrc > defaults

4. **Cross-Platform Entry Points**
   - **Windows**: `slidesh.bat` wrapper
   - **macOS/Linux**: `slidesh.sh` wrapper
   - **Zsh**: `slidesh.zsh` with extra features

## Architecture Summary

### New Package: `packages/themes`
- Theme fetcher (WezTerm integration)
- Theme parser (JSON → CLI/Web formats)
- Color mapping (Hex → ANSI codes)
- Bundled defaults

### Enhanced CLI (`packages/cli`)
- Argument parsing for modes and themes
- Config file loading
- Mode handlers (cli/browser/pdf)

### Theme Integration
- CLIRenderer: Accept theme colors, apply via chalk
- HTML generator: Embed CSS variables
- React app: Apply theme colors dynamically

## Command Examples

```bash
# CLI with Dracula theme
slidesh --mode cli --theme dracula presentation.md

# Browser with Nord theme
slidesh --mode browser --theme nord presentation.md

# PDF export with Solarized theme
slidesh --mode pdf --theme solarized presentation.md

# List available themes
slidesh --list-themes

# Save configuration
slidesh --mode cli --theme dracula --save-config presentation.md
```

## Implementation Phases

| Phase | Focus | Duration |
|-------|-------|----------|
| 1 | Theme Infrastructure | 2-3 hours |
| 2 | CLI Enhancement | 2 hours |
| 3 | Theme Application | 2-3 hours |
| 5 | Cross-Platform Scripts | 1 hour |
| 4 | PDF Export | 1-2 hours |
| — | Testing & Debugging | 2-3 hours |
| **Total** | **~12-15 hours** | — |

## Next Steps

Ready to implement when you give the go-ahead. The plan includes:

✅ Detailed architecture design
✅ File structure and organization
✅ Implementation order optimized for dependencies
✅ Dependency analysis (minimal new packages)
✅ Testing strategy
✅ Success criteria
✅ Risk mitigation strategies

## To Get Started

Say "start implementation" or ask for modifications to the plan before proceeding.

---

**Plan File**: `~/.copilot/session-state/[session-id]/plan.md`  
**Status**: ✅ APPROVED AND READY
