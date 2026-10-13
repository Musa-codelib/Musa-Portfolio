"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ViewAllButton from "./ViewAllButton";
import VideoTab from "./VideoTab";
import { portfolio } from "../data/portfolio";

export default function Work({ projects, videoArchiveLinks }) {
  const work = portfolio.work;
  const archiveLinks = videoArchiveLinks || work.projects.video.archiveLinks;
  const [activeTab, setActiveTab] = useState("ai-tools");

  const hasDbData = projects !== null && projects !== undefined;

  const aiToolsFeatured = hasDbData
    ? projects.find((p) => p.section === "ai-tools" && p.featured)
    : work.projects["ai-tools"].featured;
  const aiToolsSecondary = hasDbData
    ? projects.filter((p) => p.section === "ai-tools" && !p.featured)
    : work.projects["ai-tools"].secondary;
  const videoProjects = hasDbData
    ? projects.filter((p) => p.section === "video")
    : work.projects.video.projects;
  const webProjects = hasDbData
    ? projects.filter((p) => p.section === "web")
    : work.projects.web.projects;

  const webFeatured = hasDbData
    ? projects.find((p) => p.section === "web" && p.featured)
    : null;
  const webRegular = hasDbData
    ? projects.filter((p) => p.section === "web" && !p.featured)
    : webProjects;

  const featured = aiToolsFeatured;
  const secondary = aiToolsSecondary;
  const video = videoProjects;
  const web = webProjects;

  return (
    <section
      className="w-full px-5 md:px-12 py-16 border-b border-surface-container-high bg-background"
      id="selected-work"
    >
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="w-full flex flex-col sm:flex-row sm:items-baseline justify-between gap-y-4 border-b border-surface-container-high pb-2">
          <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.14em]">
            {work.sectionLabel}
          </span>
          <div className="flex items-center gap-6 font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em]">
            {work.tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-0.5 transition-none ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-secondary border-b-2 border-transparent hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <ViewAllButton href={`/work/${activeTab}`} />
        </div>

        {/* AI Tools Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "ai-tools" && (
            <motion.div
              key="ai-tools"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col gap-8 mt-4"
            >
            {/* Featured Card */}
            {featured && (
              <div
                className="bg-primary-container text-on-primary p-8 md:p-12 border border-primary flex flex-col justify-between card-hover"
                style={{
                  boxShadow:
                    "0 16px 30px -4px rgba(0,0,0,0.22), 0 6px 12px -2px rgba(0,0,0,0.15)",
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
                  <div>
                    <span className="font-label-mono text-[12px] font-medium text-on-primary-container uppercase tracking-[0.04em]">
                      {featured.label}
                    </span>
                    <h4 className="font-display font-medium text-[44px] text-on-primary tracking-tight mt-0.5">
                      {featured.title}
                    </h4>
                  </div>
                  <span className="self-start font-label-caps text-[11px] font-semibold uppercase border border-inverse-on-surface text-inverse-on-surface px-2 py-0.5">
                    {featured.status}
                  </span>
                </div>
                <p className="w-full font-body text-[18px] text-secondary-fixed-dim max-w-3xl mb-12 leading-relaxed">
                  {featured.description}
                </p>
                <div className="pt-6 border-t border-inverse-surface flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex flex-wrap gap-1 font-label-mono text-[12px] font-medium text-on-primary-container">
                    {(featured.techStack || []).map((tech) => (
                      <span
                        key={tech}
                        className="bg-inverse-surface text-on-primary px-2 py-0.5 border border-on-surface-variant"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 font-label-caps text-[11px] font-semibold tracking-[0.14em]">
                    {(featured.links || []).map((link) => (
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
              </div>
            )}

            {/* Secondary Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {secondary.slice(0, featured ? 2 : 4).map((project) => (
                <div
                  key={project._id || project.id}
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
                </div>
              ))}
            </div>
          </motion.div>
        )}
        </AnimatePresence>

        {/* Video Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "video" && (
            <motion.div
              key="video"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="mt-4"
            >
              <VideoTab />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Web Tab */}
        <AnimatePresence mode="wait">
          {activeTab === "web" && (
            <motion.div
              key="web"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex flex-col gap-8 mt-4"
            >
            {/* Featured Card */}
            {webFeatured && (
              <div
                className="bg-primary-container text-on-primary p-8 md:p-12 border border-primary flex flex-col justify-between card-hover"
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
              </div>
            )}

            {/* Regular Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {webRegular.slice(0, webFeatured ? 2 : 4).map((project) =>
                project.isPlaceholder ? (
                  <div
                    key={project._id || project.id}
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
                  </div>
                ) : (
                  <div
                    key={project._id || project.id}
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
                  </div>
                )
              )}
            </div>
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
}