"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  extractYouTubeId,
  getThumbnailUrl,
  hasCustomThumbnail,
  hasYouTubeThumbnail,
  hasUploadedVideo,
} from "@/lib/videoUtils";

export default function VideoCardLong({ video }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleClick = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const handleClose = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  }, []);

  const thumbnailUrl = getThumbnailUrl(video);
  const showUploadedVideoFrame = !thumbnailUrl && hasUploadedVideo(video);

  return (
    <div className="relative bg-surface-container-lowest border border-surface-container-high card-hover rounded-xl overflow-hidden">
      <div className="aspect-video relative group">
        {/* Thumbnail or video frame */}
        {!isPlaying && (
          <>
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
                className="w-full h-full object-cover"
              />
            )}
          </>
        )}

        {/* Hover overlay with play button */}
        {!isPlaying && (
          <button
            onClick={handleClick}
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
        )}

        <AnimatePresence mode="wait">
          {isPlaying && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10"
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/60 hover:bg-black/80 rounded-full text-white transition-colors"
                aria-label="Close video"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute inset-0 flex items-center justify-center">
                {video.uploadedUrl ? (
                  <video
                    src={video.uploadedUrl}
                    className="w-full h-full max-w-full max-h-full"
                    autoPlay
                    controls
                    loop
                  />
                ) : video.ytUrl && extractYouTubeId(video.ytUrl) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(video.ytUrl)}?autoplay=1`}
                    className="w-full h-full max-w-[1200px] max-h-[675px] rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                ) : null}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 flex flex-col gap-4">
        <div>
          <p className="font-label-mono text-[11px] text-secondary uppercase tracking-[0.04em] mb-1">
            Made for {video.channelName}
          </p>
          <h3 className="font-display font-semibold text-[20px] text-primary tracking-tight">
            {video.title}
          </h3>
        </div>

        <div className="border-t border-surface-container-high pt-4 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="font-body text-[14px] text-primary block">{video.views?.toLocaleString() || "0"}</span>
              <p className="font-label-mono text-[11px] text-secondary uppercase tracking-[0.04em]">Views</p>
            </div>
            <div>
              <span className="font-body text-[14px] text-primary block">{video.likes?.toLocaleString() || "0"}</span>
              <p className="font-label-mono text-[11px] text-secondary uppercase tracking-[0.04em]">Likes</p>
            </div>
            <div>
              <span className="font-body text-[14px] text-primary block">{video.comments?.toLocaleString() || "0"}</span>
              <p className="font-label-mono text-[11px] text-secondary uppercase tracking-[0.04em]">Comments</p>
            </div>
          </div>

          <div className="border-t border-surface-container-high pt-4">
            <p className="font-label-mono text-[11px] text-secondary uppercase tracking-[0.04em] mb-1">
              {video.category}
            </p>
            <p className="font-body text-[14px] text-primary">{video.software}</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-label-mono text-[11px] text-secondary uppercase tracking-[0.04em]">
              {video.date || video.year}
            </span>
            <a
              href={video.link?.url || video.ytUrl}
              target="_blank"
              rel="noreferrer"
              className="font-label-caps text-[11px] font-semibold text-primary underline underline-offset-4 hover:text-secondary transition-colors"
            >
              {video.link?.text || "Watch on YouTube"} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}