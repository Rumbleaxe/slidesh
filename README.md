# slidesh

> Write once. Present anywhere.
> Markdown → Web Runtime + CLI Runtime.

slidesh is a dual-target presentation engine.

You author a single Markdown file.
slidesh compiles it into:

* 🌐 A modern web presentation (React + advanced CSS)
* 🖥️ A terminal-native presentation (ANSI + layout engine)

It is not a Markdown-to-HTML converter.
It is a presentation compiler.

---

## Philosophy

Unlike Marp, slidesh does not generate static slide decks with limited styling.

slidesh:

* Builds a target-agnostic AST
* Has multiple renderers
* Preserves semantic structure
* Enables conditional target rendering
* Treats CLI as a first-class runtime

Engineers should be able to:

* Present in a browser with polished animations
* Or present directly from a terminal and impress a room full of developers

Same source file. No compromise.

---

# Architecture

```
slides.md
   ↓
Markdown Parser
   ↓
Slidesh AST
   ↓
Renderer
   ├── Web (React)
   └── CLI (ANSI Layout Engine)
```

## Core Layers

### 1. Parser

* Markdown parsing (remark / markdown-it)
* Frontmatter extraction
* Directive parsing
* Slide splitting (`---`)
* Produces typed Slidesh AST

No rendering logic allowed here.

---

### 2. AST

Strongly typed intermediate representation.

Target-agnostic. Serializable. Explicit.

Example conceptual types:

```
Slide
  ├── Meta
  └── Blocks
        ├── Heading
        ├── Paragraph
        ├── CodeBlock
        ├── Layout
        ├── ConditionalBlock
```

Renderers consume this structure.

---

### 3. Web Renderer

Stack:

* React
* TypeScript
* CSS Grid + Flexbox
* CSS Variables
* View Transitions API
* Optional animation layer (Framer Motion–style)
* Shiki for syntax highlighting

Capabilities:

* Layout systems
* Animated transitions
* Theming
* Live components
* Interactive demos
* Static export support

Web mode is a runtime, not static HTML.

---

### 4. CLI Renderer

Stack:

* Node.js
* ANSI rendering
* Terminal layout engine
* Width-aware wrapping
* Optional Ink or custom renderer

Features:

* Incremental reveal
* Syntax-highlighted code
* Layout approximation (columns, centered blocks)
* Keyboard navigation
* Theme-aware color palettes

CLI mode is not a fallback.
It is a primary presentation target.

---

# Terminal Experience (WezTerm Optimized)

slidesh is optimized for modern GPU-accelerated terminals, especially WezTerm.

WezTerm capabilities leveraged:

* Truecolor (24-bit ANSI)
* High-performance rendering
* Ligatures
* GPU acceleration
* Background image support
* Blur and opacity effects
* Configurable fonts and fallback chains
* Multiplexing
* OSC 8 hyperlinks
* Dynamic tab titles

Recommended WezTerm configuration:

* Nerd Font or JetBrains Mono
* 24-bit color enabled
* Smooth font rendering
* Increased scrollback disabled during presentation

Optional enhancements:

* Dedicated presentation profile
* Fullscreen launch via wezterm cli
* Background transparency themes
* Terminal padding for centered layout

slidesh CLI is built to feel native inside WezTerm.

---

# Features

## Dual Runtime

```
slidesh serve talk.md
slidesh --cli talk.md
```

One file. Two environments.

---

## Conditional Rendering

```
::: only web
Interactive 3D component
:::

::: only cli
(Imagine a 3D model rotating here)
:::
```

Renderer decides target behavior.

---

## Layout Directives

Example:

```
::: layout two-column
Left content
:::
```

Markdown remains valid.

---

## Theming

Themes define:

* Web CSS variables
* CLI ANSI palettes
* Layout defaults

Themes are pure configuration.

---

## Code Highlighting

* Web: Shiki (VSCode-grade highlighting)
* CLI: ANSI-based highlighting

Consistent language detection.

---

## Navigation

CLI:

* Arrow keys
* Optional Vim bindings
* q to quit

Web:

* Arrow keys
* Click
* URL-based slide indexing

---

# Stack Overview

| Layer                 | Technology              |
| --------------------- | ----------------------- |
| Language              | TypeScript              |
| Parser                | remark / unified        |
| AST                   | Custom typed model      |
| Web                   | React + Vite            |
| CLI                   | Node + ANSI renderer    |
| Styling               | Modern CSS + variables  |
| Highlighting          | Shiki                   |
| Terminal Optimization | WezTerm-aware rendering |

---

# Repository Structure

```
/packages
  /parser
  /ast
  /renderer-web
  /renderer-cli
  /themes
  /cli
/apps
  /web-dev-server
  /cli-runner
/examples
/docs
```

Each package must remain isolated and composable.

No circular dependencies.

---

# Cross-Platform Support

slidesh targets:

* Linux
* macOS
* Windows (PowerShell, WSL, native terminals)

Recommended terminal emulators:

* WezTerm
* Alacritty
* Kitty

Fallback-compatible with:

* Windows Terminal
* iTerm2

CLI gracefully degrades on limited terminals.

---

# Performance Goals

* Parse deck < 100ms
* Instant slide navigation
* No layout jitter in CLI
* Minimal bundle size in web mode
* Deterministic builds

---

# Example Workflow

Author:

```
vim talk.md
```

Preview in browser:

```
slidesh serve talk.md
```

Present in terminal:

```
slidesh --cli talk.md
```

Export static site:

```
slidesh build talk.md
```

---

# Non-Goals (v1)

* WYSIWYG editor
* Drag-and-drop UI
* PowerPoint compatibility
* GUI-first workflow

slidesh is built for engineers.

---

# Roadmap

Phase 1:

* Core parser
* Basic web renderer
* Basic CLI renderer

Phase 2:

* Theming system
* Layout directives
* Code highlighting parity

Phase 3:

* Plugin system
* Live JSX blocks
* Advanced CLI transitions
* Graph rendering
* Math support

---

# Why slidesh?

Because presenting from a terminal should not mean sacrificing aesthetics.

Because Markdown deserves a real runtime.

Because engineers deserve tools built for engineers.
