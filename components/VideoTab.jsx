"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  extractYouTubeId,
  getThumbnailUrl,
  hasUploadedVideo,
} from "@/lib/videoUtils";

const ThumbnailDisplay = ({ video, onClick }) => {
  const videoRef = useRef(null);

  const handleVideoLoaded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, []);

  const thumbnailUrl = getThumbnailUrl(video);
  const showUploadedVideoFrame = !thumbnailUrl && hasUploadedVideo(video);

  return (
    <div className="relative w-full h-full group" onClick={onClick}>
      {/* Thumbnail or video frame */}
      {showUploadedVideoFrame ? (
        <video
          ref={videoRef}
          src={video.uploadedUrl}
          className="w-full h-full object-cover"
          preload="metadata"
          muted
          crossOrigin="anonymous"
          onLoadedMetadata={handleVideoLoaded}
        />
      ) : (
        <img
          src={thumbnailUrl || "/placeholder-video.png"}
          alt={video.title}
          className="w-full h-full object-cover object-center cursor-pointer"
        />
      )}

      {/* Hover overlay with play button */}
      <button
        className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors opacity-0 group-hover:opacity-100"
        aria-label={`Play ${video.title}`}
      >
        <svg
          className="w-16 h-16 text-white drop-shadow-lg"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </div>
  );
};

export default function VideoTab() {
  const [videoData, setVideoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [activeCardId, setActiveCardId] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState(["long"]);
  const [isHovered, setIsHovered] = useState(false);
  const autoRotateInterval = useRef(null);

  useEffect(() => {
    fetch("/api/videos")
      .then((r) => r.json())
      .then((data) => {
        setVideoData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredVideos = useMemo(() => {
    return videoData.filter((v) => selectedFilters.includes(v.formType));
  }, [selectedFilters, videoData]);

  // Auto-rotate carousel
  useEffect(() => {
    if (isHovered) {
      clearInterval(autoRotateInterval.current);
      return;
    }

    autoRotateInterval.current = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % filteredVideos.length);
    }, 3000);

    return () => clearInterval(autoRotateInterval.current);
  }, [isHovered, filteredVideos.length]);

  const activeVideo = filteredVideos[activeVideoIndex] || filteredVideos[0];

  const longCount = videoData.filter((v) => v.formType === "long").length;
  const shortCount = videoData.filter((v) => v.formType === "short").length;

  const handleNext = useCallback(() => {
    setActiveCardId(null);
    setActiveVideoIndex((prev) => (prev + 1) % filteredVideos.length);
  }, [filteredVideos.length]);

  const handlePrevious = useCallback(() => {
    setActiveCardId(null);
    setActiveVideoIndex((prev) =>
      prev === 0 ? filteredVideos.length - 1 : prev - 1
    );
  }, [filteredVideos.length]);

  const handleFilterToggle = useCallback((formType) => {
    setSelectedFilters([formType]);
    setActiveVideoIndex(0);
    setActiveCardId(null);
  }, []);

  const handleThumbnailClick = useCallback((index) => {
    setActiveVideoIndex(index);
  }, []);

  useEffect(() => {
    setActiveVideoIndex(0);
  }, [selectedFilters]);

  const getCardStyle = (index) => {
    const offset = index - activeVideoIndex;
    const absOffset = Math.abs(offset);
    const direction = offset > 0 ? 1 : offset < 0 ? -1 : 0;

    if (absOffset === 0) {
      return {
        x: 0,
        y: 0,
        scale: 1,
        rotateY: 0,
        zIndex: 10,
        opacity: 1,
        blur: 0,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
      };
    }

    if (absOffset === 1) {
      return {
        x: direction * 140,
        y: 15,
        scale: 0.82,
        rotateY: direction * 8,
        zIndex: 8,
        opacity: 0.85,
        blur: 0,
        boxShadow: "0 15px 30px -8px rgba(0, 0, 0, 0.25)",
      };
    }

    if (absOffset === 2) {
      return {
        x: direction * 240,
        y: 30,
        scale: 0.68,
        rotateY: direction * 12,
        zIndex: 6,
        opacity: 0.6,
        blur: 0,
        boxShadow: "0 10px 20px -6px rgba(0, 0, 0, 0.2)",
      };
    }

    return {
      x: direction * 300,
      y: 45,
      scale: 0.55,
      rotateY: direction * 15,
      zIndex: 4,
      opacity: 0.3,
      blur: 0,
      boxShadow: "0 5px 10px -4px rgba(0, 0, 0, 0.15)",
    };
  };

  return (
    <div className="flex flex-col gap-6 mt-4">
      {loading ? (
        <div className="flex items-center justify-center h-[400px]">
          <span className="font-body text-[14px] text-secondary">Loading videos...</span>
        </div>
      ) : videoData.length === 0 ? (
        <div className="flex items-center justify-center h-[400px]">
          <span className="font-body text-[14px] text-secondary">No videos available.</span>
        </div>
      ) : (
        <>
        {/* Filter Badges */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleFilterToggle("long")}
            className={`font-label-caps text-[11px] font-semibold tracking-[0.14em] px-4 py-2 border transition-all duration-200 ${
              selectedFilters.includes("long")
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container-lowest text-secondary border-surface-container-high hover:bg-surface-container-low"
            }`}
          >
            LONG FORM {longCount}
          </button>
          <button
            onClick={() => handleFilterToggle("short")}
            className={`font-label-caps text-[11px] font-semibold tracking-[0.14em] px-4 py-2 border transition-all duration-200 ${
              selectedFilters.includes("short")
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-container-lowest text-secondary border-surface-container-high hover:bg-surface-container-low"
            }`}
          >
            SHORT FORM {shortCount}
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Panel - Details */}
          <div className="lg:w-[40%] relative z-50">
            <div
              className="bg-surface-container-lowest border border-surface-container-high p-8 h-full flex flex-col"
              style={{
                boxShadow:
                  "0 16px 30px -4px rgba(0,0,0,0.12), 0 6px 12px -2px rgba(0,0,0,0.08)",
              }}
            >
              <AnimatePresence mode="wait">
                {activeVideo && (
                  <motion.div
                    key={activeVideo.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="flex flex-col flex-1"
                  >
                    <div className="mb-6">
                      <span className="font-label-mono text-[12px] font-medium text-secondary tracking-[0.04em]">
                        Made for {activeVideo.channelName || "YouTube"}
                      </span>
                      <h3 className="font-display font-medium text-[28px] text-primary tracking-tight mt-1 leading-snug">
                        {activeVideo.title}
                      </h3>
                    </div>

                    <div className="border-t border-surface-container-high" />

                    <div className="grid grid-cols-3 gap-4 py-6">
                      <div className="text-center">
                        <span className="font-display font-medium text-[22px] text-primary block">
                          {activeVideo.views}
                        </span>
                        <span className="font-label-mono text-[11px] font-medium text-secondary uppercase">
                          views
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-display font-medium text-[22px] text-primary block">
                          {activeVideo.likes}
                        </span>
                        <span className="font-label-mono text-[11px] font-medium text-secondary uppercase">
                          likes
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="font-display font-medium text-[22px] text-primary block">
                          {activeVideo.comments}
                        </span>
                        <span className="font-label-mono text-[11px] font-medium text-secondary uppercase">
                          comments
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-surface-container-high" />

                    <div className="flex flex-col gap-4 py-6">
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-[12px] font-medium text-secondary uppercase">
                          Category
                        </span>
                        <span className="font-body text-[14px] text-primary">
                          {activeVideo.category}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-label-mono text-[12px] font-medium text-secondary uppercase">
                          Software
                        </span>
                        <span className="font-body text-[14px] text-primary">
                          {activeVideo.software}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-surface-container-high" />

                    <div className="border-t border-surface-container-high" />

                    <div className="flex items-center justify-between pt-4">
                      <span className="font-label-mono text-[12px] font-medium text-secondary uppercase">
                        Date
                      </span>
                      <span className="font-body text-[14px] text-primary">
                        {activeVideo.date || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-auto">
                      <span />
                      <a
                        href={activeVideo.link?.url}
                        target="_blank"
                        rel="noreferrer"
                        className="font-label-caps text-[11px] font-semibold tracking-[0.14em] text-primary hover:text-secondary underline underline-offset-4"
                      >
                        {activeVideo.link?.text || "link_to_video"}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Panel - Carousel */}
          <div
            className="lg:w-[60%] relative z-0 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div
              className="relative h-[480px] flex items-center justify-center overflow-visible w-full mx-auto"
              style={{ perspective: "1200px" }}
            >
              {filteredVideos.map((video, index) => {
                const style = getCardStyle(index);
                const isActive = index === activeVideoIndex;
                const offset = index - activeVideoIndex;
                const absOffset = Math.abs(offset);

                if (absOffset > 3) return null;

                return (
                  <motion.div
                    key={video._id}
                    className="absolute"
                    animate={{
                      x: style.x,
                      y: style.y,
                      scale: style.scale,
                      rotateY: style.rotateY,
                      zIndex: style.zIndex,
                      opacity: style.opacity,
                      filter: `blur(${style.blur}px)`,
                    }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    style={{
                      width: video.formType === "short" ? "280px" : "68%",
                      left: "50%",
                      marginLeft: video.formType === "short" ? "-140px" : "-34%",
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div
                      className={`rounded-2xl overflow-hidden bg-surface-container-high relative flex items-center justify-center ${
                        video.formType === "short" ? "" : "aspect-video"
                      }`}
                      style={{
                        boxShadow: style.boxShadow,
                        height: video.formType === "short" ? "450px" : undefined,
                      }}
                    >
                      {activeCardId === video._id ? (
                        <div className="w-full h-full relative">
                          {video.uploadedUrl ? (
                            <video
                              src={video.uploadedUrl}
                              className="w-full h-full object-cover"
                              autoPlay
                              controls
                              loop
                              onClick={() => setActiveCardId(null)}
                            />
                          ) : video.ytUrl && extractYouTubeId(video.ytUrl) ? (
                            <iframe
                              src={`https://www.youtube.com/embed/${extractYouTubeId(video.ytUrl)}?autoplay=1`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title={video.title}
                            />
                          ) : null}
                        </div>
                      ) : (
                        <ThumbnailDisplay video={video} onClick={() => setActiveCardId(video._id)} />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Arrow Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={handlePrevious}
                className="h-11 w-11 flex items-center justify-center bg-primary text-on-primary font-label-caps text-[14px] font-semibold border border-primary hover:bg-surface hover:text-primary transition-colors rounded-full"
              >
                ←
              </button>
              <span className="font-label-mono text-[12px] font-medium text-secondary min-w-[50px] text-center">
                {activeVideoIndex + 1} / {filteredVideos.length}
              </span>
              <button
                onClick={handleNext}
                className="h-11 w-11 flex items-center justify-center bg-primary text-on-primary font-label-caps text-[14px] font-semibold border border-primary hover:bg-surface hover:text-primary transition-colors rounded-full"
              >
                →
              </button>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}