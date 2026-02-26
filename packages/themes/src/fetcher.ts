import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';
import type { Theme, WezTermTheme } from './types.js';
import { parseWezTermTheme } from './parser.js';

/**
 * WezTerm color scheme fetcher
 * Fetches from GitHub and caches locally
 */

const WEZTERM_GITHUB_URL =
  'https://raw.githubusercontent.com/wez/wezterm/main/assets/colors/';

export interface FetcherOptions {
  cacheDir?: string;
  timeout?: number;
  autoFetch?: boolean;
}

export class ThemeFetcher {
  private cacheDir: string;
  private timeout: number;
  private autoFetch: boolean;

  constructor(options: FetcherOptions = {}) {
    this.cacheDir =
      options.cacheDir || this.getDefaultCacheDir();
    this.timeout = options.timeout || 5000;
    this.autoFetch = options.autoFetch !== false;

    this.ensureCacheDir();
  }

  /**
   * Fetch a WezTerm theme by name
   * First checks local cache, then fetches from GitHub if not cached
   */
  async fetchTheme(themeName: string): Promise<Theme | null> {
    // Check cache first
    const cached = this.getCachedTheme(themeName);
    if (cached) {
      return cached;
    }

    if (!this.autoFetch) {
      return null;
    }

    try {
      return await this.fetchFromGitHub(themeName);
    } catch (error) {
      console.error(`Failed to fetch theme "${themeName}":`, error);
      return null;
    }
  }

  /**
   * Get cached theme from local filesystem
   */
  private getCachedTheme(themeName: string): Theme | null {
    const cachePath = path.join(this.cacheDir, `${themeName}.json`);

    if (!fs.existsSync(cachePath)) {
      return null;
    }

    try {
      const data = fs.readFileSync(cachePath, 'utf-8');
      return JSON.parse(data) as Theme;
    } catch {
      return null;
    }
  }

  /**
   * Fetch theme from WezTerm GitHub repository
   */
  private async fetchFromGitHub(themeName: string): Promise<Theme> {
    const wezTermJson = await this.downloadFile(
      `${WEZTERM_GITHUB_URL}${themeName}.toml`
    );

    // Parse TOML (simple approach: extract color table)
    const wezTermTheme = this.parseToml(wezTermJson) as WezTermTheme;
    const theme = parseWezTermTheme(wezTermTheme, themeName);

    // Cache the result
    this.cacheTheme(themeName, theme);

    return theme;
  }

  /**
   * Download file from URL
   */
  private downloadFile(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject(new Error(`Download timeout for ${url}`));
      }, this.timeout);

      https
        .get(url, (res) => {
          if (res.statusCode !== 200) {
            reject(new Error(`HTTP ${res.statusCode} for ${url}`));
            return;
          }

          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            clearTimeout(timer);
            resolve(data);
          });
        })
        .on('error', (error) => {
          clearTimeout(timer);
          reject(error);
        });
    });
  }

  /**
   * Parse TOML color table (simplified)
   * Extracts colors section from WezTerm TOML format
   */
  private parseToml(tomlText: string): WezTermTheme {
    const lines = tomlText.split('\n');
    const colors: Record<string, string> = {};
    const ansi: string[] = [];
    const brights: string[] = [];

    for (const line of lines) {
      const trimmed = line.trim();

      if (trimmed.startsWith('background')) {
        const bgValue = this.extractQuotedValue(line);
        colors.background = bgValue;
      } else if (trimmed.startsWith('foreground')) {
        const fgValue = this.extractQuotedValue(line);
        colors.foreground = fgValue;
      } else if (trimmed.startsWith('ansi =')) {
        // Parse array of colors
        const arrayPart = this.extractBracketedValue(tomlText, tomlText.indexOf(trimmed));
        ansi.push(...this.parseColorArray(arrayPart));
      } else if (trimmed.startsWith('brights =')) {
        const arrayPart = this.extractBracketedValue(tomlText, tomlText.indexOf(trimmed));
        brights.push(...this.parseColorArray(arrayPart));
      } else if (trimmed.includes('=') && !trimmed.startsWith('[')) {
        const keyPart = trimmed.split('=')[0];
        const key = keyPart?.trim();
        if (key) {
          const value = this.extractQuotedValue(line);
          if (value) {
            colors[key.toLowerCase()] = value;
          }
        }
      }
    }

    return {
      colors: {
        ...colors,
        ansi,
        brights,
      },
    };
  }

  /**
   * Extract quoted value from line
   */
  private extractQuotedValue(line: string): string {
    const match = line.match(/"([^"]*)"/);
    return match?.[1] ?? '';
  }

  /**
   * Extract content between brackets
   */
  private extractBracketedValue(text: string, startIdx: number): string {
    const start = text.indexOf('[', startIdx);
    const end = text.indexOf(']', start);
    return text.substring(start + 1, end);
  }

  /**
   * Parse color array from TOML format
   */
  private parseColorArray(arrayContent: string): string[] {
    return arrayContent
      .split(',')
      .map((item) => {
        const match = item.trim().match(/"([^"]*)"/);
        return match?.[1] ?? '';
      })
      .filter((color): color is string => color.length > 0);
  }

  /**
   * Cache theme to local filesystem
   */
  private cacheTheme(themeName: string, theme: Theme): void {
    const cachePath = path.join(this.cacheDir, `${themeName}.json`);

    try {
      fs.writeFileSync(cachePath, JSON.stringify(theme, null, 2), 'utf-8');
    } catch (error) {
      console.warn(`Failed to cache theme "${themeName}":`, error);
    }
  }

  /**
   * Get list of cached theme names
   */
  getCachedThemeNames(): string[] {
    try {
      const files = fs.readdirSync(this.cacheDir);
      return files
        .filter((f) => f.endsWith('.json'))
        .map((f) => f.replace('.json', ''));
    } catch {
      return [];
    }
  }

  /**
   * Ensure cache directory exists
   */
  private ensureCacheDir(): void {
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  /**
   * Get default cache directory
   */
  private getDefaultCacheDir(): string {
    const home = process.env.HOME || process.env.USERPROFILE || '';
    return path.join(home, '.slidesh', 'themes');
  }
}
