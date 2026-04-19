"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Experience } from "@/lib/experiences";

type ExperienceDetailProps = {
  experience: Experience;
};

type Language = "fr" | "en";

const FlagFR = () => (
  <svg aria-hidden="true" width="16" height="12" viewBox="0 0 16 12">
    <rect width="16" height="12" rx="2" fill="#ffffff" />
    <rect width="5.4" height="12" rx="2" fill="#1a3d8f" />
    <rect x="10.6" width="5.4" height="12" rx="2" fill="#c11f2a" />
  </svg>
);

const FlagEN = () => (
  <svg aria-hidden="true" width="16" height="12" viewBox="0 0 16 12">
    <rect width="16" height="12" rx="2" fill="#012169" />
    <path d="M0 0 L16 12 M16 0 L0 12" stroke="#ffffff" strokeWidth="2.6" />
    <path d="M0 0 L16 12 M16 0 L0 12" stroke="#c8102e" strokeWidth="1.4" />
    <rect x="6.4" width="3.2" height="12" fill="#ffffff" />
    <rect y="4.4" width="16" height="3.2" fill="#ffffff" />
    <rect x="6.9" width="2.2" height="12" fill="#c8102e" />
    <rect y="4.9" width="16" height="2.2" fill="#c8102e" />
  </svg>
);

const copy = {
  fr: {
    back: "Retour a l'accueil",
    portfolio: "Portfolio",
    contact: "Contact",
    about: "Ce que cela dit de moi",
  },
  en: {
    back: "Back to home",
    portfolio: "Work",
    contact: "Contact",
    about: "What this says about me",
  },
};

export function ExperienceDetail({ experience }: ExperienceDetailProps) {
  const [language, setLanguage] = useState<Language>("fr");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeaderOnDark, setIsHeaderOnDark] = useState(false);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("siteLanguage");
    if (stored === "fr" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme='dark']")
    );
    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isDark = entries.some((entry) => entry.isIntersecting);
        setIsHeaderOnDark(isDark);
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLanguageChange = (next: Language) => {
    setLanguage(next);
    window.sessionStorage.setItem("siteLanguage", next);
  };

  const title = language === "fr" ? experience.title : experience.titleEn ?? experience.title;
  const label = language === "fr" ? experience.label : experience.labelEn ?? experience.label;
  const intro = language === "fr" ? experience.intro : experience.introEn ?? experience.intro;
  const details =
    language === "fr" ? experience.details : experience.detailsEn ?? experience.details;
  const labels = copy[language];
  const pdfUrl = experience.pdf ? encodeURI(experience.pdf) : null;

  return (
    <div className="relative">
      <header
        className={`pointer-events-none fixed left-0 right-0 top-0 z-30 bg-transparent transition-colors duration-300 ${
          isScrolled
            ? isHeaderOnDark
              ? "bg-[rgba(8,11,16,0.68)] backdrop-blur"
              : "bg-[rgba(237,232,221,0.88)] backdrop-blur"
            : ""
        }`}
      >
        <div className="flex w-full items-start justify-between px-5 py-4 sm:px-10">
          <span
            className={`pointer-events-auto display text-2xl leading-none tracking-tight transition-colors duration-300 sm:text-3xl ${
              isHeaderOnDark ? "text-[var(--paper)]" : "text-[var(--foreground)]"
            }`}
          >
            Cyprien Rubio
          </span>

          <div
            className={`pointer-events-auto flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
              isHeaderOnDark
                ? "border-[rgba(246,242,232,0.4)] text-[var(--paper)]"
                : "border-[rgba(21,21,20,0.25)] text-[var(--foreground)]"
            }`}
          >
            <button
              type="button"
              onClick={() => handleLanguageChange("fr")}
              aria-pressed={language === "fr"}
              className={`rounded-full px-2 py-1 transition ${
                language === "fr"
                  ? "bg-[rgba(181,72,47,0.18)]"
                  : "hover:bg-[rgba(21,21,20,0.08)]"
              }`}
            >
              <span className="pr-1 inline-flex">{FlagFR()}</span>FR
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange("en")}
              aria-pressed={language === "en"}
              className={`rounded-full px-2 py-1 transition ${
                language === "en"
                  ? "bg-[rgba(181,72,47,0.18)]"
                  : "hover:bg-[rgba(21,21,20,0.08)]"
              }`}
            >
              <span className="pr-1 inline-flex">{FlagEN()}</span>EN
            </button>
          </div>

          <nav
            className={`pointer-events-auto hidden transition-colors duration-300 sm:flex sm:flex-col sm:items-end sm:gap-0.5 sm:text-[11px] sm:font-semibold sm:uppercase sm:leading-none sm:tracking-[0.08em] ${
              isHeaderOnDark ? "text-[var(--paper)]" : "text-[var(--foreground)]"
            }`}
          >
            <Link className="link-underline" href="/#experiences">
              {labels.portfolio}
            </Link>
            <Link className="link-underline" href="/#contact">
              {labels.contact}
            </Link>
          </nav>

          <nav
            className={`pointer-events-auto flex gap-5 text-sm font-medium transition-colors duration-300 sm:hidden ${
              isHeaderOnDark ? "text-[var(--paper)]" : "text-[var(--foreground)]"
            }`}
          >
            <Link className="link-underline" href="/#experiences">
              {labels.portfolio}
            </Link>
            <Link className="link-underline" href="/#contact">
              {labels.contact}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto min-h-screen w-full max-w-[1180px] px-5 pb-12 pt-24 sm:px-10 sm:pt-28">
        <Link href="/" className="eyebrow link-underline">
          {labels.back}
        </Link>

        <section className="section-line mt-4 grid gap-7 py-7 sm:grid-cols-2 sm:py-10">
          <div className="space-y-4">
            <p className="eyebrow">{label}</p>
            <h1 className="display text-5xl leading-[0.92] sm:text-7xl">{title}</h1>
            <p className="max-w-xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              {intro}
            </p>
          </div>

          {experience.slug !== "cv" ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[rgba(35,35,35,0.24)]">
              <Image
                src={experience.image}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
        </section>

        {experience.slug === "cv" && pdfUrl ? (
          <section className="section-line py-8 sm:py-12">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="eyebrow">
                {language === "fr" ? "CV complet" : "Full resume"}
              </p>
              <a
                href={pdfUrl}
                download
                className="link-underline text-sm font-semibold uppercase tracking-[0.12em]"
              >
                {language === "fr" ? "Telecharger le PDF" : "Download PDF"}
              </a>
            </div>
            <div className="mt-6 h-[72vh] w-full overflow-hidden rounded-2xl border border-[rgba(35,35,35,0.24)] bg-[var(--paper)]">
              <iframe
                title={language === "fr" ? "CV de Cyprien Rubio" : "Cyprien Rubio resume"}
                src={pdfUrl}
                className="h-full w-full"
              />
            </div>
          </section>
        ) : null}

        <section className="section-line py-8 sm:py-12">
          <p className="eyebrow">{labels.about}</p>
          <ul className="mt-5 space-y-3 text-base leading-relaxed text-[var(--muted)] sm:text-lg">
            {details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
