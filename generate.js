const fs = require('fs');
const parser = require('./packages/parser/dist/index.js');

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderMarkdownToHtml(content) {
  const lines = content.split('\n');
  let html = '';
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line && line.startsWith('# ')) {
      html += `<h1>${escapeHtml(line.substring(2).trim())}</h1>\n`;
      i++;
    } else if (line && line.startsWith('## ')) {
      html += `<h2>${escapeHtml(line.substring(3).trim())}</h2>\n`;
      i++;
    } else if (line && line.startsWith('### ')) {
      html += `<h3>${escapeHtml(line.substring(4).trim())}</h3>\n`;
      i++;
    } else if (line && line.startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i] || '');
        i++;
      }
      html += `<pre><code>${escapeHtml(codeLines.join('\n'))}</code></pre>\n`;
      i++;
    } else if (line && line.startsWith('- ')) {
      html += `<li>${escapeHtml(line.substring(2).trim())}</li>\n`;
      i++;
    } else if (line && line.startsWith('::: ')) {
      i++;
      while (i < lines.length && !lines[i].startsWith(':::')) {
        i++;
      }
      i++;
    } else if (line && line.trim() !== '') {
      html += `<p>${escapeHtml(line)}</p>\n`;
      i++;
    } else {
      i++;
    }
  }

  return html;
}

const markdown = fs.readFileSync('presentation.md', 'utf-8');
const slides = parser.parseSlides(markdown);

console.log(`Parsed ${slides.length} slides from presentation.md`);

let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>slidesh - presentation.md</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 20px; }
    .slides-container { max-width: 1200px; margin: 0 auto; }
    .slide { background: white; border-radius: 12px; box-shadow: 0 20px 60px rgba(0,0,0,0.3); padding: 60px; margin-bottom: 40px; min-height: 600px; display: flex; flex-direction: column; justify-content: center; }
    .slide-number { text-align: right; color: #999; font-size: 0.9rem; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
    h1 { font-size: 2.5rem; color: #764ba2; margin-bottom: 30px; margin-top: 20px; }
    h2 { font-size: 2rem; color: #667eea; margin-bottom: 20px; margin-top: 20px; }
    h3 { font-size: 1.5rem; color: #333; margin-bottom: 15px; margin-top: 15px; }
    p { font-size: 1.1rem; line-height: 1.6; color: #555; margin-bottom: 15px; }
    li { font-size: 1.1rem; line-height: 1.6; color: #555; margin-left: 30px; margin-bottom: 10px; }
    code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font-family: "Courier New", monospace; color: #d63384; }
    pre { background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 8px; overflow-x: auto; margin: 15px 0; font-family: "Courier New", monospace; font-size: 0.95rem; }
    pre code { background: none; color: inherit; padding: 0; }
  </style>
</head>
<body>
  <div class="slides-container">
`;

slides.forEach((slide, index) => {
  const slideHtml = renderMarkdownToHtml(slide);
  html += `    <div class="slide">\n${slideHtml}      <div class="slide-number">Slide ${index + 1} / ${slides.length}</div>\n    </div>\n`;
});

html += `  </div>
</body>
</html>`;

fs.writeFileSync('presentation.html', html);
console.log(`✅ Generated presentation.html (${(html.length / 1024).toFixed(2)} KB)`);
