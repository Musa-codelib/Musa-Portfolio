"use client";

import { useState, useEffect } from "react";
import { portfolio } from "../data/portfolio";

export default function Contact() {
  const { contact } = portfolio;
  const [socialLinks, setSocialLinks] = useState(contact.socialLinks);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/bio")
      .then((r) => r.json())
      .then((data) => {
        if (data.socialLinks && data.socialLinks.length > 0) {
          setSocialLinks(data.socialLinks);
        }
      })
      .catch(() => {});
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contact.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    e.target.reset();
  };

  return (
    <section
      className="w-full px-5 md:px-12 py-16 bg-background"
      id="connect"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        <div className="w-full flex items-baseline justify-between border-b border-surface-container-high pb-2">
          <span className="font-label-mono text-[12px] font-medium text-secondary uppercase tracking-[0.14em]">
            {contact.sectionLabel}
          </span>
          <span className="font-label-mono text-[12px] font-medium text-secondary">
            {contact.sectionSubtitle}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: Email & Links */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h3 className="font-display font-semibold text-[72px] text-primary tracking-tight mb-6">
                {contact.headline}
              </h3>
              <p className="w-full font-body text-[18px] text-secondary max-w-md mb-8 leading-relaxed">
                {contact.description}
              </p>
              {/* Click to Copy Email Block */}
              <div
                onClick={handleCopyEmail}
                className="cursor-pointer bg-surface-container-lowest border border-primary p-6 flex items-center justify-between group transition-colors"
                title="Click to copy email"
                style={{
                  boxShadow: "0 12px 24px -4px rgba(0,0,0,0.12)",
                }}
              >
                <div className="flex flex-col">
                  <span className="font-label-mono text-[12px] font-medium text-secondary uppercase">
                    {contact.emailLabel}
                  </span>
                  <span className="font-display font-medium text-[24px] text-primary tracking-tight select-all">
                    {contact.email}
                  </span>
                </div>
                <div className="flex items-center gap-1 font-label-caps text-[11px] font-semibold uppercase text-primary">
                  {copied && (
                    <span className="font-label-mono text-[12px] font-medium text-secondary">
                      COPIED
                    </span>
                  )}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="mt-12 pt-6 border-t border-surface-container-high flex flex-wrap items-center gap-8 font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-secondary">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-primary transition-colors underline underline-offset-4"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleSubmit}
              className="bg-surface-container-lowest border border-surface-container-high p-8 md:p-12 flex flex-col gap-6"
              style={{
                boxShadow:
                  "0 16px 30px -4px rgba(0,0,0,0.14), 0 6px 12px -2px rgba(0,0,0,0.08)",
              }}
            >
              {contact.form.fields.map((field) => (
                <div key={field.name} className="flex flex-col gap-0.5">
                  <label className="font-label-caps text-[11px] font-semibold uppercase text-secondary">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      rows={4}
                      className="w-full p-4 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary resize-none"
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      required
                      className="w-full h-12 px-4 bg-surface-container-lowest border border-outline-variant text-primary font-body text-[15px] placeholder:text-outline focus:outline-none focus:border-primary"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="w-full h-12 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface-container-lowest hover:text-primary border border-primary transition-colors mt-2"
              >
                {contact.form.submitText}
              </button>
              {formSubmitted && (
                <div className="font-label-mono text-[12px] font-medium text-primary text-center">
                  {contact.form.successMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
