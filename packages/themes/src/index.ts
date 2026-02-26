/**
 * @slidesh/themes - Theme management system
 * Handles theme definitions, parsing, fetching, and caching
 */

export type { Theme, ThemeColor, AnsiPalette, WezTermTheme, ThemeConfig } from './types.js';
export {
  hexToAnsi256,
  hexToAnsi16,
  parseWezTermTheme,
} from './parser.js';
export {
  draculaTheme,
  nordTheme,
  oneDarkTheme,
  gruvboxTheme,
  solarizedTheme,
  defaultThemes,
  getDefaultTheme,
  getThemeByName,
  listDefaultThemes,
} from './defaults.js';
export { ThemeFetcher, type FetcherOptions } from './fetcher.js';
