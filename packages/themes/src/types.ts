/**
 * Theme system type definitions
 */

export interface ThemeColor {
  /** Hex color code (e.g., "#FF5733") */
  hex: string;
  /** ANSI 256 color code (0-255) */
  ansi256?: number;
  /** ANSI 16 color code (0-15) */
  ansi16?: number;
}

export interface AnsiPalette {
  black: ThemeColor;
  red: ThemeColor;
  green: ThemeColor;
  yellow: ThemeColor;
  blue: ThemeColor;
  magenta: ThemeColor;
  cyan: ThemeColor;
  white: ThemeColor;
  brightBlack: ThemeColor;
  brightRed: ThemeColor;
  brightGreen: ThemeColor;
  brightYellow: ThemeColor;
  brightBlue: ThemeColor;
  brightMagenta: ThemeColor;
  brightCyan: ThemeColor;
  brightWhite: ThemeColor;
}

export interface Theme {
  name: string;
  author?: string;
  description?: string;
  source?: 'bundled' | 'wezterm' | 'user';
  colors: {
    background: ThemeColor;
    backgroundImage?: string; // Path to background image (URL or local path)
    foreground: ThemeColor;
    cursor?: ThemeColor;
    selection?: ThemeColor;
    palette: AnsiPalette;
  };
}

export interface WezTermTheme {
  colors: {
    background?: string;
    foreground?: string;
    cursor_bg?: string;
    cursor_text?: string;
    selection_bg?: string;
    selection_text?: string;
    ansi?: string[];
    brights?: string[];
  };
  metadata?: {
    name?: string;
    author?: string;
    origin_url?: string;
  };
}

export interface ThemeConfig {
  currentTheme?: string;
  customThemes?: Record<string, Theme>;
  cacheDir?: string;
  autoFetch?: boolean;
}
