/**
 * Mode handlers for different output targets
 * CLI, Browser, and PDF modes
 */

/// <reference path="../../parser/dist/index.d.ts" />
/// <reference path="../../renderer-cli/dist/index.d.ts" />
/// <reference path="../../themes/dist/src/index.d.ts" />

// @ts-ignore - runtime imports from compiled dist
import { parseSlides } from '../../parser/dist/index.js';
// @ts-ignore - runtime imports from compiled dist
import { CLIRenderer } from '../../renderer-cli/dist/index.js';
// @ts-ignore - runtime imports from compiled dist
import { defaultThemes, listDefaultThemes, ThemeFetcher, type Theme } from '../../themes/dist/src/index.js';

export interface ModeContext {
  markdown: string;
  filePath: string;
  theme?: Theme;
  themeName: string;
}

/**
 * Handle CLI mode (default)
 */
export async function handleCliMode(context: ModeContext): Promise<void> {
  const slides = parseSlides(context.markdown);

  if (slides.length === 0) {
    console.error('Error: No slides found in file');
    process.exit(1);
  }

  const renderer = new CLIRenderer(slides, context.theme);
  renderer.start();
}

/**
 * Find the project root by looking for package.json
 * Searches from current directory and the markdown file's directory
 */
async function findProjectRoot(startPath?: string): Promise<string> {
  const fs = await import('fs');
  const path = await import('path');
  
  const searchPaths = [startPath || process.cwd()];
  
  for (const searchPath of searchPaths) {
    let current = searchPath;
    while (current !== path.dirname(current)) {
      if (fs.existsSync(path.join(current, 'package.json'))) {
        return current;
      }
      current = path.dirname(current);
    }
  }
  
  return process.cwd();
}

/**
 * Handle browser mode
 * Opens presentation in default browser via HTML
 */
export async function handleBrowserMode(context: ModeContext): Promise<void> {
  const fs = await import('fs');
  const path = await import('path');
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  
  const execAsync = promisify(exec);
  
  try {
    // Find project root, searching from the file's directory
    const fileDir = path.dirname(path.resolve(context.filePath));
    const projectRoot = await findProjectRoot(fileDir);
    const htmlGenerator = path.join(projectRoot, 'generate.mjs');
    
    if (!fs.existsSync(htmlGenerator)) {
      console.error('Error: generate.mjs not found. Cannot open in browser.');
      process.exit(1);
    }
    
    // Run generate.mjs with theme name from project root
    console.log(`Generating HTML with theme: ${context.themeName}...`);
    await execAsync(`node generate.mjs ${context.themeName}`, { cwd: projectRoot });
    
    const htmlFile = path.join(projectRoot, 'presentation.html');
    
    if (!fs.existsSync(htmlFile)) {
      console.error('Error: presentation.html not found after generation.');
      process.exit(1);
    }
    
    // Open in default browser
    const isWindows = process.platform === 'win32';
    const isMac = process.platform === 'darwin';
    const isLinux = process.platform === 'linux';
    
    try {
      if (isWindows) {
        await execAsync(`start "" "${htmlFile}"`);
      } else if (isMac) {
        await execAsync(`open "${htmlFile}"`);
      } else if (isLinux) {
        await execAsync(`xdg-open "${htmlFile}"`);
      }
      console.log(`✓ Opened ${htmlFile} in default browser`);
    } catch {
      console.log(`✓ Generated ${htmlFile}`);
      console.log(`To open in browser, use:`);
      if (isWindows) {
        console.log(`  start "${htmlFile}"`);
      } else if (isMac) {
        console.log(`  open "${htmlFile}"`);
      } else if (isLinux) {
        console.log(`  xdg-open "${htmlFile}"`);
      }
    }
  } catch (error) {
    console.error('Error opening in browser:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

/**
 * Handle PDF mode
 * Exports presentation as PDF using Puppeteer (headless browser)
 */
export async function handlePdfMode(context: ModeContext): Promise<void> {
  const fs = await import('fs');
  const path = await import('path');
  const { exec } = await import('child_process');
  const { promisify } = await import('util');
  
  const execAsync = promisify(exec);
  
  try {
    // Find project root, searching from the file's directory
    const fileDir = path.dirname(path.resolve(context.filePath));
    const projectRoot = await findProjectRoot(fileDir);
    const htmlGenerator = path.join(projectRoot, 'generate.mjs');
    
    if (!fs.existsSync(htmlGenerator)) {
      console.error('Error: generate.mjs not found. Cannot export to PDF.');
      process.exit(1);
    }
    
    // Run generate.mjs with theme name from project root
    console.log(`Generating PDF with theme: ${context.themeName}...`);
    await execAsync(`node generate.mjs ${context.themeName}`, { cwd: projectRoot });
    
    const htmlFile = path.join(projectRoot, 'presentation.html');
    
    if (!fs.existsSync(htmlFile)) {
      console.error('Error: presentation.html not found after generation.');
      process.exit(1);
    }
    
    // Use Puppeteer to convert HTML to PDF
    try {
      // @ts-ignore - puppeteer is dynamically imported
      const puppeteer = await import('puppeteer');
      
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      try {
        const page = await browser.newPage();
        const fileUrl = `file://${htmlFile}`;
        
        await page.goto(fileUrl, { waitUntil: 'networkidle2' });
        
        // Determine output filename based on input markdown filename
        const inputBasename = path.basename(context.filePath);
        const outputName = inputBasename.replace(/\.md$/, '.pdf');
        const outputPath = path.join(fileDir, outputName);
        
        // Generate PDF with A4 size, landscape for better code display
        // Enable print background to render themed backgrounds
        await page.pdf({
          path: outputPath,
          format: 'A4',
          landscape: true,
          margin: { top: '0.5in', bottom: '0.5in', left: '0.5in', right: '0.5in' },
          displayHeaderFooter: true,
          headerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center;"></div>',
          footerTemplate: '<div style="font-size: 10px; width: 100%; text-align: center; padding-bottom: 0.5in;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>',
          printBackground: true,  // Enable background colors and images in PDF
          preferCSSPageSize: false  // Use page.pdf dimensions
        });
        
        console.log(`✅ Successfully exported PDF: ${outputPath}`);
        console.log(`   Theme: ${context.themeName}`);
        console.log(`   Format: A4 Landscape`);
      } finally {
        await browser.close();
      }
    } catch (puppeteerError) {
      console.error('Error generating PDF with Puppeteer:', puppeteerError instanceof Error ? puppeteerError.message : String(puppeteerError));
      console.log('\n📝 Fallback options:');
      console.log(`1. Use browser print-to-PDF:`);
      console.log(`   Open ${htmlFile} in your browser and use Ctrl+P (or Cmd+P) to print as PDF`);
      console.log(`2. Use wkhtmltopdf:`);
      console.log(`   wkhtmltopdf ${htmlFile} ${path.basename(context.filePath).replace(/\.md$/, '.pdf')}`);
      process.exit(1);
    }
  } catch (error) {
    console.error('Error generating PDF:', error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}

/**
 * List available themes
 */
export async function listThemes(fetcherOptions?: { cacheDir?: string }): Promise<void> {
  const defaultNames = listDefaultThemes();
  console.log('\n📚 Available Themes:\n');
  console.log('Bundled themes:');
  for (const name of defaultNames) {
    const theme = defaultThemes[name];
    if (theme) {
      console.log(`  - ${name}: ${theme.description || 'A color theme'}`);
    }
  }

  // List cached WezTerm themes
  const fetcher = new ThemeFetcher(fetcherOptions);
  const cachedThemes = fetcher.getCachedThemeNames();

  if (cachedThemes.length > 0) {
    console.log('\nCached WezTerm themes:');
    for (const name of cachedThemes) {
      if (!defaultNames.includes(name)) {
        console.log(`  - ${name}`);
      }
    }
  }

  console.log(
    '\nUse --theme <name> to select a theme\n'
  );
}

/**
 * Resolve theme by name
 * Returns bundled theme or fetches from WezTerm
 */
export async function resolveTheme(
  themeName: string,
  fetcherOptions?: { cacheDir?: string }
): Promise<Theme | null> {
  // Check bundled themes first
  if (themeName in defaultThemes) {
    return defaultThemes[themeName] ?? null;
  }

  // Try to fetch from WezTerm
  const fetcher = new ThemeFetcher(fetcherOptions);
  return (await fetcher.fetchTheme(themeName)) ?? null;
}
