import React, { useRef, useState, useEffect } from "react";

interface DrivePlayerProps {
  src: string;
  title: string;
}

export default function DrivePlayer({ src, title }: DrivePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Use a target width of 960px to make the Google Drive player controls compact, neat, and not block the video.
  const targetWidth = 960;
  const targetHeight = 540;

  useEffect(() => {
    const container = containerRef.current;
    
    const updateScale = () => {
      if (container) {
        const containerWidth = container.offsetWidth;
        const newScale = containerWidth / targetWidth;
        setScale(newScale);
      }
    };

    // To prevent the browser from shifting/scrolling the container when the iframe gains focus/clicks
    const handleScroll = () => {
      if (container) {
        container.scrollLeft = 0;
        container.scrollTop = 0;
      }
    };

    updateScale();
    
    // Listen for any programmatic or focus-induced scroll events and snap them back
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
    }
    
    const observer = new ResizeObserver(updateScale);
    if (container) {
      observer.observe(container);
    }
    
    const timeout = setTimeout(updateScale, 150);

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const calculatedHeight = targetHeight * scale;

  return (
    <div
      ref={containerRef}
      className="w-full relative overflow-hidden rounded-2xl bg-slate-950 border border-slate-200/20 shadow-lg"
      style={{
        height: `${calculatedHeight > 0 ? calculatedHeight : 250}px`,
      }}
    >
      <div
        className="absolute top-0 left-0 origin-top-left"
        style={{
          width: `${targetWidth}px`,
          height: `${targetHeight}px`,
          transform: `scale(${scale})`,
        }}
      >
        <iframe
          src={src}
          title={title}
          className={`w-full h-full border-0 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-90"
          }`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        ></iframe>
      </div>

      {/* Loading overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-cyan border-t-transparent animate-spin"></div>
        </div>
      )}
    </div>
  );
}
