# Copilot Instructions for slidesh

## Project Context

**slidesh** is a dual-target presentation engine that compiles Markdown into both web and CLI runtimes. It's architected as a compiler pipeline, not a simple converter. Read AGENTS.md for the complete design philosophy and constraints.

## Compiler Pipeline Architecture

The codebase follows a strict, decoupled architecture:

```
Markdown
   ↓
Parser (remark/unified-based)
   ↓
Slidesh AST (strongly typed, target-agnostic, serializable)
   ↓
Renderer (consumers of AST only)
   ├── Web Renderer (React + Vite)
   └── CLI Renderer (Node + ANSI layout engine)
```

**Critical rules:**
- Parser must NEVER contain rendering logic, styling decisions, or layout logic
- AST must be target-agnostic and fully serializable
- Renderers must ONLY consume AST—never re-parse or access raw Markdown
- No circular dependencies between packages

## Build & Test Commands

*(To be implemented as project is initialized)*

Typical patterns for monorepo:

```bash
npm run build        # Build all packages
npm run test         # Run all tests
npm run test:parser  # Test parser specifically
npm run test:web     # Test web renderer
npm run test:cli     # Test CLI renderer
npm run lint         # Lint all code
npm run dev          # Start dev servers
```

Workspace structure (when initialized):

```
/packages
  /parser          # Markdown → AST
  /ast             # Type definitions
  /renderer-web    # React component renderer
  /renderer-cli    # ANSI terminal renderer
  /themes          # Shared theme definitions
  /cli             # CLI executable entrypoint
/apps
  /web-dev-server  # Vite dev server
  /cli-runner      # CLI presentation runner
/examples          # Sample presentations
/tests             # Shared test utilities
```

## Key Conventions & Patterns

### 1. Parser Design

- Use **remark** (unified ecosystem) for Markdown parsing, not markdown-it
- Slide boundaries marked by `---` at start of line
- Custom directives use fenced syntax: `::: directiveName ... :::`
- YAML frontmatter at file start for deck metadata
- All parsing produces explicit AST nodes—never embed raw Markdown

### 2. AST Node Structure

All AST nodes must be:
- **Typed** (strict TypeScript, no `any`)
- **Explicit** (clear node type, never a generic "unknown" node)
- **Serializable** (JSON-compatible for persistence/networking)
- **Documented** (every node type has a comment explaining semantics)

Example node structure:
```typescript
type Slide = {
  id: string                    // Unique slide ID
  meta: SlideMeta              // Metadata from frontmatter
  blocks: Block[]              // Content blocks
}

type Block = 
  | Heading
  | Paragraph
  | CodeBlock
  | DirectiveBlock
  | LayoutContainer
  | ConditionalBlock
  | RawHtml
```

### 3. Markdown Extensions (No Ambiguity)

Allowed mechanisms only:
1. **YAML frontmatter** - Deck-level config
2. **HTML comments** - Metadata hints
3. **Fenced directives** - Content blocks

All extensions must be valid Markdown or invisible to standard renderers.

### 4. Conditional Rendering

Target-aware content uses explicit `ConditionalBlock` AST node:

```markdown
::: only web
Web-specific content (e.g., interactive 3D)
:::

::: only cli
CLI-specific fallback
:::
```

Parser creates `ConditionalBlock { web: [...], cli: [...] }`. Renderer decides what to render.

### 5. Web Renderer Patterns

Stack:
- **React** (functional components only)
- **Vite** (build tool)
- **CSS Grid/Flexbox** (layouts)
- **CSS Variables** (theming)
- **Shiki** (syntax highlighting)

Rules:
- No heavy dependencies (keep bundle ≤ 200KB gzipped target)
- Functional components only—prefer hooks
- CSS variables for all colors/spacing (enable runtime theming)
- Static export must work (no client-side-only features)

### 6. CLI Renderer Patterns

Stack:
- **Node.js** with ANSI/color support
- **Width-aware rendering** (respect terminal width, no overflow)
- Optional: Ink framework for React-like terminal rendering
- Optional: Custom ANSI layout engine for fine control

Rules:
- Precompute slide layout to avoid jitter
- Cache wrapped lines by terminal width
- Gracefully degrade unsupported features (no unicode fallback breaks things)
- Support WezTerm optimizations: truecolor (24-bit ANSI), Nerd Font assumptions

Navigation:
- Arrow keys for forward/back
- Optional Vim keys (h/j/k/l)
- 'q' to quit

### 7. Theming System

Themes are **pure configuration**, not logic:

```typescript
type Theme = {
  web: {
    colors: Record<string, string>      // CSS color values
    spacing: Record<string, string>     // CSS sizes
    fonts: Record<string, string>       // Font stacks
    // ... other CSS-variable values
  }
  cli: {
    palette: Record<string, ANSIColor>  // ANSI color codes
    // ... CLI-specific config
  }
  layouts?: Record<string, LayoutPreset> // Optional layout defaults
}
```

No conditionals in themes. No computed values. Just data.

### 8. Code Highlighting Consistency

- **Web**: Use Shiki (VSCode-grade)
- **CLI**: Use Shiki with ANSI output
- Both must detect language the same way
- Both must highlight the same syntax rules

### 9. Testing Patterns

Use snapshot tests heavily:

```typescript
// Parser tests
test('parses two-column directive', () => {
  const md = `... markdown source ...`
  const ast = parse(md)
  expect(ast).toMatchSnapshot()
})

// Renderer tests
test('renders slide to HTML', () => {
  const html = renderWeb(slide)
  expect(html).toMatchSnapshot()
})

test('renders slide to CLI string', () => {
  const output = renderCLI(slide, { width: 80 })
  expect(output).toMatchSnapshot()
})
```

CLI tests must test multiple terminal widths (80, 120, 160 cols).

### 10. Performance Targets

- Parse average deck (50 slides) < 100ms
- CLI slide render < 50ms
- Web slide transition < 200ms
- No blocking I/O during presentation

Avoid:
- Synchronous filesystem scans
- Heavy AST transformations in hot paths
- Unnecessary re-renders in web mode

### 11. Command-Line Interface

Core commands (when implemented):

```bash
slidesh serve deck.md          # Start web server with hot reload
slidesh --cli deck.md          # Start CLI presentation
slidesh build deck.md          # Export static HTML
slidesh export --format pdf    # Export to PDF
```

Rules:
- CLI flags override config
- Config file `.slideshrc` is optional (YAML or JSON)
- Errors must be explicit and actionable
- No implicit behaviors

### 12. Type Safety

- Enable `strict: true` in tsconfig.json
- No `any` type allowed (use `unknown` if needed)
- Prefer discriminated unions for AST nodes
- Use exhaustive type checking for pattern matches

### 13. Code Organization

Principles:
- Small, pure functions (< 30 lines typical)
- No single-file monoliths
- Favor composition over inheritance
- No hidden global state
- Clear separation of concerns

Anti-patterns to avoid:
- Large class hierarchies
- Side effects in pure functions
- Implicit configuration
- Mixed responsibilities (e.g., parser + renderer logic)

## Dependencies & Stack

| Layer | Tech | Purpose |
|-------|------|---------|
| Language | TypeScript (strict) | Type safety |
| Parser | remark/unified | AST construction |
| Web | React + Vite | Component runtime |
| Web Build | Vite | Fast builds, HMR |
| Web Styling | Modern CSS + variables | Theme support |
| Web Highlighting | Shiki | Code syntax |
| CLI | Node.js (built-in) | Core runtime |
| CLI Terminal | ANSI codes | Color/style |
| Terminal Target | WezTerm | Optimized rendering |

Optional (future):
- Ink (React for CLI, if chosen)
- Framer Motion (animations)
- Math: KaTeX
- Graphs: D3 or Mermaid

## When to Break Rules

Only with explicit justification:
1. Performance bottleneck (with benchmark proof)
2. Impossible to implement otherwise
3. Target-specific hardware limitation

Document violations with `// TODO: Architectural exception - [reason]`

## Contribution Checklist

Before submitting code:

- [ ] Parser changes produce only type-safe AST nodes (no raw Markdown downstream)
- [ ] No renderer logic in parser
- [ ] Web and CLI use same AST and produce semantically identical output (where applicable)
- [ ] Circular dependencies checked: `npm list --depth=0` in each package
- [ ] TypeScript strict mode passes
- [ ] No `any` types introduced
- [ ] Tests exist (snapshots preferred for output)
- [ ] Performance targets not regressed
- [ ] Markdown example remains valid without custom extensions

## Resources

- **AGENTS.md** - Complete design philosophy and constraints
- **README.md** - User-facing overview and philosophy
- **Typical monorepo structure** - See section under "Build & Test Commands"

---

*Last updated: 2026-02-25*
