# AGENTS.md

## Project: slidesh

> Write once. Present anywhere.
> Markdown → Web Runtime + CLI Runtime.

---

## 1. Project Overview

`slidesh` is a dual-target presentation engine.

Input:

* A valid Markdown file (`.md`)

Output targets:

* Web (React + modern CSS)
* CLI (ANSI-rendered terminal presentation)

The same source file must render correctly in both environments.

This project is architected as a **compiler pipeline**, not a simple Markdown-to-HTML converter.

---

## 2. Core Design Principles

1. Markdown is the source language.
2. slidesh builds an intermediate AST.
3. Renderers consume the AST.
4. Targets must remain decoupled.
5. No target-specific logic inside parsing layer.
6. Web and CLI renderers must share semantics.
7. Zero-config by default.
8. Deterministic output.
9. Hackable over magical.

Do not introduce hidden global state.

---

## 3. Architecture

High-level pipeline:

```
Markdown
   ↓
Parser
   ↓
Slidesh AST
   ↓
Target Renderer
   ├── Web Renderer
   └── CLI Renderer
```

### Layers

#### 3.1 Parser Layer

Responsible for:

* Markdown parsing
* Slide splitting (`---`)
* Directive extraction
* Frontmatter extraction

Outputs:

* Strongly typed Slidesh AST

Must not:

* Contain rendering logic
* Inject styling
* Inject layout decisions

---

#### 3.2 AST Layer

Define explicit node types.

Example:

```ts
type Slide = {
  id: string
  meta: SlideMeta
  blocks: Block[]
}

type Block =
  | Heading
  | Paragraph
  | CodeBlock
  | DirectiveBlock
  | LayoutContainer
  | RawHtml
```

AST must be:

* Serializable
* Target-agnostic
* Explicit

Do not pass raw Markdown downstream.

---

#### 3.3 Web Renderer

Responsibilities:

* React component mapping
* Layout composition
* Theming
* Animations
* Interactive components

Constraints:

* No parsing logic
* No Markdown logic
* Only consume AST

Prefer:

* Functional components
* CSS Grid/Flexbox
* CSS variables for theming

---

#### 3.4 CLI Renderer

Responsibilities:

* Terminal layout engine
* ANSI styling
* Width-aware wrapping
* Keyboard navigation

Must:

* Respect terminal width
* Avoid overflow
* Gracefully degrade unsupported features

CLI must not:

* Attempt DOM-like rendering
* Depend on browser-only constructs

---

## 4. Markdown Extensions

slidesh extends Markdown in controlled ways.

Allowed extension mechanisms:

1. YAML frontmatter
2. HTML comments (`<!-- slidesh: ... -->`)
3. Fenced directives (`:::layout`)

Do not:

* Break valid Markdown
* Introduce ambiguous syntax
* Override standard Markdown semantics

All custom directives must compile into explicit AST nodes.

---

## 5. Target-Aware Blocks

Support conditional rendering:

```
::: only web
Web-only content
:::

::: only cli
CLI-only content
:::
```

Implementation rule:

* Parser converts these into `ConditionalBlock`.
* Renderer decides execution.
* Parser does not evaluate conditionals.

---

## 6. CLI Design Rules

The CLI experience must feel intentional, not degraded.

### Navigation

* Arrow keys
* Vim keys (h/j/k/l optional)
* q to quit

### Layout

* Center content when appropriate
* Support incremental reveal
* Support code syntax highlighting
* Avoid visual jitter

### Rendering

Prefer:

* Precompute slide layout
* Cache wrapped lines
* Minimize flicker

---

## 7. Web Design Rules

Web mode is not static HTML.

It is a runtime.

Support:

* Transitions
* Theming
* Component slots
* Progressive enhancement

Avoid:

* Heavy runtime dependencies
* Excessive bundle size
* Coupling to specific build tools

Must work with:

* Vite
* Node
* Static export

---

## 8. CLI Interface

Core commands:

```
slidesh serve talk.md
slidesh build talk.md
slidesh --cli talk.md
slidesh export pdf
```

Rules:

* CLI flags override config
* Config file is optional (`.slideshrc`)
* Errors must be explicit and actionable

---

## 9. Theming System

Themes define:

* Web CSS variables
* CLI ANSI color palette
* Optional layout presets

Theme must be:

* Pure configuration
* No logic
* Swappable at runtime

---

## 10. Performance Constraints

slidesh must:

* Parse large Markdown files under 100ms (normal decks)
* Render CLI slides without visible delay
* Avoid blocking I/O in presentation mode

Avoid:

* Large synchronous filesystem scans
* Heavy AST transformations in hot path

---

## 11. Testing Strategy

Parser:

* Unit tests for directive parsing
* Snapshot tests for AST

Renderers:

* Snapshot tests (web HTML)
* Snapshot tests (CLI string output)

CLI:

* Simulated terminal width tests

Do not rely solely on visual inspection.

---

## 12. Code Style

* TypeScript preferred
* Strict typing enabled
* No `any`
* Small pure functions
* No deep inheritance chains
* Favor composition

Avoid:

* Single-file monoliths
* Hidden side effects
* Implicit global config

---

## 13. Non-Goals (for v1)

* WYSIWYG editor
* GUI builder
* Drag-and-drop slide designer
* PowerPoint compatibility
* PDF-perfect typography

slidesh is for engineers.

---

## 14. Contribution Philosophy

When adding features:

1. Ask: does this belong in parser or renderer?
2. Avoid leaking renderer logic into AST.
3. Keep CLI and Web parity where reasonable.
4. Do not optimize prematurely.
5. Keep surface area minimal.

---

## 15. Future Extensibility

Potential future layers:

* Plugin system
* Live JSX blocks
* Graph rendering
* Math support
* Export adapters

All future systems must plug into AST, not replace it.

---

## 16. Identity

slidesh is:

* A compiler for presentations.
* A dual-runtime system.
* A hacker-native tool.
* Minimal but powerful.

It is not:

* A clone of Marp
* A PowerPoint replacement
* A toy CLI wrapper

