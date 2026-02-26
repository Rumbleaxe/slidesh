import type { Theme, ThemeColor, WezTermTheme, AnsiPalette } from './types.js';

/**
 * Convert hex color to ANSI 256 color code
 * Simple approximation using euclidean distance in RGB space
 */
export function hexToAnsi256(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 7; // Default to white

  const { r, g, b } = rgb;

  // 216-color cube (6x6x6) starts at index 16
  // Each component can be 0-5 (0, 95, 135, 175, 215, 255)
  const cubeIndex =
    16 +
    36 * Math.round(r / 255 * 5) +
    6 * Math.round(g / 255 * 5) +
    Math.round(b / 255 * 5);

  return cubeIndex;
}

/**
 * Convert hex color to ANSI 16 basic color code
 * Maps to closest standard color
 */
export function hexToAnsi16(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 7;

  const colors = [
    { code: 0, rgb: { r: 0, g: 0, b: 0 } },       // black
    { code: 1, rgb: { r: 128, g: 0, b: 0 } },     // red
    { code: 2, rgb: { r: 0, g: 128, b: 0 } },     // green
    { code: 3, rgb: { r: 128, g: 128, b: 0 } },   // yellow
    { code: 4, rgb: { r: 0, g: 0, b: 128 } },     // blue
    { code: 5, rgb: { r: 128, g: 0, b: 128 } },   // magenta
    { code: 6, rgb: { r: 0, g: 128, b: 128 } },   // cyan
    { code: 7, rgb: { r: 192, g: 192, b: 192 } }, // white
  ];

  let closest = colors[0]!;
  let minDistance = distance(rgb, closest.rgb);

  for (const color of colors.slice(1)) {
    const d = distance(rgb, color.rgb);
    if (d < minDistance) {
      minDistance = d;
      closest = color;
    }
  }

  return closest.code;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const match = hex.replace('#', '').match(/^[0-9a-f]{6}$/i);
  if (!match) return null;

  const hex6 = match[0];
  return {
    r: parseInt(hex6.substring(0, 2), 16),
    g: parseInt(hex6.substring(2, 4), 16),
    b: parseInt(hex6.substring(4, 6), 16),
  };
}

function distance(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number }
): number {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) +
      Math.pow(a.g - b.g, 2) +
      Math.pow(a.b - b.b, 2)
  );
}

/**
 * Parse WezTerm theme JSON to slidesh Theme
 */
export function parseWezTermTheme(data: unknown, name?: string): Theme {
  const wezterm = data as WezTermTheme;

  const defaultColor: ThemeColor = { hex: '#ffffff' };
  const bgColor = parseColor(wezterm.colors?.background) || {
    hex: '#000000',
  };
  const fgColor = parseColor(wezterm.colors?.foreground) || defaultColor;

  // Parse ANSI palette (0-7 normal, 8-15 bright)
  const ansiColors = wezterm.colors?.ansi || [];
  const brightColors = wezterm.colors?.brights || [];

  const palette: AnsiPalette = {
    black: parseColor(ansiColors[0]) || { hex: '#000000' },
    red: parseColor(ansiColors[1]) || { hex: '#ff0000' },
    green: parseColor(ansiColors[2]) || { hex: '#00ff00' },
    yellow: parseColor(ansiColors[3]) || { hex: '#ffff00' },
    blue: parseColor(ansiColors[4]) || { hex: '#0000ff' },
    magenta: parseColor(ansiColors[5]) || { hex: '#ff00ff' },
    cyan: parseColor(ansiColors[6]) || { hex: '#00ffff' },
    white: parseColor(ansiColors[7]) || { hex: '#ffffff' },
    brightBlack: parseColor(brightColors[0]) || { hex: '#808080' },
    brightRed: parseColor(brightColors[1]) || { hex: '#ff8080' },
    brightGreen: parseColor(brightColors[2]) || { hex: '#80ff80' },
    brightYellow: parseColor(brightColors[3]) || { hex: '#ffff80' },
    brightBlue: parseColor(brightColors[4]) || { hex: '#8080ff' },
    brightMagenta: parseColor(brightColors[5]) || { hex: '#ff80ff' },
    brightCyan: parseColor(brightColors[6]) || { hex: '#80ffff' },
    brightWhite: parseColor(brightColors[7]) || { hex: '#ffffff' },
  };

  // Compute ANSI codes for all colors
  enrichPaletteWithAnsiCodes(palette);

  return {
    name: name || wezterm.metadata?.name || 'Unknown Theme',
    author: wezterm.metadata?.author,
    description: `WezTerm theme${wezterm.metadata?.origin_url ? ` from ${wezterm.metadata.origin_url}` : ''}`,
    source: 'wezterm',
    colors: {
      background: enrichColor(bgColor),
      foreground: enrichColor(fgColor),
      cursor: parseColor(wezterm.colors?.cursor_bg)
        ? enrichColor(parseColor(wezterm.colors.cursor_bg)!)
        : undefined,
      selection: parseColor(wezterm.colors?.selection_bg)
        ? enrichColor(parseColor(wezterm.colors.selection_bg)!)
        : undefined,
      palette,
    },
  };
}

function parseColor(color?: string): ThemeColor | null {
  if (!color) return null;

  // Assume color is in hex format
  const normalized = color.startsWith('#') ? color : `#${color}`;
  return { hex: normalized.toLowerCase() };
}

function enrichColor(color: ThemeColor): ThemeColor {
  return {
    ...color,
    ansi256: hexToAnsi256(color.hex),
    ansi16: hexToAnsi16(color.hex),
  };
}

function enrichPaletteWithAnsiCodes(palette: AnsiPalette): void {
  for (const key of Object.keys(palette) as (keyof AnsiPalette)[]) {
    palette[key] = enrichColor(palette[key]);
  }
}
