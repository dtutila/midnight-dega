import { useMemo, useState } from 'react';

interface YouTubeVideoProps {
  className?: string;
  title?: string;
}

const YouTubeVideo = ({ className = "", title = "YouTube video player" }: YouTubeVideoProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoUrl = import.meta.env.VITE_YOUTUBE_VIDEO_URL;
  
  const embedUrl = useMemo(() => {
    if (!videoUrl) {
      setHasError(true);
      return null;
    }
    
    try {
      // Extract video ID from YouTube URL with better regex
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/)?.[1];
      
      if (!videoId) {
        setHasError(true);
        return null;
      }
      
      return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    } catch (error) {
      console.error('Error processing YouTube URL:', error);
      setHasError(true);
      return null;
    }
  }, [videoUrl]);

  if (hasError || !embedUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('YouTube video URL not configured or invalid:', videoUrl);
    }
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full h-0 pb-[56.25%] rounded-xl overflow-hidden bg-gray-900">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 rounded-xl">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-arcade-purple"></div>
          </div>
        )}
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className="absolute top-0 left-0 w-full h-full rounded-xl"
        />
      </div>
    </div>
  );
};

export default YouTubeVideo;
