import * as readline from "readline";
import chalk from "chalk";

export interface CLIRendererOptions {
  onExit?: () => void;
  theme?: any;
}

export class CLIRenderer {
  private slides: string[];
  private currentIndex: number = 0;
  private rl: readline.Interface | null = null;
  private theme?: any;

  constructor(slides: string[], theme?: any) {
    this.slides = slides;
    this.theme = theme;
  }

  private clearScreen(): void {
    console.clear();
  }

  private renderSlide(index: number): void {
    if (index < 0 || index >= this.slides.length) return;

    this.clearScreen();
    const slide = this.slides[index];

    // Simple centered content with border
    const lines = slide?.split("\n") ?? [];
    const maxWidth = Math.min(process.stdout.columns || 80, 100);

    // Get border color from theme or default to cyan
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

    console.log("");
    console.log(borderColor("─".repeat(maxWidth)));
    console.log(
      counterColor(`Slide ${index + 1} / ${this.slides.length}`)
    );
    console.log(borderColor("─".repeat(maxWidth)));
    console.log("");

    lines.forEach((line) => {
      if (line.trim().length > 0) {
        console.log(textColor(line));
      } else {
        console.log("");
      }
    });

    console.log("");
    console.log(borderColor("─".repeat(maxWidth)));
    console.log(hintColor("Arrow Keys: Navigate | q: Quit"));
    console.log(borderColor("─".repeat(maxWidth)));
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
