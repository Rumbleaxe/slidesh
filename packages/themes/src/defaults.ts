import type { Theme } from './types.js';

/**
 * 5 bundled default themes
 * These are popular, accessible themes included with slidesh
 */

export const draculaTheme: Theme = {
  name: 'Dracula',
  author: 'Zeno Rocha',
  description: 'A dark theme with vibrant colors',
  source: 'bundled',
  colors: {
    background: { hex: '#282a36', ansi256: 237, ansi16: 0 },
    foreground: { hex: '#f8f8f2', ansi256: 15, ansi16: 7 },
    cursor: { hex: '#f8f8f2', ansi256: 15, ansi16: 7 },
    palette: {
      black: { hex: '#000000', ansi256: 16, ansi16: 0 },
      red: { hex: '#ff5555', ansi256: 203, ansi16: 1 },
      green: { hex: '#50fa7b', ansi256: 84, ansi16: 2 },
      yellow: { hex: '#f1fa8c', ansi256: 228, ansi16: 3 },
      blue: { hex: '#bd93f9', ansi256: 141, ansi16: 4 },
      magenta: { hex: '#ff79c6', ansi256: 212, ansi16: 5 },
      cyan: { hex: '#8be9fd', ansi256: 117, ansi16: 6 },
      white: { hex: '#bfbfbf', ansi256: 250, ansi16: 7 },
      brightBlack: { hex: '#4d4d4d', ansi256: 239, ansi16: 8 },
      brightRed: { hex: '#ff6e6e', ansi256: 167, ansi16: 9 },
      brightGreen: { hex: '#69ff94', ansi256: 84, ansi16: 10 },
      brightYellow: { hex: '#ffffa5', ansi256: 228, ansi16: 11 },
      brightBlue: { hex: '#d6acff', ansi256: 177, ansi16: 12 },
      brightMagenta: { hex: '#ff92df', ansi256: 212, ansi16: 13 },
      brightCyan: { hex: '#a4ffff', ansi256: 159, ansi16: 14 },
      brightWhite: { hex: '#ffffff', ansi256: 231, ansi16: 15 },
    },
  },
};

export const nordTheme: Theme = {
  name: 'Nord',
  author: 'Arctic Ice Studio',
  description: 'Polar night, frost, aurora theme',
  source: 'bundled',
  colors: {
    background: { hex: '#2e3440', ansi256: 237, ansi16: 0 },
    foreground: { hex: '#eceff4', ansi256: 15, ansi16: 7 },
    palette: {
      black: { hex: '#3b4252', ansi256: 238, ansi16: 0 },
      red: { hex: '#bf616a', ansi256: 167, ansi16: 1 },
      green: { hex: '#a3be8c', ansi256: 108, ansi16: 2 },
      yellow: { hex: '#ebcb8b', ansi256: 222, ansi16: 3 },
      blue: { hex: '#81a1c1', ansi256: 109, ansi16: 4 },
      magenta: { hex: '#b48ead', ansi256: 139, ansi16: 5 },
      cyan: { hex: '#88c0d0', ansi256: 110, ansi16: 6 },
      white: { hex: '#e5e9f0', ansi256: 15, ansi16: 7 },
      brightBlack: { hex: '#4c566a', ansi256: 239, ansi16: 8 },
      brightRed: { hex: '#d06f79', ansi256: 167, ansi16: 9 },
      brightGreen: { hex: '#b3d9a3', ansi256: 150, ansi16: 10 },
      brightYellow: { hex: '#f0d399', ansi256: 228, ansi16: 11 },
      brightBlue: { hex: '#91aadd', ansi256: 146, ansi16: 12 },
      brightMagenta: { hex: '#c5a9c1', ansi256: 175, ansi16: 13 },
      brightCyan: { hex: '#9fd9e8', ansi256: 152, ansi16: 14 },
      brightWhite: { hex: '#eceff4', ansi256: 231, ansi16: 15 },
    },
  },
};

export const oneDarkTheme: Theme = {
  name: 'One Dark',
  author: 'Atom',
  description: 'Atom inspired dark theme',
  source: 'bundled',
  colors: {
    background: { hex: '#282c34', ansi256: 237, ansi16: 0 },
    foreground: { hex: '#abb2bf', ansi256: 145, ansi16: 7 },
    palette: {
      black: { hex: '#1e2127', ansi256: 233, ansi16: 0 },
      red: { hex: '#e06c75', ansi256: 168, ansi16: 1 },
      green: { hex: '#98c379', ansi256: 114, ansi16: 2 },
      yellow: { hex: '#d19a66', ansi256: 173, ansi16: 3 },
      blue: { hex: '#61afef', ansi256: 75, ansi16: 4 },
      magenta: { hex: '#c678dd', ansi256: 176, ansi16: 5 },
      cyan: { hex: '#56b6c2', ansi256: 73, ansi16: 6 },
      white: { hex: '#abb2bf', ansi256: 145, ansi16: 7 },
      brightBlack: { hex: '#5c6370', ansi256: 241, ansi16: 8 },
      brightRed: { hex: '#be5046', ansi256: 167, ansi16: 9 },
      brightGreen: { hex: '#7d8f5c', ansi256: 102, ansi16: 10 },
      brightYellow: { hex: '#e5c07b', ansi256: 180, ansi16: 11 },
      brightBlue: { hex: '#61afef', ansi256: 75, ansi16: 12 },
      brightMagenta: { hex: '#c678dd', ansi256: 176, ansi16: 13 },
      brightCyan: { hex: '#56b6c2', ansi256: 73, ansi16: 14 },
      brightWhite: { hex: '#ffffff', ansi256: 231, ansi16: 15 },
    },
  },
};

export const gruvboxTheme: Theme = {
  name: 'Gruvbox',
  author: 'morhetz',
  description: 'Retro groove color scheme',
  source: 'bundled',
  colors: {
    background: { hex: '#282828', ansi256: 235, ansi16: 0 },
    foreground: { hex: '#ebdbb2', ansi256: 187, ansi16: 7 },
    palette: {
      black: { hex: '#282828', ansi256: 235, ansi16: 0 },
      red: { hex: '#cc241d', ansi256: 124, ansi16: 1 },
      green: { hex: '#98971a', ansi256: 106, ansi16: 2 },
      yellow: { hex: '#d79921', ansi256: 172, ansi16: 3 },
      blue: { hex: '#458588', ansi256: 66, ansi16: 4 },
      magenta: { hex: '#b16286', ansi256: 132, ansi16: 5 },
      cyan: { hex: '#689d6a', ansi256: 72, ansi16: 6 },
      white: { hex: '#a89984', ansi256: 144, ansi16: 7 },
      brightBlack: { hex: '#928374', ansi256: 245, ansi16: 8 },
      brightRed: { hex: '#fb4934', ansi256: 208, ansi16: 9 },
      brightGreen: { hex: '#b8bb26', ansi256: 142, ansi16: 10 },
      brightYellow: { hex: '#fabd2f', ansi256: 214, ansi16: 11 },
      brightBlue: { hex: '#83a598', ansi256: 109, ansi16: 12 },
      brightMagenta: { hex: '#d3869b', ansi256: 175, ansi16: 13 },
      brightCyan: { hex: '#8ec07c', ansi256: 108, ansi16: 14 },
      brightWhite: { hex: '#ebdbb2', ansi256: 223, ansi16: 15 },
    },
  },
};

export const solarizedTheme: Theme = {
  name: 'Solarized Dark',
  author: 'Ethan Schoonover',
  description: 'Precision colors for machines and people',
  source: 'bundled',
  colors: {
    background: { hex: '#002b36', ansi256: 235, ansi16: 0 },
    foreground: { hex: '#839496', ansi256: 244, ansi16: 7 },
    palette: {
      black: { hex: '#073642', ansi256: 8, ansi16: 0 },
      red: { hex: '#dc322f', ansi256: 160, ansi16: 1 },
      green: { hex: '#859900', ansi256: 100, ansi16: 2 },
      yellow: { hex: '#b58900', ansi256: 136, ansi16: 3 },
      blue: { hex: '#268bd2', ansi256: 33, ansi16: 4 },
      magenta: { hex: '#d33682', ansi256: 125, ansi16: 5 },
      cyan: { hex: '#2aa198', ansi256: 37, ansi16: 6 },
      white: { hex: '#eee8d5', ansi256: 230, ansi16: 7 },
      brightBlack: { hex: '#002b36', ansi256: 8, ansi16: 8 },
      brightRed: { hex: '#cb4b16', ansi256: 166, ansi16: 9 },
      brightGreen: { hex: '#586e75', ansi256: 65, ansi16: 10 },
      brightYellow: { hex: '#657b83', ansi256: 66, ansi16: 11 },
      brightBlue: { hex: '#839496', ansi256: 102, ansi16: 12 },
      brightMagenta: { hex: '#6c71c4', ansi256: 62, ansi16: 13 },
      brightCyan: { hex: '#93a1a1', ansi256: 102, ansi16: 14 },
      brightWhite: { hex: '#fdf6e3', ansi256: 230, ansi16: 15 },
    },
  },
};

export const defaultThemes: Record<string, Theme> = {
  dracula: draculaTheme,
  nord: nordTheme,
  'one-dark': oneDarkTheme,
  gruvbox: gruvboxTheme,
  solarized: solarizedTheme,
};

export function getDefaultTheme(): Theme {
  return draculaTheme;
}

export function getThemeByName(name: string): Theme {
  const normalized = name.toLowerCase();
  return defaultThemes[normalized] || draculaTheme;
}

export function listDefaultThemes(): string[] {
  return Object.keys(defaultThemes);
}
