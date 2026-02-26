/**
 * Parse Markdown slides separated by --- delimiters
 * @param markdown - The markdown content
 * @returns Array of slide content strings
 */
export function parseSlides(markdown: string): string[] {
  // Split by --- at start of line
  const slides = markdown.split(/^---$/m);

  // Trim whitespace from each slide
  const trimmed = slides.map((slide) => slide.trim());

  // Filter out leading and trailing empty slides
  let start = 0;
  let end = trimmed.length;

  while (start < end && trimmed[start] === "") {
    start++;
  }

  while (end > start && trimmed[end - 1] === "") {
    end--;
  }

  return trimmed.slice(start, end);
}
