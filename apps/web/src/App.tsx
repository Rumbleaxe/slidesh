import { useEffect, useState } from "react";
import { parseSlides } from "@slidesh/parser";
import Slide from "./Slide";

export default function App(): JSX.Element {
  const [slides, setSlides] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load example.md from public folder
    fetch("/example.md")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load example.md");
        return res.text();
      })
      .then((markdown) => {
        const parsed = parseSlides(markdown);
        setSlides(parsed);
      })
      .catch((err: unknown) => {
        const errorMessage = err instanceof Error ? err.message : String(err);
        setError(`Error loading slides: ${errorMessage}`);
      });
  }, []);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        previousSlide();
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [currentIndex, slides.length]);

  const nextSlide = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const previousSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (error) {
    return (
      <div className="slide-container">
        <div className="slide-content" style={{ color: "red" }}>
          <h1>Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="slide-container">
        <div className="slide-content">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="slide-container">
      <Slide content={slides[currentIndex] ?? ""} />

      <div className="slide-footer">
        <span>{currentIndex + 1} / {slides.length}</span>
        <div className="slide-nav">
          <button onClick={previousSlide} disabled={currentIndex === 0}>
            ← Previous
          </button>
          <button
            onClick={nextSlide}
            disabled={currentIndex === slides.length - 1}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="keyboard-hint">
        💡 Tip: Use arrow keys to navigate
      </div>
    </div>
  );
}
