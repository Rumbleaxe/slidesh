#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import { loadConfig, saveSidecarConfig } from './config.js';
import { handleCliMode, handleBrowserMode, handlePdfMode, listThemes, resolveTheme } from './modes.js';

interface CliArgs {
  filePath?: string;
  mode?: 'cli' | 'browser' | 'pdf';
  theme?: string;
  listThemes?: boolean;
  saveConfig?: boolean;
}

/**
 * Parse command-line arguments
 */
function parseArgs(argv: string[]): CliArgs {
  const result: CliArgs = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]!;

    if (arg === '--mode') {
      result.mode = argv[++i] as 'cli' | 'browser' | 'pdf';
    } else if (arg === '--theme') {
      result.theme = argv[++i];
    } else if (arg === '--list-themes') {
      result.listThemes = true;
    } else if (arg === '--save-config') {
      result.saveConfig = true;
    } else if (!arg.startsWith('--')) {
      result.filePath = arg;
    }
  }

  return result;
}

async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const cliArgs = parseArgs(argv);

  // Handle --list-themes
  if (cliArgs.listThemes) {
    await listThemes();
    return;
  }

  // Require file path for other modes
  if (!cliArgs.filePath) {
    console.error('Usage: slidesh [options] <markdown-file>');
    console.error('Options:');
    console.error('  --mode <cli|browser|pdf>  Output mode (default: cli)');
    console.error('  --theme <name>            Theme name (default: dracula)');
    console.error('  --list-themes             List available themes');
    console.error('  --save-config             Save configuration to .slideshrc');
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), cliArgs.filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`Error: File not found: ${cliArgs.filePath}`);
    process.exit(1);
  }

  try {
    // Load configuration with CLI overrides
    const config = loadConfig(resolvedPath, cliArgs);
    const themeName = config.theme || 'dracula';
    const mode = config.mode || 'cli';

    // Resolve theme
    const theme = await resolveTheme(themeName);
    if (!theme) {
      console.error(`Error: Theme not found: ${themeName}`);
      process.exit(1);
    }

    // Read markdown
    const markdown = fs.readFileSync(resolvedPath, 'utf-8');

    // Save config if requested
    if (cliArgs.saveConfig) {
      saveSidecarConfig(resolvedPath, {
        mode,
        theme: themeName,
      });
    }

    // Route to appropriate mode handler
    const modeContext = { markdown, filePath: resolvedPath, theme, themeName };

    switch (mode) {
      case 'cli':
        await handleCliMode(modeContext);
        break;
      case 'browser':
        await handleBrowserMode(modeContext);
        break;
      case 'pdf':
        await handlePdfMode(modeContext);
        break;
      default:
        console.error(`Unknown mode: ${mode}`);
        process.exit(1);
    }
  } catch (error) {
    console.error('Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

