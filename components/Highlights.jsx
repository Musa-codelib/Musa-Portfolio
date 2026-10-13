"use client"

import { useState } from "react"

function getYouTubeId(url) {
  const match = url.match(/(?:v=|youtu\.be\/)([^&\n?#]+)/)
  return match ? match[1] : null
}

const DEFAULT_COLORS = ["#f98888", "#e6e6e6"]

function AiToolTemplate({ data }) {
  const [isHovered, setIsHovered] = useState(false)

  const animationEnabled = data.animationEnabled !== false
  const colors = (data.gradientColors && data.gradientColors.length >= 2)
    ? data.gradientColors
    : DEFAULT_COLORS

  const gradientStyle = animationEnabled
    ? {
        background: `radial-gradient(ellipse at center, ${colors[0]}, ${colors[1]})`,
        backgroundSize: "400% 400%",
        animation: "gradientShift 9s ease infinite",
      }
    : {
        background: "#e3e3de",
      }

  return (
    <section
      className="w-full px-5 md:px-12 py-16 border-b border-surface-container-high relative overflow-hidden"
      style={gradientStyle}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-[1200ms] ease-out"
        style={{
          background: "#e3e3de",
          opacity: isHovered && animationEnabled ? 1 : 0,
        }}
      />
      <div className="relative z-10" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.14em]">
              01 / HIGHLIGHTS
            </span>

            <h2 className="font-display font-bold text-[48px] md:text-[64px] text-primary tracking-tight leading-none">
              {data.title}
            </h2>

            <p className="font-body text-[18px] text-secondary leading-relaxed">
              {data.description}
            </p>

            {/* Latest App */}
            <div className="flex flex-col gap-3">
              <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
                Latest Release
              </span>
              <div className="flex items-start gap-4">
                {data.latestApp?.iconUrl ? (
                  <a
                    href={data.latestApp.downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-20 h-20 relative"
                  >
<img
                      src={data.latestApp.iconUrl}
                      alt="App icon"
                      className="w-20 h-20 object-cover rounded-lg drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]"
                    />
                    {data.latestApp?.version && (
                      <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-primary text-on-primary font-label-mono text-[10px] font-medium rounded-full">
                        {data.latestApp.version}
                      </span>
                    )}
                  </a>
                ) : (
                  <div className="w-20 h-20 bg-surface-container-high border border-surface-container-high flex items-center justify-center rounded-lg">
                    <span className="font-label-mono text-[10px] text-secondary">ICON</span>
                  </div>
                )}
              </div>
            </div>

            {/* Legacy Apps */}
            {data.legacyApps && data.legacyApps.length > 0 && (
              <div className="flex flex-col gap-3">
                <span className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
                  Legacy Versions
                </span>
                <div className="flex flex-wrap gap-4">
                  {data.legacyApps.map((app, i) => (
                    <a
                      key={i}
                      href={app.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 cursor-pointer"
                    >
{app.iconUrl ? (
                        <img
                          src={app.iconUrl}
                          alt={`Legacy ${app.version}`}
                          className="w-16 h-16 object-cover rounded-lg drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-surface-container-high flex items-center justify-center rounded-lg">
                          <span className="font-label-mono text-[10px] text-secondary">ICON</span>
                        </div>
                      )}
                      <span className="font-label-mono text-[11px] text-secondary">
                        {app.version}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Download Links Row */}
            <div className="flex items-center gap-8 mt-4">
              {data.latestApp?.downloadUrl && (
                <a
                  href={data.latestApp.downloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-primary underline underline-offset-4 hover:text-secondary transition-colors"
                >
                  DOWNLOAD LATEST →
                </a>
              )}
              {data.legacyAllUrl && (
                <a
                  href={data.legacyAllUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-primary underline underline-offset-4 hover:text-secondary transition-colors"
                >
                  ALL LEGACY APPS →
                </a>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <span className="font-display font-medium text-[24px] text-secondary tracking-tight">
              • Watch tutorial
            </span>

            {/* Video Player */}
            <div
              style={{
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 16px 40px -8px rgba(0,0,0,0.25), 0 8px 16px -4px rgba(0,0,0,0.15)"
              }}
              className="bg-black border border-black"
            >
              {data.video?.type === "youtube" && data.video?.youtubeUrl ? (
                <iframe
                  src={`https://www.youtube.com/embed/${getYouTubeId(data.video.youtubeUrl)}`}
                  className="w-full aspect-video block"
                  style={{ display: "block", borderRadius: 0 }}
                  allowFullScreen
                  title={data.video?.title || "Tutorial video"}
                />
              ) : data.video?.type === "upload" && data.video?.uploadedUrl ? (
                <video
                  controls
                  loop
                  autoPlay
                  muted
                  className="w-full aspect-video block"
                  style={{ display: "block", borderRadius: 0 }}
                  src={data.video.uploadedUrl}
                />
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-[#1a1a1a]">
                  <span className="font-label-mono text-[12px] text-secondary">No video</span>
                </div>
              )}

              {/* Video Footer */}
              <div className="p-4 flex items-start gap-3">
                {data.video?.channelLogoUrl ? (
                  <img
                    src={data.video.channelLogoUrl}
                    alt="channel"
                    className="w-8 h-8 rounded-full object-cover drop-shadow-[0_3px_10px_rgba(0,0,0,0.5)]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-primary font-label-caps text-[11px]">
                    MK
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <span className="font-body text-[14px] text-white font-medium leading-tight">
                    {data.video?.title || "Tutorial video"}
                  </span>
                  <span className="font-label-mono text-[11px] text-outline-variant">
                    {data.video?.channel || "mkodes"} · {data.video?.views || ""} {data.video?.timeAgo ? `· ${data.video.timeAgo}` : ""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}

export default function Highlights({ highlights }) {
  if (!highlights || highlights.length === 0) return null

  const highlight = highlights[0]
  if (highlight.template === "ai-tool") return <AiToolTemplate data={highlight} />
  return null
}
