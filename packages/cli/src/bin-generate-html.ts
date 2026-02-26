#!/usr/bin/env node

import * as fs from "fs";
import * as path from "path";
import { parseSlides } from "@slidesh/parser";

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderMarkdownToHtml(content: string): string {
  const lines = content.split("\n");
  let html = "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line?.startsWith("# ")) {
      html += `<h1>${escapeHtml(line.substring(2).trim())}</h1>\n`;
      i++;
    } else if (line?.startsWith("## ")) {
      html += `<h2>${escapeHtml(line.substring(3).trim())}</h2>\n`;
      i++;
    } else if (line?.startsWith("### ")) {
      html += `<h3>${escapeHtml(line.substring(4).trim())}</h3>\n`;
      i++;
    } else if (line?.startsWith("```")) {
      const codeLines: string[] = [];
      const langMatch = line.substring(3).trim();
      i++;
      while (i < lines.length && !lines[i]?.startsWith("```")) {
        codeLines.push(lines[i] ?? "");
        i++;
      }
      const lang = langMatch || "text";
      html += `<pre><code class="language-${escapeHtml(lang)}">${escapeHtml(
        codeLines.join("\n")
      )}</code></pre>\n`;
      i++;
    } else if (line?.startsWith("- ")) {
      html += `<li>${escapeHtml(line.substring(2).trim())}</li>\n`;
      i++;
    } else if (line?.startsWith("::: ")) {
      // Skip directives (not implemented in MVP)
      i++;
      while (i < lines.length && !lines[i]?.startsWith(":::")) {
        i++;
      }
      i++;
    } else if (line && line.trim() !== "") {
      html += `<p>${escapeHtml(line)}</p>\n`;
      i++;
    } else {
      i++;
    }
  }

  return html;
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error("Usage: generate-html <markdown-file> [output.html]");
    process.exit(1);
  }

  const inputFile = args[0]!;
  const outputFile = args[1] || "output.html";
  const resolvedInput = path.resolve(process.cwd(), inputFile);
  const resolvedOutput = path.resolve(process.cwd(), outputFile);

  if (!fs.existsSync(resolvedInput)) {
    console.error(`Error: File not found: ${inputFile}`);
    process.exit(1);
  }

  try {
    const markdown = fs.readFileSync(resolvedInput, "utf-8");
    const slides = parseSlides(markdown);

    if (slides.length === 0) {
      console.error("Error: No slides found in file");
      process.exit(1);
    }

    let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>slidesh Presentation</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .slides-container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .slide {
      background: white;
      border-radius: 12px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      padding: 60px;
      margin-bottom: 40px;
      min-height: 600px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .slide-number {
      text-align: right;
      color: #999;
      font-size: 0.9rem;
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }
    h1 {
      font-size: 2.5rem;
      color: #764ba2;
      margin-bottom: 30px;
      margin-top: 20px;
    }
    h2 {
      font-size: 2rem;
      color: #667eea;
      margin-bottom: 20px;
      margin-top: 20px;
    }
    h3 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 15px;
      margin-top: 15px;
    }
    p {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
      margin-bottom: 15px;
    }
    li {
      font-size: 1.1rem;
      line-height: 1.6;
      color: #555;
      margin-left: 30px;
      margin-bottom: 10px;
    }
    code {
      background: #f5f5f5;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: "Courier New", monospace;
      color: #d63384;
    }
    pre {
      background: #2d2d2d;
      color: #f8f8f2;
      padding: 15px;
      border-radius: 8px;
      overflow-x: auto;
      margin: 15px 0;
      font-family: "Courier New", monospace;
      font-size: 0.95rem;
    }
    pre code {
      background: none;
      color: inherit;
      padding: 0;
    }
  </style>
</head>
<body>
  <div class="slides-container">
`;

    slides.forEach((slide, index) => {
      const slideHtml = renderMarkdownToHtml(slide);
      html += `    <div class="slide">\n${slideHtml}      <div class="slide-number">Slide ${
        index + 1
      } / ${slides.length}</div>\n    </div>\n`;
    });

    html += `  </div>
</body>
</html>`;

    fs.writeFileSync(resolvedOutput, html);
    const sizeKb = (html.length / 1024).toFixed(2);
    console.log(
      `✅ Generated ${path.basename(outputFile)} with ${slides.length} slides (${sizeKb} KB)`
    );
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
