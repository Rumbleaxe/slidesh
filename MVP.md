# slidesh MVP

This is a minimal viable dual-runtime presentation engine.

## Features

✅ **Dual Runtime**
- Web: React + Vite (at `http://localhost:5173`)
- CLI: Node-based terminal presentation

✅ **Navigation**
- Arrow keys (left/right) in both environments
- "q" to quit in CLI

✅ **Markdown Parsing**
- Split slides by `---`
- Simple heading/paragraph/code rendering
- Automatic whitespace trimming

## Project Structure

```
/packages
  /parser           # parseSlides(markdown) → string[]
  /renderer-cli     # CLIRenderer class
  /cli              # CLI executable entrypoint
/apps
  /web              # React + Vite web app
/example.md         # 4-slide example presentation
```

## Quick Start

### Web Presentation

```bash
npm run dev:web
```

Opens http://localhost:5173/ with hot reload.
- Use arrow keys to navigate
- Slides load from `/apps/web/public/example.md`

### CLI Presentation

```bash
npm run dev:cli example.md
```

Or:

```bash
node packages/cli/dist/index.js example.md
```

Controls:
- `→` Arrow Right: Next slide
- `←` Arrow Left: Previous slide
- `q`: Quit

### Build All

```bash
npm run build
```

Compiles:
- TypeScript parser
- TypeScript CLI renderer
- TypeScript CLI entrypoint
- React + Vite web app

## Technologies

- **Language**: TypeScript (strict mode)
- **Web**: React 18 + Vite 5
- **CLI**: Node.js + chalk (ANSI colors)
- **Parsing**: Manual string splitting

## Implementation Notes

### Parser (`/packages/parser`)

- `parseSlides(markdown)` splits by `/^---$/m` regex
- Trims whitespace, filters empty leading/trailing slides
- Returns `string[]` of slide content

### Web Renderer (`/apps/web`)

- Loads `example.md` from `/public`
- Simple Markdown-like rendering (h1, h2, h3, p, code blocks)
- CSS Grid + Flexbox layout
- Arrow key navigation in `App.tsx`

### CLI Renderer (`/packages/renderer-cli`)

- `CLIRenderer` class wraps slide array
- Uses `readline.emitKeypressEvents()` for key capture
- `process.stdout.columns` for terminal width awareness
- Chalk for colors
- `console.clear()` between renders

### CLI Entrypoint (`/packages/cli`)

- Accepts `example.md` as argument
- Reads file synchronously
- Passes parsed slides to `CLIRenderer`
- Handles file not found errors

## Minimal Design

This MVP deliberately has:

- ✅ No plugins
- ✅ No theme system
- ✅ No directives
- ✅ No animations
- ✅ No interactive features
- ✅ No PDF export
- ✅ No persistence

Goal: Prove the dual-runtime compiler architecture works end-to-end.

## Next Steps (Not Implemented)

- Add theme/styling system
- Support custom directives (`::: layout`, `::: only web`, etc.)
- Improve Markdown parsing (lists, tables, etc.)
- Terminal width-aware layout
- Web animations and transitions
- PDF/HTML export
- Live code execution
- Plugin system

## Testing

Both runtimes were tested manually:

✅ CLI: Navigation (left/right arrows) and exit (q) working
✅ Web: Server starts at http://localhost:5173/

## Monorepo Setup

Uses npm workspaces (not pnpm, for portability).

Each package:
- Has its own `package.json` and `tsconfig.json`
- Outputs to `dist/`
- Uses `file:` references for local dependencies
- Builds independently

Root scripts:
- `npm run dev:web` — Web dev server
- `npm run dev:cli` — CLI runner (accepts args)
- `npm run build` — Build all packages
