import * as readline from "readline";
import chalk from "chalk";
import * as fs from "fs";
import * as path from "path";

export interface CLIRendererOptions {
  onExit?: () => void;
  theme?: any;
}

/**
 * Terminal image protocol detection and rendering
 * Supports: Sixel, iTerm2 inline images, Kitty graphics protocol
 */
class TerminalImageRenderer {
  private supportsKitty: boolean;
  private supportsIterm2: boolean;
  private supportsSixel: boolean;

  constructor() {
    const term = process.env.TERM || "";
    const colorterm = process.env.COLORTERM || "";
    
    // Kitty: Check for kitty environment variable
    this.supportsKitty = process.env.KITTY_WINDOW_ID !== undefined;
    
    // iTerm2: Check for iTerm2 identifier
    this.supportsIterm2 = process.env.ITERM_SESSION_ID !== undefined;
    
    // Sixel: Check for xterm-kitty or mlterm or other sixel-supporting terminals
    this.supportsSixel = 
      term.includes("kitty") || 
      term.includes("mlterm") || 
      term.includes("xterm") ||
      colorterm.includes("truecolor");
  }

  /**
   * Render image using appropriate terminal protocol
   * Prioritizes Kitty > iTerm2 > Sixel
   */
  renderImage(imagePath: string, maxWidth: number = 80): string[] {
    if (!fs.existsSync(imagePath)) {
      return [];
    }

    try {
      if (this.supportsKitty) {
        return this.renderKittyImage(imagePath, maxWidth);
      } else if (this.supportsIterm2) {
        return this.renderIterm2Image(imagePath, maxWidth);
      } else if (this.supportsSixel) {
        return this.renderSixelImage(imagePath, maxWidth);
      }
    } catch (error) {
      // Silently fail if image rendering not supported
      return [];
    }

    return [];
  }

  /**
   * Render image using Kitty graphics protocol
   * https://sw.kovidgoyal.net/kitty/graphics-protocol/
   */
  private renderKittyImage(imagePath: string, maxWidth: number): string[] {
    try {
      const imageData = fs.readFileSync(imagePath);
      const base64 = imageData.toString("base64");
      
      // Kitty graphics protocol: ESC_c G key=value,key=value;base64-data ESC_c
      const imageSize = Math.min(maxWidth, 40); // Max 40 chars wide
      const chunk = base64.match(/.{1,4096}/g) || [];
      
      let output = [
        `\x1b_Ga=T,f=100,s=${imageSize},v=${Math.floor(imageSize * 0.75)},C=1;${chunk[0]}\x1b\\`
      ];
      
      for (let i = 1; i < chunk.length; i++) {
        output.push(`\x1b_Gm=1;${chunk[i]}\x1b\\`);
      }
      
      return output;
    } catch {
      return [];
    }
  }

  /**
   * Render image using iTerm2 inline image protocol
   * https://iterm2.com/documentation-images.html
   */
  private renderIterm2Image(imagePath: string, maxWidth: number): string[] {
    try {
      const imageData = fs.readFileSync(imagePath);
      const base64 = imageData.toString("base64");
      
      // iTerm2 protocol: OSC 1337 ; File=name=encoded-base64-name;width=NNpx;height=NNpx : base64-encoded-image ST
      const imageSize = Math.min(maxWidth, 40);
      const filename = path.basename(imagePath);
      const encodedFilename = Buffer.from(filename).toString("base64");
      
      return [
        `\x1b]1337;File=name=${encodedFilename};width=${imageSize}px;height=${Math.floor(imageSize * 0.75)}px;inline=1:${base64}\x07`
      ];
    } catch {
      return [];
    }
  }

  /**
   * Render image using Sixel protocol (legacy but widely supported)
   * Note: Full implementation would require image-to-sixel conversion
   * This is a placeholder for the protocol support
   */
  private renderSixelImage(_imagePath: string, _maxWidth: number): string[] {
    // Sixel rendering would require external tool like img2sixel
    // For now, just indicate support is available
    return [];
  }

  supportsAnyImageProtocol(): boolean {
    return this.supportsKitty || this.supportsIterm2 || this.supportsSixel;
  }

  getDetectedProtocol(): string {
    if (this.supportsKitty) return "Kitty";
    if (this.supportsIterm2) return "iTerm2";
    if (this.supportsSixel) return "Sixel";
    return "None";
  }
}

export class CLIRenderer {
  private slides: string[];
  private currentIndex: number = 0;
  private rl: readline.Interface | null = null;
  private theme?: any;
  private imageRenderer: TerminalImageRenderer;

  constructor(slides: string[], theme?: any) {
    this.slides = slides;
    this.theme = theme;
    this.imageRenderer = new TerminalImageRenderer();
  }

  private clearScreen(): void {
    console.clear();
  }

  /**
   * Apply background color using ANSI escape codes
   */
  private getBackgroundCode(): number {
    if (!this.theme || !this.theme.colors.background) {
      return 16;
    }
    return this.theme.colors.background.ansi256 || 16;
  }

  private renderSlide(index: number): void {
    if (index < 0 || index >= this.slides.length) return;

    this.clearScreen();
    const slide = this.slides[index];

    const lines = slide?.split("\n") ?? [];
    const maxWidth = Math.min(process.stdout.columns || 80, 100);

    // Theme colors
    const borderColor = this.theme
      ? chalk.hex(this.theme.colors.palette.cyan.hex)
      : chalk.cyan;
    const textColor = this.theme
      ? chalk.hex(this.theme.colors.foreground.hex)
      : chalk.white;
    const counterColor = this.theme
      ? chalk.hex(this.theme.colors.palette.yellow.hex)
      : chalk.yellow;
    const hintColor = this.theme
      ? chalk.hex(this.theme.colors.palette.brightBlack.hex)
      : chalk.gray;
    const bgColor = this.getBackgroundCode();

    // Start output with background color
    const bgEscape = `\x1b[48;5;${bgColor}m`;
    const resetEscape = `\x1b[0m`;

    console.log(bgEscape);
    console.log("");
    console.log(bgEscape + borderColor("─".repeat(maxWidth)));
    console.log(
      bgEscape + counterColor(`Slide ${index + 1} / ${this.slides.length}`)
    );
    console.log(bgEscape + borderColor("─".repeat(maxWidth)));
    console.log("");

    // Try to render background image if available
    if (this.theme?.colors.backgroundImage) {
      const imageLines = this.imageRenderer.renderImage(
        this.theme.colors.backgroundImage,
        maxWidth
      );
      imageLines.forEach((line) => {
        console.log(bgEscape + line);
      });
      if (imageLines.length > 0) {
        console.log("");
      }
    }

    lines.forEach((line) => {
      if (line.trim().length > 0) {
        console.log(bgEscape + textColor(line));
      } else {
        console.log(bgEscape);
      }
    });

    console.log("");
    console.log(bgEscape + borderColor("─".repeat(maxWidth)));
    console.log(bgEscape + hintColor("Arrow Keys: Navigate | q: Quit"));
    console.log(bgEscape + borderColor("─".repeat(maxWidth)));
    console.log(resetEscape);
  }

  private nextSlide(): void {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.renderSlide(this.currentIndex);
    }
  }

  private previousSlide(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.renderSlide(this.currentIndex);
    }
  }

  private setupKeyListener(): void {
    const rl = readline.createInterface({
      input: process.stdin,
    });

    readline.emitKeypressEvents(process.stdin);

    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    process.stdin.on("keypress", (_str: string, key: readline.Key) => {
      if (key && key.name === "q") {
        this.stop();
        return;
      }

      if (key && key.name === "right") {
        this.nextSlide();
      } else if (key && key.name === "left") {
        this.previousSlide();
      }
    });

    this.rl = rl;
  }

  public start(): void {
    this.setupKeyListener();
    this.renderSlide(this.currentIndex);
  }

  public stop(): void {
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
    if (this.rl) {
      this.rl.close();
    }
    console.log(chalk.yellow("Presentation ended."));
    process.exit(0);
  }
}
