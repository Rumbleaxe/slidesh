---
title: slidesh Feature Showcase
theme: dracula
---

# slidesh Feature Showcase

## A Dual-Runtime Presentation Engine

Write once. Present anywhere.

---

# Visual Content: Images

![Embedded Image](./image.jpg)

This slide demonstrates image rendering:
- **Web**: Full image display with responsive scaling
- **CLI**: Image rendering in WezTerm and compatible terminal emulators
- **Cross-platform**: Works on macOS, Linux, Windows

---

# Code Highlighting

Syntax-highlighted code works identically on web and CLI.

JavaScript example:

```js
function slideshow() {
  console.log("Hello from slidesh!");
  return true;
}
```

Python example:

```python
def greet(name):
    print(f"Welcome, {name}!")
    return True

greet("slidesh")
```

TypeScript example:

```ts
interface Slide {
  id: string;
  content: string;
  theme?: string;
}

const slide: Slide = {
  id: "1",
  content: "Hello, world!"
};
```

---

# Navigation & Controls

Navigate presentations seamlessly:

**CLI Mode**:
- `→` Arrow Right: Next slide
- `←` Arrow Left: Previous slide
- `j` / `k`: Optional Vim keys for navigation
- `q`: Quit presentation

**Web Mode**:
- `→` / `←` Arrow keys: Navigate slides
- Click: Navigate with mouse
- URL indexing: Jump to specific slides

Current slide position is always displayed.

---

# Configuration & Themes

slidesh supports powerful configuration:

**Available Themes**:
1. **Dracula** - Dark purple and vibrant colors
2. **Nord** - Cool, professional blue-grey
3. **One Dark** - Atom-inspired dark theme
4. **Gruvbox** - Warm, retro-inspired colors
5. **Solarized** - Optimized for readability

**Select a theme**:
```bash
pnpm cli presentation.md --theme nord
pnpm cli presentation.md --theme gruvbox --mode browser
```

**Configuration files**:
- `.slideshrc` - Project defaults (JSON format)
- `presentation.slidesh.json` - Per-presentation settings
- CLI arguments - Override everything else

---

# Markdown Features

slidesh preserves standard Markdown syntax:

## Headings

Multiple heading levels for semantic structure.

### Sub-headings

Organize content hierarchically.

**Bold text** and *italic text* are fully supported.

- Unordered lists
- Work on both
- Web and CLI

1. Numbered lists
2. Are also supported
3. With proper formatting

> Block quotes look great on any platform
> and help emphasize important points.

---

# Web-Only Content

::: only web

This content appears **only in the browser**!

Perfect for:
- Interactive components
- Advanced animations
- Complex layouts
- Custom HTML/CSS
- Interactive 3D models
- Live code execution

When presenting in the CLI, this content is gracefully omitted.

:::

---

# CLI-Only Content

::: only cli

This content appears **only in the terminal**!

Great for:
- ASCII art and diagrams
- Terminal-specific formatting
- CLI-exclusive information
- Text-based visualizations
- Development-focused content

:::

This feature enables truly optimized presentations for each platform without maintaining separate files.

---

# Cross-Platform Support

slidesh runs on all major platforms:

**Desktop Operating Systems**:
- 🍎 macOS (10.14+)
- 🐧 Linux (all distributions)
- 🪟 Windows (PowerShell, WSL, native terminals)

**Terminal Emulators** (Recommended):
- WezTerm (GPU-accelerated, best support)
- Alacritty (High performance)
- Kitty (Modern, feature-rich)
- iTerm2 (macOS, highly customizable)
- Windows Terminal (Windows native)

**Color Support**:
- 24-bit Truecolor (WezTerm, modern terminals)
- 256-color ANSI (Wide support)
- 16-color fallback (Legacy terminals)

slidesh automatically detects and adapts to your environment!

---

# Multiple Output Modes

slidesh supports three distinct presentation modes:

**CLI Mode** (Default):
```bash
pnpm cli presentation.md
```
Perfect for:
- Terminal presentations
- Live coding demos
- Engineering talks
- Remote presentations via SSH

**Browser Mode**:
```bash
pnpm cli presentation.md --mode browser
```
Great for:
- Polished presentations
- Conference talks
- Web-based sharing
- Screen recording

**PDF Mode**:
```bash
pnpm cli presentation.md --mode pdf
```
Use for:
- Offline viewing
- Email sharing
- Print-to-PDF export
- Document archives

---

# Compiler Architecture

slidesh is fundamentally different from converters:

```
Markdown File
      ↓
Parser Layer (@slidesh/parser)
      ↓
Target-Agnostic AST
(Strongly Typed, Serializable)
      ↓
    ┌─────────────────┬──────────────────┐
    ↓                 ↓                  ↓
Web Renderer    CLI Renderer       PDF Generator
(React + Vite)  (Node + ANSI)    (HTML output)
```

This architecture ensures:
- ✅ No rendering logic in the parser
- ✅ Consistent semantics across targets
- ✅ Easy to add new renderers
- ✅ Clean separation of concerns

---

# Performance Characteristics

slidesh is optimized for speed and efficiency:

**Parsing**:
- Typical presentation: < 100ms
- Large deck (100+ slides): < 500ms

**Rendering**:
- CLI slide switch: Instant (< 10ms)
- Web navigation: Instant (< 50ms)
- PDF generation: < 2 seconds

**Memory Usage**:
- CLI: 15-20 MB per presentation
- Web: 40-60 MB (includes browser)
- Minimal dependency overhead

**Bundle Size**:
- Web app: 144.86 KB raw
- Web app: 46.59 KB gzipped
- Optimized for fast delivery

---

# Use Cases

slidesh excels in many scenarios:

**Technical Talks**:
- Embedded code with highlighting
- CLI demonstrations
- Quick theme switching

**Engineering Presentations**:
- Present directly from your terminal
- Impress developer audiences
- Live coding integration

**Conference Talks**:
- Polish and professionalism
- Multiple monitor support
- Speaker notes (planned v2.0)

**Remote Presentations**:
- Works over SSH
- No software installation required
- Lightweight and portable

**Educational Content**:
- Beautiful code examples
- Interactive demonstrations
- Easy to maintain and update

---

# Getting Started

Start using slidesh today:

**1. Install**:
```bash
git clone https://github.com/Rumbleaxe/slidesh.git
cd slidesh
pnpm install
pnpm build
```

**2. Create a presentation**:
```bash
cat > my-talk.md << 'EOF'
# My Talk

---

# First Slide

Content here...
EOF
```

**3. Present**:
```bash
pnpm cli my-talk.md
```

**4. Explore modes**:
```bash
pnpm cli my-talk.md --mode browser
pnpm cli my-talk.md --theme nord
pnpm cli my-talk.md --list-themes
```

That's it! You're presenting.

---

# The slidesh Philosophy

slidesh is built on core principles:

**1. Markdown is Sacred**
- Standard Markdown syntax
- No proprietary extensions
- Portable across platforms

**2. Dual-Runtime First**
- CLI is not a fallback
- Web is not the default
- Both are equally important

**3. Engineer-Focused**
- Built by engineers, for engineers
- No bloat, no magic
- Hackable and transparent

**4. Zero Compromise**
- Same source file, professional output
- No feature degradation between platforms
- Consistent behavior everywhere

---

# What's Next?

slidesh has an exciting roadmap:

**v0.2.0** (Planned):
- Additional themes
- Enhanced configuration
- More examples

**v1.0.0** (Target: Q2 2026):
- Stable CLI API
- npm package publishing
- Full test suite
- Plugin system foundation

**v2.0.0** (Future):
- Presenter mode with speaker notes
- Live JSX blocks in presentations
- PowerPoint/Google Slides export
- Advanced animations

See [VERSIONING.md](./VERSIONING.md) for the full roadmap.

---

# Thank You!

Thank you for exploring slidesh.

**Questions?**

- 📖 **Docs**: https://github.com/Rumbleaxe/slidesh
- 🐛 **Issues**: https://github.com/Rumbleaxe/slidesh/issues
- ⭐ **Star on GitHub**: https://github.com/Rumbleaxe/slidesh

**Remember**: Write once. Present anywhere.

---

# Bonus: ASCII Art Example

::: only cli

```
    ╔═══════════════════════════════════╗
    ║     slidesh Feature Showcase      ║
    ║                                   ║
    ║  Write Once. Present Anywhere.    ║
    ║                                   ║
    ║  Terminal ──→ Web & PDF ──→ All   ║
    ║                                   ║
    ╚═══════════════════════════════════╝
```

:::

::: only web

# Bonus: Web-Only Resources

**For More Information**:
- [GitHub Repository](https://github.com/Rumbleaxe/slidesh)
- [Documentation](./README.md)
- [Version History](./CHANGELOG.md)

:::

---

# Test Slide: Code Blocks in Different Languages

Ruby example:

```ruby
def present(topic)
  puts "Now presenting: #{topic}"
  yield if block_given?
end

present("slidesh") { puts "Amazing!" }
```

Go example:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello from slidesh!")
}
```

Bash example:

```bash
#!/bin/bash
echo "slidesh is awesome!"
pnpm cli presentation.md --theme dracula
```

---

# Test Slide: Lists and Formatting

**Features Demonstrated So Far**:

1. ✅ Markdown rendering
2. ✅ Code syntax highlighting
3. ✅ Image display
4. ✅ Conditional content (web/CLI)
5. ✅ Theming and colors
6. ✅ Navigation controls
7. ✅ Multiple output modes
8. ✅ Cross-platform support

**Additional Capabilities**:

- Block quotes for emphasis
- Horizontal rules (---)
- Inline code formatting: `pnpm cli`
- Text styling: **bold**, *italic*
- Ordered and unordered lists
- Multi-level heading hierarchy

---

# Test Slide: Complex Markdown

Here's a more complex example combining multiple features:

### Code with Highlighting

```ts
interface PresentationConfig {
  theme: "dracula" | "nord" | "one-dark" | "gruvbox" | "solarized";
  mode: "cli" | "browser" | "pdf";
  slideWidth?: number;
}

const config: PresentationConfig = {
  theme: "dracula",
  mode: "cli"
};
```

### Emphasis and Lists

The above configuration:
1. **Selects a theme** from 5 built-in options
2. **Chooses an output mode** for rendering
3. **Optionally sets slide width** for CLI rendering

All of these can be:
- Set via CLI arguments
- Configured in `.slideshrc`
- Stored in presentation-specific files

---

# End of Feature Showcase

You've now seen slidesh in action!

**This presentation demonstrates**:
- ✨ All core rendering capabilities
- 🎨 Theme switching
- 📱 Cross-platform support
- 🚀 Multiple output modes
- 💻 Code syntax highlighting
- 🖼️ Image embedding
- 🎯 Navigation controls
- ⚙️ Configuration system

**Try it yourself**:
```bash
pnpm cli presentation.md --theme nord
pnpm cli presentation.md --mode browser
pnpm cli presentation.md --list-themes
```

Enjoy your presentations! 🎉