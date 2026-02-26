/**
 * Configuration loader for slidesh
 * Supports .slideshrc, environment variables, and CLI args
 */

import * as fs from 'fs';
import * as path from 'path';

export interface SlideshConfig {
  theme?: string;
  mode?: 'cli' | 'browser' | 'pdf';
  cacheDir?: string;
  autoFetchThemes?: boolean;
}

/**
 * Load configuration from various sources
 * Priority: CLI args > sidecar file > .slideshrc > defaults
 */
export function loadConfig(
  filePath: string,
  cliOverrides: Partial<SlideshConfig> = {}
): SlideshConfig {
  const defaults: SlideshConfig = {
    mode: 'cli',
    theme: 'dracula',
    autoFetchThemes: true,
  };

  // Load from .slideshrc
  const slideshrcConfig = loadSlideshrc();

  // Load from sidecar file (presentation.slidesh.json)
  const sidecarConfig = loadSidecarConfig(filePath);

  // Merge with priority: defaults < .slideshrc < sidecar < CLI overrides
  const mergedConfig = {
    ...defaults,
    ...slideshrcConfig,
    ...sidecarConfig,
    ...Object.fromEntries(
      Object.entries(cliOverrides).filter(([, v]) => v !== undefined)
    ),
  };

  return mergedConfig;
}

/**
 * Load .slideshrc from home directory
 */
function loadSlideshrc(): Partial<SlideshConfig> {
  const home = process.env.HOME || process.env.USERPROFILE || '';
  const slideshrcPath = path.join(home, '.slideshrc');

  if (!fs.existsSync(slideshrcPath)) {
    return {};
  }

  try {
    const content = fs.readFileSync(slideshrcPath, 'utf-8');
    return JSON.parse(content) as Partial<SlideshConfig>;
  } catch {
    return {};
  }
}

/**
 * Load sidecar configuration file
 * Looks for presentation.slidesh.json or presentation.slidesh.config.json
 */
function loadSidecarConfig(filePath: string): Partial<SlideshConfig> {
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));

  // Try presentation.slidesh.json first
  let sidecarPath = path.join(dir, `${baseName}.slidesh.json`);
  if (!fs.existsSync(sidecarPath)) {
    // Try presentation.slidesh.config.json
    sidecarPath = path.join(dir, `${baseName}.slidesh.config.json`);
  }

  if (!fs.existsSync(sidecarPath)) {
    return {};
  }

  try {
    const content = fs.readFileSync(sidecarPath, 'utf-8');
    return JSON.parse(content) as Partial<SlideshConfig>;
  } catch {
    return {};
  }
}

/**
 * Save configuration to .slideshrc
 */
export function saveConfig(config: Partial<SlideshConfig>): void {
  const home = process.env.HOME || process.env.USERPROFILE || '';
  const slideshrcPath = path.join(home, '.slideshrc');

  try {
    fs.writeFileSync(slideshrcPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log(`Configuration saved to ${slideshrcPath}`);
  } catch (error) {
    console.warn(`Failed to save configuration: ${error}`);
  }
}

/**
 * Save configuration to sidecar file
 */
export function saveSidecarConfig(
  filePath: string,
  config: Partial<SlideshConfig>
): void {
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, path.extname(filePath));
  const sidecarPath = path.join(dir, `${baseName}.slidesh.json`);

  try {
    fs.writeFileSync(sidecarPath, JSON.stringify(config, null, 2), 'utf-8');
    console.log(`Configuration saved to ${sidecarPath}`);
  } catch (error) {
    console.warn(`Failed to save configuration: ${error}`);
  }
}
