"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import VideoCardLong from "@/components/VideoCardLong";
import VideoCardShort from "@/components/VideoCardShort";

const TABS = [
  { id: "ai-tools", label: "AI Tools" },
  { id: "web", label: "Web" },
  { id: "video", label: "Video" },
];

export default function WorkCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryFromUrl = params.category;

  const [activeTab, setActiveTab] = useState(categoryFromUrl || "ai-tools");
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [videoFilter, setVideoFilter] = useState(["long", "short"]);

  const isValidTab = TABS.some((t) => t.id === activeTab);
  const effectiveTab = isValidTab ? activeTab : "ai-tools";

  const fetchData = useCallback(async (tab) => {
    setLoading(true);
    setError(null);
    try {
      if (tab === "video") {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data || []);
        setProjects([]);
      } else {
        const res = await fetch("/api/projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        const filtered = (data || []).filter((p) => p.section === tab);
        setProjects(filtered);
        setVideos([]);
      }
    } catch (err) {
      setError(err.message);
      setProjects([]);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(effectiveTab);
  }, [effectiveTab, fetchData]);

  const handleTabChange = (tabId) => {
    if (tabId === effectiveTab) return;
    setActiveTab(tabId);
    router.push(`/work/${tabId}`, { scroll: false });
  };

  const aiToolsFeatured = projects.find((p) => p.featured);
  const aiToolsSecondary = projects.filter((p) => !p.featured);

  const webFeatured = projects.find((p) => p.featured);
  const webRegular = projects.filter((p) => !p.featured);

  if (loading) {
    return (
      <section className="w-full px-5 md:px-12 py-16 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="font-body text-[14px] text-secondary">Loading projects...</span>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full px-5 md:px-12 py-16 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="font-body text-[16px] text-error mb-4">Failed to load projects</p>
          <p className="font-label-mono text-[12px] text-secondary mb-6">{error}</p>
          <button
            onClick={() => fetchData(effectiveTab)}
            className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-primary underline underline-offset-4 hover:text-secondary"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const hasContent = effectiveTab === "video"
    ? videos.length > 0
    : projects.length > 0;

  if (!hasContent) {
    return (
      <section className="w-full px-5 md:px-12 py-16 bg-background min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="font-body text-[16px] text-secondary mb-2">No projects yet</p>
          <p className="font-label-mono text-[12px] text-outline">Check back later for {TABS.find(t => t.id === effectiveTab)?.label} projects</p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full px-5 md:px-12 py-16 bg-background" id="work-category">
      <div className="max-w-7xl mx-auto">
        {/* Header: Back button left, Tabs right */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-y-4 border-b border-surface-container-high pb-2 mb-8">
          <Link
            href="/"
            className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary hover:text-primary transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="flex flex-wrap gap-6 font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`pb-0.5 transition-none ${
                  effectiveTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-secondary border-b-2 border-transparent hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* AI Tools Tab */}
          {effectiveTab === "ai-tools" && (
            <motion.div
              key="ai-tools"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {/* Featured Card */}
              {aiToolsFeatured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="bg-primary-container text-on-primary p-8 md:p-12 border border-primary flex flex-col justify-between card-hover mb-8"
                  style={{
                    boxShadow:
                      "0 16px 30px -4px rgba(0,0,0,0.22), 0 6px 12px -2px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                    <div>
                      <span className="font-label-mono text-[12px] font-medium text-on-primary-container uppercase tracking-[0.04em]">
                        {aiToolsFeatured.label}
                      </span>
                      <h4 className="font-display font-medium text-[44px] text-on-primary tracking-tight mt-0.5">
                        {aiToolsFeatured.title}
                      </h4>
                    </div>
                    <span className="self-start font-label-caps text-[11px] font-semibold uppercase border border-inverse-on-surface text-inverse-on-surface px-2 py-0.5">
                      {aiToolsFeatured.status}
                    </span>
                  </div>
                  <p className="w-full font-body text-[18px] text-secondary-fixed-dim max-w-3xl mb-12 leading-relaxed">
                    {aiToolsFeatured.description}
                  </p>
                  <div className="pt-6 border-t border-inverse-surface flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-1 font-label-mono text-[12px] font-medium text-on-primary-container">
                      {(aiToolsFeatured.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          className="bg-inverse-surface text-on-primary px-2 py-0.5 border border-on-surface-variant"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 font-label-caps text-[11px] font-semibold tracking-[0.14em]">
                      {(aiToolsFeatured.links || []).map((link) => (
                        <a
                          key={link.text}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-on-primary hover:text-secondary-fixed underline underline-offset-4"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Secondary Cards Grid - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {aiToolsSecondary.map((project, idx) => (
                  <motion.div
                    key={project._id || project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                    className="bg-surface-container-lowest border border-surface-container-high p-8 flex flex-col justify-between card-hover"
                    style={{
                      boxShadow:
                        "0 16px 30px -4px rgba(0,0,0,0.12), 0 6px 12px -2px rgba(0,0,0,0.08)",
                    }}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="font-label-mono text-[12px] font-medium text-secondary uppercase">
                          {project.id}
                        </span>
                        <span className="font-label-caps text-[11px] font-semibold uppercase border border-surface-container-high bg-surface-container-low text-secondary px-2 py-0.5">
                          {project.status}
                        </span>
                      </div>
                      <h5 className="font-display font-medium text-[24px] text-primary tracking-tight mb-1">
                        {project.title}
                      </h5>
                      <p className="font-body text-[15px] text-secondary mb-6 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-1 font-label-mono text-[12px] font-medium text-secondary pt-4 border-t border-surface-container-high">
                      {(project.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          className="border border-surface-container-high px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    {(project.links || []).length > 0 && (
                      <div className="mt-4 pt-4 border-t border-surface-container-high flex items-center gap-6 font-label-caps text-[11px] font-semibold tracking-[0.14em]">
                        {(project.links || []).map((link) => (
                          <a
                            key={link.text}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-primary hover:text-secondary underline underline-offset-4"
                          >
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Web Tab */}
          {effectiveTab === "web" && (
            <motion.div
              key="web"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {/* Featured Card */}
              {webFeatured && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                  className="bg-primary-container text-on-primary p-8 md:p-12 border border-primary flex flex-col justify-between card-hover mb-8"
                  style={{
                    boxShadow:
                      "0 16px 30px -4px rgba(0,0,0,0.22), 0 6px 12px -2px rgba(0,0,0,0.15)",
                  }}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                    <div>
                      <span className="font-label-mono text-[12px] font-medium text-on-primary-container uppercase tracking-[0.04em]">
                        {webFeatured.label}
                      </span>
                      <h4 className="font-display font-medium text-[44px] text-on-primary tracking-tight mt-0.5">
                        {webFeatured.title}
                      </h4>
                    </div>
                    <span className="self-start font-label-caps text-[11px] font-semibold uppercase border border-inverse-on-surface text-inverse-on-surface px-2 py-0.5">
                      {webFeatured.status}
                    </span>
                  </div>
                  <p className="w-full font-body text-[18px] text-secondary-fixed-dim max-w-3xl mb-12 leading-relaxed">
                    {webFeatured.description}
                  </p>
                  <div className="pt-6 border-t border-inverse-surface flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-1 font-label-mono text-[12px] font-medium text-on-primary-container">
                      {(webFeatured.techStack || []).map((tech) => (
                        <span
                          key={tech}
                          className="bg-inverse-surface text-on-primary px-2 py-0.5 border border-on-surface-variant"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-6 font-label-caps text-[11px] font-semibold tracking-[0.14em]">
                      {(webFeatured.links || []).map((link) => (
                        <a
                          key={link.text}
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-on-primary hover:text-secondary-fixed underline underline-offset-4"
                        >
                          {link.text}
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Regular Cards Grid - 3 columns */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {webRegular.map((project, idx) =>
                  project.isPlaceholder ? (
                    <motion.div
                      key={project._id || project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                      className="bg-surface-container-low border border-dashed border-surface-container-high p-8 flex flex-col justify-center items-center text-center"
                    >
                      <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.04em] mb-2">
                        {project.id}
                      </span>
                      <h5 className="font-display font-medium text-[24px] text-secondary tracking-tight mb-1">
                        {project.title}
                      </h5>
                      <p className="font-body text-[15px] text-outline max-w-sm">
                        {project.description}
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={project._id || project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                      className="bg-surface-container-lowest border border-surface-container-high flex flex-col card-hover rounded-xl overflow-hidden"
                      style={{
                        boxShadow:
                          "0 16px 30px -4px rgba(0,0,0,0.12), 0 6px 12px -2px rgba(0,0,0,0.08)",
                      }}
                    >
                      {project.imageUrl && (
                        <div className="w-full aspect-video bg-surface-container-high">
                          <img
                            className="w-full h-full object-cover"
                            src={project.imageUrl}
                            alt={project.imageAlt || project.title}
                          />
                        </div>
                      )}
                      <div className="p-8 flex flex-col justify-between flex-1 gap-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-label-mono text-[12px] font-medium text-secondary uppercase">
                              {project.id}
                            </span>
                            <span className="font-label-caps text-[11px] font-semibold uppercase text-primary border border-primary px-2 py-0.5">
                              {project.status}
                            </span>
                          </div>
                          <h5 className="font-display font-medium text-[24px] text-primary tracking-tight mb-1">
                            {project.title}
                          </h5>
                          <p className="font-body text-[15px] text-secondary leading-relaxed">
                            {project.description}
                          </p>
                        </div>
                        <div>
                          <div className="flex flex-wrap gap-1 font-label-mono text-[12px] font-medium text-secondary">
                            {(project.techStack || []).map((tech) => (
                              <span
                                key={tech}
                                className="border border-surface-container-high px-2 py-0.5"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="pt-4 border-t border-surface-container-high flex items-center gap-8 font-label-caps text-[11px] font-semibold tracking-[0.14em] mt-4">
                            {(project.links || []).map((link) => (
                              <a
                                key={link.text}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-primary hover:text-secondary underline underline-offset-4"
                              >
                                {link.text}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                )}
              </div>
            </motion.div>
          )}

          {/* Video Tab */}
          {effectiveTab === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              {/* Video Filter Toggles */}
              <div className="flex flex-wrap gap-3 justify-center mb-8">
                {["long", "short"].map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      setVideoFilter((prev) =>
                        prev.includes(type)
                          ? prev.filter((t) => t !== type)
                          : [...prev, type]
                      )
                    }
                    className={`font-label-caps text-[11px] font-semibold uppercase px-4 py-2 border transition-colors ${
                      videoFilter.includes(type)
                        ? "bg-primary text-on-primary border-primary"
                        : "bg-surface-container-low text-secondary border-surface-container-high hover:bg-surface-container"
                    }`}
                  >
                    {type === "long"
                      ? `LONG FORM ${videos.filter((v) => v.formType === "long").length}`
                      : `SHORT FORM ${videos.filter((v) => v.formType === "short").length}`}
                  </button>
                ))}
              </div>

              {/* Filtered Videos Grid */}
              {(() => {
                const filteredVideos = videos.filter((v) =>
                  videoFilter.includes(v.formType)
                );
                const longFiltered = filteredVideos.filter(
                  (v) => v.formType === "long"
                );
                const shortFiltered = filteredVideos.filter(
                  (v) => v.formType === "short"
                );

                return (
                  <>
                    {longFiltered.length > 0 && (
                      <div className="mb-12">
                        <h4 className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.04em] mb-6">
                          Long Form
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                          {longFiltered.map((video, idx) => (
                            <motion.div
                              key={video._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                            >
                              <VideoCardLong video={video} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {shortFiltered.length > 0 && (
                      <div>
                        <h4 className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.04em] mb-6">
                          Short Form
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                          {shortFiltered.map((video, idx) => (
                            <motion.div
                              key={video._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.2, delay: 0.1 + idx * 0.05 }}
                            >
                              <VideoCardShort video={video} />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {filteredVideos.length === 0 && (
                      <div className="text-center py-12">
                        <p className="font-body text-[16px] text-secondary">
                          No videos match the selected filters
                        </p>
                      </div>
                    )}
                  </>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}