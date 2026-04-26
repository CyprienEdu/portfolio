"use client";

import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { experiences, type Experience } from "@/lib/experiences";
import { Reveal } from "./reveal";

gsap.registerPlugin(ScrollTrigger);

const stripePositions = [
  "12% center",
  "34% center",
  "58% center",
  "82% center",
  "16% center",
  "42% center",
  "68% center",
  "88% center",
  "22% center",
  "47% center",
  "71% center",
  "91% center",
];

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

const featuredSlugs = ["stage-marketing", "voyage-photo", "podcast"];

const capabilities = {
  fr: [
    "Stratégie digitale & positionnement",
    "Content marketing & storytelling",
    "Social media & personal branding",
    "Automations CRM & campagnes email",
    "Création de sites vitrine (Next.js)",
    "Analyse & optimisation des performances",
  ],
  en: [
    "Digital strategy & positioning",
    "Content marketing & storytelling",
    "Social media & personal branding",
    "CRM automations & email campaigns",
    "Showcase websites (Next.js)",
    "Performance analysis & optimization",
  ],
};

const contactDetails = {
  email: "cyprien.rubio@tsm-education.fr",
  phoneRaw: "+33628568580",
  phoneDisplay: "06 28 56 85 80",
  linkedinUrl: "https://www.linkedin.com/in/cyprien-rubio-540947290/",
  city: "Toulouse, France",
  timezone: "GMT+1 / CET",
};

export function PortfolioPage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const pageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railTriggerRef = useRef<ScrollTrigger | null>(null);
  const railDistanceRef = useRef(0);
  const isSnappingRef = useRef(false);
  const isDraggingRef = useRef(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    isActive: false,
    lastX: 0,
    totalX: 0,
  });
  const [isDragging, setIsDragging] = useState(false);
  const [isHeaderOnDark, setIsHeaderOnDark] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isSummaryPinned, setIsSummaryPinned] = useState(false);
  const [language, setLanguage] = useState<"fr" | "en">("fr");
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null);
  const [openExperienceSlug, setOpenExperienceSlug] = useState<string | null>(null);
  const headerOnDark = isHeaderOnDark || isSummaryPinned;
  const featuredExperiences = experiences.filter((experience) =>
    featuredSlugs.includes(experience.slug)
  );
  const otherExperiences = experiences.filter(
    (experience) => !featuredSlugs.includes(experience.slug)
  );

  const smoothTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleExploreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    smoothTo("experiences");
  };

  const handleLanguageChange = (next: "fr" | "en") => {
    setLanguage(next);
    window.sessionStorage.setItem("siteLanguage", next);
  };

  const scrollCarouselToSlug = (slug: string) => {
    const rail = railRef.current;
    const track = trackRef.current;
    const trigger = railTriggerRef.current;
    const distance = railDistanceRef.current;

    if (!rail || !track || !trigger || distance <= 0) {
      return;
    }

    const card = track.querySelector<HTMLElement>(`[data-experience-card][data-slug="${slug}"]`);
    if (!card) {
      return;
    }

    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const railWidth = rail.clientWidth;
    const getEndPadding = () => Math.round(railRef.current!.clientWidth * 0.25);
    const targetX = -1 * (cardLeft - (railWidth - cardWidth) / 2) - getEndPadding();
    const clampedX = Math.min(0, Math.max(-distance, targetX));
    const progress = distance === 0 ? 0 : -clampedX / distance;
    const targetY = trigger.start + progress * (trigger.end - trigger.start);

    window.scrollTo({ top: targetY, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (!pageRef.current || !trackRef.current || !railRef.current) {
      return;
    }

    let removeTicker: (() => void) | null = null;

    const snapToSection = (id: string) => {
      const section = document.getElementById(id);
      if (!section || isSnappingRef.current) {
        return;
      }

      isSnappingRef.current = true;
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => {
        isSnappingRef.current = false;
      }, 760);
    };

    const handlePageShow = () => {
      setHoveredId(null);
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    const context = gsap.context(() => {
      gsap.from("[data-hero-line]", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.09,
        duration: 1.1,
        ease: "power4.out",
      });

      gsap.to("[data-hero-parallax]", {
        yPercent: -16,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: "#home",
        start: "top top",
        end: "bottom top",
        onLeave: () => snapToSection("experiences"),
      });

      ScrollTrigger.create({
        trigger: railRef.current,
        start: "top top",
        end: "bottom bottom",
        onEnter: () => setIsHeaderOnDark(true),
        onLeave: () => setIsHeaderOnDark(false),
        onEnterBack: () => setIsHeaderOnDark(true),
        onLeaveBack: () => setIsHeaderOnDark(false),
      });

      ScrollTrigger.create({
        trigger: "#experiences",
        start: "bottom 78%",
        end: "bottom 40%",
        onLeave: () => snapToSection("capabilities"),
      });

      ScrollTrigger.create({
        trigger: "#capabilities",
        start: "top 78%",
        end: "top 35%",
        onEnterBack: () => snapToSection("experiences"),
      });

      ScrollTrigger.create({
        trigger: "#capabilities",
        start: "bottom 78%",
        end: "bottom 40%",
        onLeave: () => snapToSection("experience-list"),
      });

      ScrollTrigger.create({
        trigger: "#experience-list",
        start: "top 78%",
        end: "top 35%",
        onEnterBack: () => snapToSection("capabilities"),
      });

      ScrollTrigger.create({
        trigger: "#experience-list",
        start: "bottom 78%",
        end: "bottom 40%",
        onLeave: () => snapToSection("contact"),
      });

      ScrollTrigger.create({
        trigger: "#contact",
        start: "top 78%",
        end: "top 35%",
        onEnterBack: () => snapToSection("experience-list"),
      });

      gsap.utils.toArray<HTMLElement>("[data-experience-card]").forEach((card) => {
        gsap.from(card, {
          y: 42,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
          },
        });
      });

      const getDistance = () =>
        Math.max(0, trackRef.current!.scrollWidth - railRef.current!.clientWidth);
      const getEndPadding = () => Math.round(railRef.current!.clientWidth * 0.25);
      let distance = getDistance() + getEndPadding();
      railDistanceRef.current = distance;
      let targetX = 0;
      let currentX = 0;
      let lastX = 0;
      const quickSetTrack = gsap.quickSetter(trackRef.current, "x", "px");
      const cardSetters = gsap.utils
        .toArray<HTMLElement>("[data-experience-card]")
        .map((card) => ({
          setX: gsap.quickSetter(card, "x", "px"),
          setScale: gsap.quickSetter(card, "scale"),
          setFilter: gsap.quickSetter(card, "filter"),
        }));

      const railTrigger = ScrollTrigger.create({
        trigger: railRef.current,
        start: "top top",
        end: () => `+=${distance * 1.2 + window.innerHeight * 0.85}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          targetX = -self.progress * distance;
        },
        onRefresh: (self) => {
          distance = getDistance() + getEndPadding();
          railDistanceRef.current = distance;
          targetX = -self.progress * distance;
          currentX = targetX;
          lastX = targetX;
          quickSetTrack(currentX);
        },
        onToggle: (self) => {
          setIsSummaryPinned(self.isActive);
          setIsHeaderOnDark(self.isActive);
        },
      });

      railTriggerRef.current = railTrigger;

      const tick = () => {
        currentX = gsap.utils.interpolate(currentX, targetX, 0.05);
        const velocity = currentX - lastX;
        lastX = currentX;
        quickSetTrack(currentX);

        const drift = gsap.utils.clamp(-36, 36, velocity * -1.05);
        const scale = gsap.utils.clamp(0.97, 1.05, 1 + Math.abs(velocity) / 420);
        const blur = gsap.utils.clamp(0, 5, Math.abs(velocity) / 45);
        cardSetters.forEach((setter) => {
          setter.setX(drift);
          setter.setScale(scale);
          setter.setFilter(`blur(${blur.toFixed(2)}px)`);
        });
      };

      gsap.ticker.add(tick);
      removeTicker = () => {
        gsap.ticker.remove(tick);
      };
    }, pageRef);

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
      removeTicker?.();
      railTriggerRef.current = null;
      context.revert();
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

  useEffect(() => {
    if (!activeExperience) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveExperience(null);
      }
    };

    const preventTouchMove = (event: TouchEvent) => {
      event.preventDefault();
    };

    const preventWheel = (event: WheelEvent) => {
      const target = event.target as Node | null;
      if (modalRef.current && target && modalRef.current.contains(target)) {
        return;
      }
      event.preventDefault();
    };

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", preventWheel, { passive: false });
    document.addEventListener("touchmove", preventTouchMove, { passive: false });
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.touchAction = "";
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", preventWheel);
      document.removeEventListener("touchmove", preventTouchMove);
    };
  }, [activeExperience]);

  useEffect(() => {
    const stored = window.sessionStorage.getItem("siteLanguage");
    if (stored === "fr" || stored === "en") {
      setLanguage(stored);
    }
  }, []);

  const handleRailPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    dragStateRef.current = {
      isActive: true,
      lastX: event.clientX,
      totalX: 0,
    };
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handleRailPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isActive) {
      return;
    }

    const deltaX = event.clientX - dragStateRef.current.lastX;
    dragStateRef.current.lastX = event.clientX;
    dragStateRef.current.totalX += Math.abs(deltaX);

    if (dragStateRef.current.totalX > 6) {
      isDraggingRef.current = true;
      setIsDragging(true);
      if (!event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.setPointerCapture(event.pointerId);
      }
      event.preventDefault();
    }

    if (deltaX !== 0) {
      const trigger = railTriggerRef.current;
      const currentY = window.scrollY;
      const nextY = currentY - deltaX * 1.1;

      if (trigger) {
        const clampedY = Math.min(Math.max(nextY, trigger.start), trigger.end);
        window.scrollTo({ top: clampedY, left: 0, behavior: "auto" });
      } else {
        window.scrollTo({ top: nextY, left: 0, behavior: "auto" });
      }
    }
  };

  const handleRailPointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragStateRef.current.isActive) {
      return;
    }

    dragStateRef.current.isActive = false;
    setIsDragging(false);

    try {
      event.currentTarget.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore if the pointer was already released.
    }

    window.setTimeout(() => {
      isDraggingRef.current = false;
    }, 80);
  };

  const handleRailWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) {
      return;
    }

    event.preventDefault();
    const gain = 1.4;
    window.scrollBy({ top: event.deltaX * gain, left: 0, behavior: "auto" });
  };

  return (
    <div ref={pageRef} className="relative z-10">
      <div className="grain" />

      <header
        className={`pointer-events-none fixed left-0 right-0 top-0 z-30 bg-transparent transition-colors duration-300 ${
          isScrolled
            ? headerOnDark
              ? "bg-[rgba(8,11,16,0.68)] backdrop-blur"
              : "bg-[rgba(237,232,221,0.88)] backdrop-blur"
            : ""
        }`}
      >
        <div className="flex w-full items-start justify-between px-5 py-4 sm:px-10">
          <span
            className={`pointer-events-auto display text-2xl leading-none tracking-tight transition-colors duration-300 sm:text-3xl ${
              headerOnDark ? "text-[var(--paper)]" : "text-[var(--foreground)]"
            }`}
          >
            Cyprien Rubio
          </span>

          <div
            className={`pointer-events-auto flex items-center gap-2 rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-300 ${
              headerOnDark
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
              <span className="pr-1 inline-flex">{FlagFR()}</span>
              <span className="hidden sm:inline">FR</span>
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
              <span className="pr-1 inline-flex">{FlagEN()}</span>
              <span className="hidden sm:inline">EN</span>
            </button>
          </div>

          <nav
            className={`pointer-events-auto hidden transition-colors duration-300 sm:flex sm:flex-col sm:items-end sm:gap-0.5 sm:text-[11px] sm:font-semibold sm:uppercase sm:leading-none sm:tracking-[0.08em] ${
              headerOnDark ? "text-[var(--paper)]" : "text-[var(--foreground)]"
            }`}
          >
            <a className="link-underline" href="#experiences" onClick={handleExploreClick}>
              {language === "fr" ? "Projets" : "Projects"}
            </a>
            <a className="link-underline" href="#contact" onClick={(e) => { e.preventDefault(); smoothTo("contact"); }}>
              {language === "fr" ? "Contact" : "Contact"}
            </a>
          </nav>

          <nav
            className={`pointer-events-auto flex flex-col items-end gap-1 text-sm font-medium transition-colors duration-300 sm:hidden ${
              headerOnDark ? "text-[var(--paper)]" : "text-[var(--foreground)]"
            }`}
          >
            <a className="link-underline" href="#experiences" onClick={handleExploreClick}>
              {language === "fr" ? "Projets" : "Projects"}
            </a>
            <a className="link-underline" href="#contact" onClick={(e) => { e.preventDefault(); smoothTo("contact"); }}>
              {language === "fr" ? "Contact" : "Contact"}
            </a>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1180px] px-5 pb-28 pt-24 sm:px-10 sm:pt-0">
        <section
          id="home"
          data-hero
          className="flex min-h-[74vh] flex-col justify-start gap-10 py-10 sm:min-h-[80vh] sm:gap-12 sm:py-12"
        >
          <div className="space-y-6 pt-4 sm:space-y-7 sm:pt-6" data-hero-parallax>
            <p className="eyebrow">
              {language === "fr"
                ? "Basé à Toulouse, disponible partout"
                : "Based in Toulouse, open worldwide"}
            </p>
            <div className="display overflow-hidden text-[clamp(2.1rem,7.8vw,7.2rem)] leading-[1.05] tracking-[-0.03em]">
              <div className="overflow-hidden pb-2">
                <span className="inline-block" data-hero-line>
                  {language === "fr"
                    ? "\u00ab Sans curiosit\u00e9 on meurt"
                    : "\u201cWithout curiosity we die"}
                </span>
              </div>
              <div className="overflow-hidden pb-2">
                <span className="inline-block text-[var(--accent)]" data-hero-line>
                  {language === "fr" ? "et sans courage" : "and without courage"}
                </span>
              </div>
              <div className="overflow-hidden pb-2">
                <span className="inline-block" data-hero-line>
                  {language === "fr"
                    ? "on ne vit pas. \u00bb"
                    : "we do not live.\u201d"}
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)] sm:mt-3">
              Hugo Pratt
            </p>
            <Reveal>
              <p className="max-w-2xl text-base text-[var(--muted)] sm:text-lg">
                {language === "fr"
                  ? "J'aide à construire des stratégies digitales pour améliorer les performances marketing."
                  : "I help build digital strategies to improve marketing performance."}
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-3">
              <a
                href="#experiences"
                onClick={handleExploreClick}
                className="inline-flex items-center gap-3 rounded-full border border-[rgba(35,35,35,0.28)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition hover:bg-[rgba(21,21,20,0.06)]"
              >
                {language === "fr" ? "Voir les projets" : "View projects"}
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  smoothTo("contact");
                }}
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(35,35,35,0.28)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition hover:bg-[rgba(21,21,20,0.06)]"
              >
                {language === "fr" ? "Me contacter" : "Contact me"}
              </a>
            </Reveal>
          </div>
        </section>

        <section id="experiences" className="py-0">
          <div className="section-line py-12 sm:py-14">
            <Reveal>
              <p className="eyebrow">{language === "fr" ? "Projets sélectionnés" : "Selected projects"}</p>
              <h2 className="display mt-3 text-4xl leading-[0.95] sm:text-5xl">
                {language === "fr"
                  ? "Trois expériences qui racontent mon positionnement."
                  : "Three experiences that capture my positioning."}
              </h2>
              <p className="mt-4 max-w-2xl text-base text-[var(--muted)] sm:text-lg">
                {language === "fr"
                  ? "Du terrain à la création de contenu, ces projets illustrent mon approche entre stratégie, exécution et impact."
                  : "From hands-on work to content creation, these projects show my balance of strategy, execution, and impact."}
              </p>
            </Reveal>
          </div>
          <div
            ref={railRef}
            className={`carousel-rail relative left-1/2 right-1/2 -mx-[50vw] flex h-[100svh] min-h-[100svh] w-screen items-center overflow-hidden bg-[#080b10] ${
              isDragging ? "is-dragging" : ""
            }`}
            onPointerDown={handleRailPointerDown}
            onPointerMove={handleRailPointerMove}
            onPointerUp={handleRailPointerEnd}
            onPointerCancel={handleRailPointerEnd}
            onPointerLeave={handleRailPointerEnd}
            onWheel={handleRailWheel}
          >
            <aside
              className={`pointer-events-auto left-[8vw] top-1/2 z-20 hidden w-[220px] -translate-y-1/2 text-[var(--paper)] lg:block ${
                isSummaryPinned ? "fixed" : "absolute"
              }`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[rgba(246,242,232,0.62)]">
                Sommaire
              </p>
              <nav className="mt-5 flex flex-col gap-3 text-sm">
                {featuredExperiences.map((item, index) => (
                  <button
                    key={item.slug}
                    type="button"
                    className="group flex items-center gap-2 text-left text-[rgba(246,242,232,0.8)] transition hover:text-[var(--paper)]"
                    onClick={() => {
                      setHoveredId(null);
                      scrollCarouselToSlug(item.slug);
                    }}
                  >
                    <span className="inline-block w-5 text-[11px] tracking-[0.12em] text-[rgba(246,242,232,0.55)]">
                      {index + 1}.
                    </span>
                    <span className="link-underline">
                      {language === "fr" ? item.title : item.titleEn ?? item.title}
                    </span>
                  </button>
                ))}
              </nav>
            </aside>

            <div
              ref={trackRef}
              className="flex w-max items-center gap-3 px-5 sm:gap-4 sm:px-10 lg:pl-[calc(8vw+250px)]"
            >
              {featuredExperiences.map((experience, index) => {
                const position = stripePositions[index % stripePositions.length];
                const isHovered = hoveredId === experience.slug;
                const isMuted = hoveredId !== null && !isHovered;

                return (
                  <motion.div
                    key={experience.slug}
                    data-experience-card
                    data-slug={experience.slug}
                    whileHover={{ y: -7 }}
                    transition={{ type: "spring", stiffness: 220, damping: 24 }}
                    className={`group shrink-0 transition-all duration-300 ${
                      isMuted ? "opacity-45" : "opacity-100"
                    }`}
                    onMouseEnter={() => setHoveredId(experience.slug)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <button
                      type="button"
                      aria-label={`Open ${experience.title}`}
                      className={`relative block h-[46vh] min-h-[265px] overflow-hidden bg-[#0d1016] transition-all duration-500 ${
                        isHovered
                          ? "w-[25.5vw] min-w-[116px] max-w-[286px]"
                          : "w-[22.1vw] min-w-[99px] max-w-[238px]"
                      }`}
                      onFocus={() => setHoveredId(experience.slug)}
                      onBlur={() => setHoveredId(null)}
                      onClick={(event) => {
                        if (isDraggingRef.current) {
                          event.preventDefault();
                          event.stopPropagation();
                          return;
                        }
                        setHoveredId(null);
                        setActiveExperience(experience);
                      }}
                    >
                      <Image
                        src={`${basePath}${experience.image}`}
                        alt={experience.title}
                        fill
                        sizes="(max-width: 640px) 40vw, 24vw"
                        draggable={false}
                        onDragStart={(event) => event.preventDefault()}
                        className={`object-cover transition duration-500 ${
                          isHovered
                            ? "grayscale-0 brightness-100"
                            : "grayscale brightness-[0.62] contrast-[1.02]"
                        }`}
                        style={{ objectPosition: position }}
                        priority
                      />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="capabilities" className="section-line py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow">{language === "fr" ? "Capacités" : "Capabilities"}</p>
            <h2 className="display mt-3 text-4xl leading-[0.95] sm:text-5xl">
              {language === "fr"
                ? "Des compétences pour transformer une idée en impact."
                : "Skills to turn an idea into measurable impact."}
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-3 text-base text-[var(--muted)] sm:grid-cols-2 sm:text-lg">
            {capabilities[language].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-[rgba(21,21,20,0.12)] bg-[rgba(246,242,232,0.7)] px-5 py-4"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="experience-list" className="section-line py-14 sm:py-16">
          <Reveal>
            <p className="eyebrow">{language === "fr" ? "Expériences" : "Experience"}</p>
            <h2 className="display mt-3 text-4xl leading-[0.95] sm:text-5xl">
              {language === "fr"
                ? "Un parcours qui nourrit ma façon de travailler."
                : "A background that shapes how I work."}
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {otherExperiences.map((experience) => {
              const title = language === "fr" ? experience.title : experience.titleEn ?? experience.title;
              const label = language === "fr" ? experience.label : experience.labelEn ?? experience.label;
              const intro = language === "fr" ? experience.intro : experience.introEn ?? experience.intro;
              const details =
                language === "fr" ? experience.details : experience.detailsEn ?? experience.details;
              const isOpen = openExperienceSlug === experience.slug;

              return (
                <div
                  key={experience.slug}
                  className="rounded-2xl border border-[rgba(21,21,20,0.12)] bg-[rgba(246,242,232,0.7)] px-5 py-4"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenExperienceSlug(isOpen ? null : experience.slug)
                    }
                    className="flex w-full items-center justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="display text-2xl leading-tight sm:text-3xl">{title}</span>
                    <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                      {label}
                      <span
                        aria-hidden="true"
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border border-[rgba(21,21,20,0.2)] text-sm transition ${
                          isOpen ? "rotate-45" : "rotate-0"
                        }`}
                      >
                        +
                      </span>
                    </span>
                  </button>
                  {isOpen ? (
                    <div className="mt-4 space-y-4 text-base text-[var(--muted)] sm:text-lg">
                      <p>{intro}</p>
                      <ul className="space-y-2">
                        {details.map((detail) => (
                          <li key={detail}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        <section
          id="contact"
          className="section-line grid min-h-screen content-center gap-9 py-16 sm:grid-cols-2 sm:items-end sm:py-20"
        >
          <Reveal>
            <p className="eyebrow">Contact</p>
            <div className="mt-5 space-y-3 text-lg">
              <a
                className="link-underline inline-block"
                href={`mailto:${contactDetails.email}`}
              >
                {contactDetails.email}
              </a>
              <a className="link-underline block" href={`tel:${contactDetails.phoneRaw}`}>
                {contactDetails.phoneDisplay}
              </a>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  className="inline-flex items-center justify-center rounded-full border border-[rgba(35,35,35,0.28)] px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] transition hover:bg-[rgba(21,21,20,0.06)]"
                  href={contactDetails.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {language === "fr" ? "Voir LinkedIn" : "View LinkedIn"}
                </a>
              </div>
              <p className="text-base text-[var(--muted)]">
                {language === "fr"
                  ? "Disponible pour des missions freelance et des collaborations long terme."
                  : "Available for freelance missions and long-term collaborations."}
              </p>
            </div>
          </Reveal>
          <Reveal className="space-y-6 text-lg">
            <form
              className="grid gap-3 rounded-2xl border border-[rgba(21,21,20,0.12)] bg-[rgba(246,242,232,0.7)] p-5 text-sm"
              action={`mailto:${contactDetails.email}`}
              method="post"
              encType="text/plain"
            >
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {language === "fr" ? "Nom" : "Name"}
                <input
                  name="name"
                  required
                  className="mt-2 w-full rounded-lg border border-[rgba(21,21,20,0.2)] bg-transparent px-3 py-2 text-base outline-none transition focus:border-[rgba(181,72,47,0.6)]"
                  placeholder={language === "fr" ? "Votre nom" : "Your name"}
                />
              </label>
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-2 w-full rounded-lg border border-[rgba(21,21,20,0.2)] bg-transparent px-3 py-2 text-base outline-none transition focus:border-[rgba(181,72,47,0.6)]"
                  placeholder="hello@studio.com"
                />
              </label>
              <label className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
                {language === "fr" ? "Message" : "Message"}
                <textarea
                  name="message"
                  rows={4}
                  required
                  className="mt-2 w-full resize-none rounded-lg border border-[rgba(21,21,20,0.2)] bg-transparent px-3 py-2 text-base outline-none transition focus:border-[rgba(181,72,47,0.6)]"
                  placeholder={
                    language === "fr"
                      ? "Parlez-moi de votre projet en quelques lignes."
                      : "Tell me about your project in a few lines."
                  }
                />
              </label>
              <button
                type="submit"
                className="mt-2 inline-flex w-fit items-center justify-center rounded-full border border-[rgba(35,35,35,0.28)] px-5 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-[rgba(21,21,20,0.06)]"
              >
                {language === "fr" ? "Envoyer" : "Send"}
              </button>
            </form>
          </Reveal>
        </section>
      </main>

      <AnimatePresence>
        {activeExperience ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto overscroll-contain bg-[rgba(8,11,16,0.88)] px-4 py-6 sm:items-center sm:px-6 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveExperience(null)}
            onWheel={(event) => {
              const target = event.target as Node | null;
              if (modalRef.current && target && modalRef.current.contains(target)) {
                return;
              }
              event.preventDefault();
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto overscroll-contain rounded-3xl border border-[rgba(246,242,232,0.2)] bg-[var(--paper)]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              onWheel={(event) => event.stopPropagation()}
              ref={modalRef}
            >
              <button
                type="button"
                onClick={() => setActiveExperience(null)}
                className="absolute right-5 top-5 rounded-full border border-[rgba(21,21,20,0.2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--muted)] transition hover:bg-[rgba(21,21,20,0.06)]"
              >
                {language === "fr" ? "Fermer" : "Close"}
              </button>
              <div className="grid gap-6 p-6 pt-12 sm:p-10 sm:pt-12">
                <div>
                  <p className="eyebrow">
                    {language === "fr"
                      ? activeExperience.label
                      : activeExperience.labelEn ?? activeExperience.label}
                  </p>
                  <h3 className="display mt-3 text-4xl leading-[0.95] sm:text-5xl">
                    {language === "fr"
                      ? activeExperience.title
                      : activeExperience.titleEn ?? activeExperience.title}
                  </h3>
                  <p className="mt-4 text-base text-[var(--muted)] sm:text-lg">
                    {language === "fr"
                      ? activeExperience.intro
                      : activeExperience.introEn ?? activeExperience.intro}
                  </p>
                </div>
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[rgba(35,35,35,0.2)] sm:aspect-[4/3]">
                  <Image
                    src={`${basePath}${activeExperience.image}`}
                    alt={
                      language === "fr"
                        ? activeExperience.title
                        : activeExperience.titleEn ?? activeExperience.title
                    }
                    fill
                    sizes="(max-width: 640px) 100vw, 60vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="eyebrow">
                    {language === "fr" ? "Ce que cela dit de moi" : "What this says about me"}
                  </p>
                  <ul className="mt-4 space-y-3 text-base text-[var(--muted)] sm:text-lg">
                    {(language === "fr"
                      ? activeExperience.details
                      : activeExperience.detailsEn ?? activeExperience.details
                    ).map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
