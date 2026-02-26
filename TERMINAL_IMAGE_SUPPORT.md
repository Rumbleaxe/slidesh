# Terminal Image Rendering Support

slidesh includes built-in support for rendering images in terminal emulators that support advanced image protocols. This feature enhances CLI presentations by allowing embedded images to display natively in the terminal.

## Supported Terminal Emulators

### 1. **WezTerm** (Recommended for Modern Terminals)
- **Protocols**: Kitty Graphics Protocol, iTerm2 Inline Images, imgcat tool
- **Support**: Native, high-performance
- **Features**: 
  - Full image rendering support in terminal
  - Automatic protocol detection
  - Supports PNG, JPEG, GIF, WebP, etc.
  - True color (24-bit) background support
- **Detection**: Checks for `WEZTERM_EXECUTABLE` environment variable or `TERM_PROGRAM=WezTerm`
- **Note**: If images don't render, ensure `image.jpg` is in the same directory as the presentation file

### 2. **Kitty Terminal**
- **Protocol**: Kitty Graphics Protocol
- **Support**: Native, high-performance
- **Features**: 
  - Direct image rendering without external tools
  - Supports PNG, JPEG, GIF, WebP, etc.
  - Fast rendering with alpha transparency
- **Detection**: Checks for `KITTY_WINDOW_ID` environment variable

### 3. **iTerm2** (macOS)
- **Protocol**: iTerm2 Inline Image Protocol
- **Support**: Native for iTerm2 on macOS
- **Features**:
  - Supports PNG, JPEG, GIF, TIFF, etc.
  - Configurable dimensions and inline rendering
- **Detection**: Checks for `ITERM_SESSION_ID` environment variable

### 4. **Sixel** (Legacy but widely supported)
- **Protocol**: Sixel graphics protocol
- **Support**: xterm-kitty, MLterm, and other terminals
- **Features**:
  - Older but well-established standard
  - Works on many traditional Unix terminals
- **Detection**: Checks for `TERM` environment variable containing "kitty", "mlterm", or "xterm"

## How It Works

The CLI renderer automatically detects terminal capabilities and uses the best available protocol:

```
Terminal Detection
    ↓
Check for WezTerm → Yes? Try Kitty → Try imgcat
    ↓ No
Check for Kitty → Yes? Use Kitty Graphics Protocol
    ↓ No
Check for iTerm2 → Yes? Use iTerm2 Inline Images
    ↓ No
Check for Sixel → Yes? Use Sixel Protocol
    ↓ No
No image support (graceful fallback)
```

## Usage in Presentations

To embed images in your Markdown presentation:

```markdown
# Slide with Image

![Alt Text](./image.jpg)

Description of the image shown above.
```

When presenting in CLI mode:
- **WezTerm/Kitty/iTerm2/Sixel**: Image displays directly in terminal
- **Other terminals**: Image is silently skipped (no errors)

## Background Colors in CLI

All themes now support **full-screen background colors** in the CLI:

```bash
# Dracula theme with dark purple background (fills entire slide)
pnpm cli presentation.md --theme dracula

# Nord theme with dark blue-grey background
pnpm cli presentation.md --theme nord

# Gruvbox theme with warm brown background
pnpm cli presentation.md --theme gruvbox
```

Background colors automatically adapt to terminal capabilities:
- **24-bit Truecolor terminals** (WezTerm, iTerm2, etc.): Full color support
- **256-color ANSI terminals**: Maps to nearest 256-color equivalent
- **16-color terminals**: Falls back to standard colors

## Web Mode (Browser)

Browser presentations now support themed backgrounds:
- CSS variables for background colors
- Optional background images (requires image URL in theme configuration)
- Responsive to theme selection

## PDF Mode (Export)

PDF exports now include themed backgrounds:
- Solid background colors matching theme
- A4 Landscape format optimized for readability
- Professional page numbering and formatting

## Terminal Detection

slidesh automatically detects which image protocols your terminal supports. To check what's detected:

```bash
# View terminal environment
echo $TERM
echo $COLORTERM
echo $KITTY_WINDOW_ID
echo $ITERM_SESSION_ID
```

## Performance Notes

- **Kitty Graphics**: ~10-50ms per image (fastest)
- **iTerm2 Inline**: ~20-100ms per image (medium)
- **Sixel**: ~50-200ms per image (slower, requires conversion)
- **CLI Background Colors**: Negligible performance impact (<1ms)

## Troubleshooting

### Images not appearing in terminal

1. Verify terminal supports image protocols:
   - Kitty: Set `KITTY_WINDOW_ID` or run with `kitty` command
   - iTerm2: Use iTerm2 on macOS (not available on Linux/Windows)
   - WezTerm: Supports both Kitty and Sixel protocols

2. Check image file exists and path is correct

3. Verify terminal is in raw mode (no piping, interactive only)

### Background colors looking wrong

- **Too bright/dark?** Your terminal may not support 256-color ANSI
- **Not showing?** Check if terminal has color support enabled
- **Different colors?** Terminal color palette may differ from expected

## Future Enhancements

- [ ] Direct Sixel image conversion using image processing library
- [ ] Support for Unicode image approximation fallback
- [ ] Image caching for faster re-renders
- [ ] Custom background image support in themes

## References

- [Kitty Graphics Protocol](https://sw.kovidgoyal.net/kitty/graphics-protocol/)
- [iTerm2 Inline Images](https://iterm2.com/documentation-images.html)
- [Sixel Protocol Documentation](https://saitoha.github.io/libsixel/)
- [WezTerm Image Protocol Support](https://wezfurlong.org/wezterm/imgcat.html)
