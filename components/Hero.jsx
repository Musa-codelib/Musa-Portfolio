"use client"

import { useState, useEffect } from "react"
import { portfolio } from "../data/portfolio"

const phrases = ["AI Engineer.", "Video Editor.", "Builder."]

export default function Hero({ heroStats }) {
  const { hero } = portfolio
  const stats = heroStats || hero.stats

  const [currentPhrase, setCurrentPhrase] = useState(0)
  const [displayed, setDisplayed] = useState("")
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const phrase = phrases[currentPhrase]

    if (typing) {
      if (displayed.length < phrase.length) {
        const timeout = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1))
        }, 60)
        return () => clearTimeout(timeout)
      } else {
        const timeout = setTimeout(() => setTyping(false), 1800)
        return () => clearTimeout(timeout)
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, 30)
        return () => clearTimeout(timeout)
      } else {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length)
        setTyping(true)
      }
    }
  }, [displayed, typing, currentPhrase])

  return (
    <section className="w-full px-5 md:px-12 pt-12 md:pt-24 pb-12 md:pb-16 border-b border-surface-container-high bg-background">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col items-start w-full select-none">
          <span className="font-label-mono text-[12px] font-medium text-secondary mb-2 uppercase tracking-[0.14em]">
            {hero.indexLabel}
          </span>
          <h1 className="font-display font-bold text-[56px] md:text-[112px] text-primary tracking-tighter uppercase leading-none mb-4">
            {hero.name}
          </h1>
          <p className="w-full font-display font-medium text-[30px] md:text-[44px] text-secondary tracking-tight max-w-3xl mb-4 leading-tight min-h-[3rem] md:min-h-[4rem]">
            {displayed}
            <span className="animate-pulse">|</span>
          </p>
          <p className="w-full font-body text-[18px] text-on-surface max-w-2xl mb-8 leading-relaxed">
            {hero.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-16">
          <a
            href={hero.ctaPrimary.href}
            className="inline-flex items-center justify-center h-12 px-8 bg-primary text-on-primary font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] hover:bg-surface hover:text-primary border border-primary transition-colors"
          >
            {hero.ctaPrimary.text}
          </a>
          <a
            href={hero.ctaSecondary.href}
            className="font-label-caps text-[11px] font-semibold uppercase tracking-[0.14em] text-primary hover:text-secondary underline underline-offset-8 transition-colors"
          >
            {hero.ctaSecondary.text}
          </a>
        </div>

        <div className="w-full pt-4 border-t border-surface-container-high flex flex-wrap items-center justify-between gap-y-2 font-label-mono text-[12px] font-medium text-secondary tracking-[0.04em] uppercase">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-4">
              {index > 0 && <span className="hidden sm:inline">·</span>}
              <div>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
