---
title: slidesh
author: Your Name
theme: default
---

# slidesh

Write once. Present anywhere.

- Markdown as source
- Web runtime
- CLI runtime

---

# The Problem

Engineers use tools like Marp.

But:

- Limited theming
- Static output
- Weak CLI experience
- No real runtime model

We want something better.

---

# The Idea

::: layout two-column

## Web

- React runtime
- Modern CSS
- Animations
- Interactive components

:::

::: layout two-column

## CLI

- ANSI rendering
- Width-aware layout
- Syntax highlighting
- Keyboard navigation

:::

---

# Target-Aware Rendering

::: only web

## Web Exclusive

This block renders only in the browser.

Example interactive code:

```jsx
<button className="primary">Click me</button>
```

:::

::: only cli

## CLI Exclusive

This block renders only in the terminal.

[ Imagine a fancy animated button here ]

```bash
echo "Hello from slidesh"
```

:::

---

# Architecture

```text
Markdown
   ↓
Parser
   ↓
Slidesh AST
   ↓
Renderer
   ├── Web
   └── CLI
```

- Target-agnostic AST
- Renderer-specific behavior
- Deterministic output

---

# Code Highlighting Example

```ts
type Slide = {
  id: string
  meta: SlideMeta
  blocks: Block[]
}
```

- Strict typing
- No implicit state
- Renderer isolation

---

# CLI Demo

Run:

```bash
slidesh --cli mvp.md
```

Navigate:

- ← →
- ↑ ↓
- q to quit

Optimized for modern terminals like WezTerm.

---

# Roadmap

Phase 1:
- Parser
- Basic renderers
- Slide navigation

Phase 2:
- Themes
- Layout directives
- Code highlighting parity

Phase 3:
- Plugin system
- Live components
- Advanced transitions

---

# slidesh

Minimal. Deterministic. Hackable.

Thank you.