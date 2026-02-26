interface SlideProps {
  content: string;
}

export default function Slide({ content }: SlideProps): JSX.Element {
  // Parse markdown-like content to JSX
  const renderContent = () => {
    const lines = content.split("\n");
    const elements: JSX.Element[] = [];

    let i = 0;
    while (i < lines.length) {
      const line = lines[i];

      // Headings
      if (line?.startsWith("# ")) {
        elements.push(
          <h1 key={i}>{line.substring(2).trim()}</h1>
        );
        i++;
      } else if (line?.startsWith("## ")) {
        elements.push(
          <h2 key={i}>{line.substring(3).trim()}</h2>
        );
        i++;
      } else if (line?.startsWith("### ")) {
        elements.push(
          <h3 key={i}>{line.substring(4).trim()}</h3>
        );
        i++;
      }
      // Code blocks
      else if (line?.startsWith("```")) {
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i]?.startsWith("```")) {
          codeLines.push(lines[i] ?? "");
          i++;
        }
        elements.push(
          <pre key={i}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        i++;
      }
      // Paragraphs
      else if (line && line.trim() !== "") {
        elements.push(
          <p key={i}>{line}</p>
        );
        i++;
      } else {
        i++;
      }
    }

    return elements;
  };

  return <div className="slide-content">{renderContent()}</div>;
}
