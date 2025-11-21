import { useEffect, useState } from "react";


interface PreloaderProps {
  videoSrc: string;
  onEnd: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ videoSrc, onEnd }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVideoLoaded(true);
      onEnd();
    }, 4000); // Fallback timeout in case the video doesn't end

    return () => clearTimeout(timer);
  }, [onEnd]);

  if (isVideoLoaded) return null; // Unmount preloader when done

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        zIndex: 1301,
        pointerEvents: "none", // Prevent blocking interaction
      }}
      aria-label="Loading..."
      role="status"
    >
      <video
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={() => {
          setIsVideoLoaded(true);
          onEnd();
        }}
        style={{
          maxWidth: "100vw",
          maxHeight: "100vh",
          objectFit: "cover",
          display: "block",
        }}
        preload="auto"
      />
    </div>
  );
};

export default Preloader;
