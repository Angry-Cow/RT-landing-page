import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Target,
  BookOpen,
  Camera,
  FileText,
  Download,
  Shield,
  CheckCircle,
  ChevronDown,
  Menu,
  X,
  Star,
  Crosshair,
  Smartphone,
  BarChart3,
  Lock,
  Gift,
  Mail,
  User,
  MapPin,
  MessageSquare,
  ArrowRight,
  Printer,
  TrendingUp,
  Clock,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { supabase } from "./supabaseClient";

gsap.registerPlugin(ScrollTrigger);

// ─── Brand palette ────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

// ─── Logo ─────────────────────────────────────────────────────────────────────
const LOGO_URL =
  "https://c.animaapp.com/moua5fr1i7rxTv/img/uploaded-asset-1778117019640-0.png";

const RangeTrackerLogo = ({ size = 48 }: { size?: number }) => (
  <img
    src={LOGO_URL}
    alt="Range Tracker Logo"
    style={{ width: size, height: size }}
    className="flex-shrink-0 object-contain rounded-xl"
  />
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1628]/95 border-b border-white/10 shadow-xl backdrop-blur-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3">
          <RangeTrackerLogo size={40} />
          <span className="text-white font-bold text-xl tracking-tight">
            Range Tracker
            <span className="text-amber-400 text-sm align-super">™</span>
          </span>
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-slate-300 hover:text-amber-400 text-sm font-medium transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://rangetrackerapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-white text-sm font-medium transition-colors"
          >
            Sign In
          </a>
          <a
            href="https://rangetrackerapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold text-sm px-5 py-2 rounded-full transition-all duration-200 shadow-lg hover:shadow-amber-500/30"
          >
            Get Started Free
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a1628]/98 border-t border-white/10 px-6 py-6 space-y-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="block text-slate-300 hover:text-amber-400 font-medium transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://rangetrackerapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-amber-500 hover:bg-amber-400 text-white font-semibold text-center py-3 rounded-full mt-2 transition-all"
          >
            Get Started Free
          </a>
        </div>
      )}
    </nav>
  );
};

// ─── Hero Section (100vh) ──────────────────────────────────────────────────────
const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered entrance
      gsap.fromTo(
        [titleRef.current, subRef.current, ctaRef.current],
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3,
        },
      );
      // Subtle parallax on bg
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, #0a1628 0%, #0d2240 40%, #0a1628 100%)",
      }}
    >
      {/* Animated background grid */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(245,158,11,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(59,130,246,0.06) 0%, transparent 50%), linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "100% 100%, 100% 100%, 60px 60px, 60px 60px",
        }}
      />

      {/* Crosshair decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-5">
        <div className="target-ring" style={{ width: 600, height: 600 }} />
        <div
          className="target-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 400, height: 400 }}
        />
        <div
          className="target-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 200, height: 200 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
          <Crosshair size={12} />
          Designed by Shooters, for Shooters
        </div>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <RangeTrackerLogo size={160} />
        </div>

        {/* H1 */}
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-black text-white leading-tight mb-6"
        >
          Track Your <span className="aurora-text">Range Progress</span>
          <br />
          Like Never Before
        </h1>

        {/* H2 subtitle */}
        <p
          ref={subRef}
          className="text-slate-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Stop losing track of notebooks and scattered target photos. Range
          Tracker™ keeps every training session organized, searchable, and
          accessible on any device.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://rangetrackerapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105 hover:shadow-amber-500/50"
          >
            Start Tracking Free
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 border border-white/20 hover:border-amber-400/50 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/5"
          >
            Learn More
            <ChevronDown size={18} />
          </a>
        </div>

        {/* Social proof */}
        <p className="text-slate-500 text-sm mt-10">
          Forever Free plan available · No credit card required
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs animate-bounce">
        <ChevronDown size={20} />
      </div>
    </section>
  );
};

// ─── useScrollReveal helper ────────────────────────────────────────────────────
const useReveal = (ref: React.RefObject<Element>, fromY = 40) => {
  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    gsap.fromTo(
      el,
      { y: fromY, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [ref, fromY]);
};

// ─── Section Wrapper ──────────────────────────────────────────────────────────
const Section = ({
  id,
  children,
  className = "",
  dark = false,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
}) => (
  <section
    id={id}
    className={`py-24 px-8 ${
      dark ? "bg-[#060e1a]" : "bg-[#0a1628]"
    } ${className}`}
  >
    <div className="max-w-7xl mx-auto">{children}</div>
  </section>
);

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-3 text-center">
    {children}
  </p>
);

const SectionTitle = ({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) => (
  <h2
    className={`text-3xl md:text-5xl font-black text-center mb-6 ${light ? "text-white" : "text-white"}`}
  >
    {children}
  </h2>
);

const SectionSub = ({ children }: { children: React.ReactNode }) => (
  <p className="text-slate-400 text-lg text-center max-w-2xl mx-auto mb-16 leading-relaxed">
    {children}
  </p>
);

// ─── About / Story Section ─────────────────────────────────────────────────────
const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <Section id="about" dark>
      <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center">
        {/* Story */}
        <div>
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
            Sound familiar? Notebooks, scattered photos, no system...
          </h2>
          <p className="text-slate-400 leading-relaxed mb-5">
            I was a shooting enthusiast without a way to consistently track my
            training. I was writing in a notebook — notebooks are great,
            don&#39;t get me wrong — but then I had images saved on my phone
            that I wanted to keep track of to see progress.
          </p>
          <p className="text-slate-400 leading-relaxed mb-5">
            Where is my notebook? What day did I do that on? Where in my photo
            gallery are those photos?{" "}
            <span className="text-white font-semibold">
              You already know what I&#39;m talking about!
            </span>
          </p>
          <p className="text-slate-300 leading-relaxed">
            So I dug back into that bag of cats I call my memory, used skills
            from talented people earlier in my career, and built the app I
            always wanted. That&#39;s Range Tracker™.
          </p>
          <p className="text-amber-400 text-sm font-semibold mt-6">
            — Larry S., Creator of Range Tracker™
          </p>
        </div>

        {/* Resolution */}
        <div className="space-y-5">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 card-glow">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-red-500/20 rounded-xl flex-shrink-0">
                <BookOpen size={22} className="text-red-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  Before Range Tracker™
                </h3>
                <p className="text-slate-400 text-sm">
                  Scattered notebooks, photos buried in your gallery, no way to
                  connect training sessions to results.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-8 w-px bg-gradient-to-b from-red-500/40 to-amber-500/40" />
          </div>
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 card-glow">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-amber-500/20 rounded-xl flex-shrink-0">
                <CheckCircle size={22} className="text-amber-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">
                  After Range Tracker™
                </h3>
                <p className="text-slate-400 text-sm">
                  Every session logged, photos attached, notes saved.
                  Searchable, organized, accessible from any device — anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

// ─── Features Section ─────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: <BookOpen size={24} />,
    title: "Centralized Record Keeping",
    desc: "Maintain a consistent, organized record of all your range training in one secure place. Every detail — location, date, firearm, ammo, distance — is captured.",
  },
  {
    icon: <Camera size={24} />,
    title: "Visual Progress Tracking",
    desc: "Save target photos directly within your range record. Add notes to each photo to remember key details and track your accuracy over time.",
  },
  {
    icon: <Smartphone size={24} />,
    title: "Any Device, Anytime",
    desc: "Works on PC, phone, or tablet. Access your range records from anywhere with a browser — no app store download required.",
  },
  {
    icon: <Lock size={24} />,
    title: "Private & Secure",
    desc: "Your data is yours and yours alone. We respect your privacy. Your information is never shared, sold, or used for anything other than your own tracking.",
  },
  {
    icon: <Printer size={24} />,
    title: "Printable Range Reports",
    desc: 'Generate professional-looking PDF "Range Reports" to track your progress over time or share with a coach.',
  },
  {
    icon: <Download size={24} />,
    title: "Full Data Portability",
    desc: "Download all your range records as an Excel spreadsheet and all your photos in a zip file. Your information is always yours to keep.",
  },
  {
    icon: <BarChart3 size={24} />,
    title: "Analyze & Improve",
    desc: "Identify trends in your performance, see what techniques work, and make informed adjustments to your training regimen.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Stay Motivated",
    desc: "See your improvement over time, celebrate milestones, and stay inspired to reach your shooting goals with concrete data.",
  },
];

const FeaturesSection = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  useReveal(titleRef);

  return (
    <Section id="features">
      <div ref={titleRef}>
        <SectionLabel>Features</SectionLabel>
        <SectionTitle>Everything You Need to Train Smarter</SectionTitle>
        <SectionSub>
          Range Tracker™ gives you all the tools to stop guessing and start
          knowing — with a simple, clean interface that stays out of your way.
        </SectionSub>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {FEATURES.map((f, i) => (
          <FeatureCard key={i} {...f} index={i} />
        ))}
      </div>
    </Section>
  );
};

const FeatureCard = ({
  icon,
  title,
  desc,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        delay: (index % 4) * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [index]);

  return (
    <div
      ref={ref}
      className="bg-white/5 border border-white/10 hover:border-amber-500/40 rounded-2xl p-6 transition-all duration-300 card-glow group"
    >
      <div className="p-3 bg-amber-500/15 rounded-xl w-fit mb-4 group-hover:bg-amber-500/25 transition-colors">
        <span className="text-amber-400">{icon}</span>
      </div>
      <h3 className="text-white font-bold mb-2 text-base">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
};

// ─── Who Uses It Section ───────────────────────────────────────────────────────
const WHO_USES = [
  { icon: <Target size={28} />, label: "Handguns" },
  { icon: <Target size={28} />, label: "Rifles" },
  { icon: <Target size={28} />, label: "Air Pistols" },
  { icon: <Target size={28} />, label: "Air Rifles" },
  { icon: <Target size={28} />, label: "Bow & Arrow" },
];

const WhoUsesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <Section dark>
      <div ref={ref} className="text-center">
        <SectionLabel>Who It&#39;s For</SectionLabel>
        <SectionTitle>Built for Every Shooter</SectionTitle>
        <SectionSub>
          Whether you&#39;re a competitive marksman or a weekend range
          enthusiast, Range Tracker™ adapts to your discipline.
        </SectionSub>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          {WHO_USES.map((w, i) => (
            <div
              key={i}
              className="flex items-center gap-3 bg-white/5 hover:bg-amber-500/10 border border-white/10 hover:border-amber-500/40 px-8 py-5 rounded-2xl transition-all duration-300 cursor-default min-w-[160px]"
            >
              <span className="text-amber-400">{w.icon}</span>
              <span className="text-white font-semibold">{w.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

// ─── Pricing Section ──────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Forever Free",
    price: "$0",
    period: "forever",
    desc: "Perfect for getting started. Try the full experience with limited record capacity.",
    features: [
      "All core features included",
      "Limited record capacity",
      "Target photo storage",
      "Range Report PDF export",
      "Works on all devices",
    ],
    cta: "Start Free",
    highlight: false,
    badge: null,
  },
  {
    name: "Monthly",
    price: "$3.99",
    period: "per month",
    desc: "Unlimited records and full access. Cancel any time.",
    features: [
      "Everything in Free",
      "Unlimited range records",
      "Unlimited photo storage",
      "Excel data export",
      "Full zip photo download",
    ],
    cta: "Get Started",
    highlight: false,
    badge: null,
  },
  {
    name: "Yearly",
    price: "$39.99",
    period: "per year",
    desc: "Best value — save over 16% versus monthly. Unlimited everything.",
    features: [
      "Everything in Monthly",
      "Unlimited range records",
      "Unlimited photo storage",
      "Excel data export",
      "Full zip photo download",
      "Priority support",
    ],
    cta: "Get Best Value",
    highlight: true,
    badge: "Most Popular",
  },
];

const PricingSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <Section id="pricing">
      <div ref={ref}>
        <SectionLabel>Pricing</SectionLabel>
        <SectionTitle>Simple, Transparent Pricing</SectionTitle>
        <SectionSub>
          Start free and upgrade when you&#39;re ready. No hidden fees, no
          surprises.
        </SectionSub>
      </div>

      {/* Special offer banner */}
      <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/10 border border-amber-500/40 rounded-2xl p-5 mb-10 flex items-center gap-4 max-w-3xl mx-auto">
        <Gift size={28} className="text-amber-400 flex-shrink-0" />
        <div>
          <p className="text-amber-300 font-bold text-sm">Limited Time Offer</p>
          <p className="text-white text-sm">
            Sign up for the <strong>Yearly Plan</strong> and receive a{" "}
            <strong>free digital target pack</strong>!
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {PLANS.map((plan, i) => (
          <PricingCard key={i} plan={plan} index={i} />
        ))}
      </div>
    </Section>
  );
};

const PricingCard = ({
  plan,
  index,
}: {
  plan: (typeof PLANS)[0];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      },
    );
  }, [index]);

  return (
    <div
      ref={ref}
      className={`relative rounded-3xl p-8 flex flex-col card-glow ${
        plan.highlight
          ? "bg-gradient-to-b from-amber-500/20 to-amber-600/10 border-2 border-amber-500/60"
          : "bg-white/5 border border-white/10"
      }`}
    >
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
          {plan.badge}
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
        <div className="flex items-end gap-2 mb-3">
          <span className="text-4xl font-black text-white">{plan.price}</span>
          <span className="text-slate-400 text-sm pb-1">/{plan.period}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{plan.desc}</p>
      </div>
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
            <CheckCircle
              size={16}
              className="text-amber-400 flex-shrink-0 mt-0.5"
            />
            {f}
          </li>
        ))}
      </ul>
      <a
        href="https://rangetrackerapp.com"
        target="_blank"
        rel="noopener noreferrer"
        className={`block text-center font-bold py-3 px-6 rounded-full transition-all duration-300 ${
          plan.highlight
            ? "bg-amber-500 hover:bg-amber-400 text-white shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50"
            : "border border-white/20 hover:border-amber-400/50 text-white hover:bg-white/5"
        }`}
      >
        {plan.cta}
      </a>
    </div>
  );
};

// ─── Testimonial Section ──────────────────────────────────────────────────────
const TestimonialSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Section dark>
      <div ref={ref} className="max-w-3xl mx-auto text-center">
        <SectionLabel>From the Creator</SectionLabel>
        <SectionTitle>Real Talk. No Phony Marketing.</SectionTitle>
        <div className="bg-white/5 border border-white/10 rounded-3xl p-10 mt-8 card-glow">
          <div className="flex justify-center mb-5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={20}
                className="text-amber-400 fill-amber-400"
              />
            ))}
          </div>
          <blockquote className="text-slate-200 text-lg leading-relaxed italic mb-6">
            "I was using a notebook, but it was hard to keep track of
            everything. Range Tracker™ has changed the way I train. Now I can
            easily see my progress and make adjustments. Highly recommended!"
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <User size={18} className="text-amber-400" />
            </div>
            <div className="text-left">
              <p className="text-white font-semibold text-sm">Larry S.</p>
              <p className="text-slate-500 text-xs">
                Creator of Range Tracker™
              </p>
            </div>
          </div>
          <p className="text-slate-200 text-xs mt-6 italic">
            Use Range Tracker™ for a while and let me know how you like it by{" "}
            <button
              onClick={() => setModalOpen(true)}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer bg-transparent border-none p-0 font-inherit italic transition-colors"
            >
              clicking here
            </button>
            . I will post real reviews here — nothing made up, no phony
            marketing!
          </p>
        </div>
      </div>
      {modalOpen && <FeedbackModal onClose={() => setModalOpen(false)} />}
    </Section>
  );
};

// ─── FAQ Section ──────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What devices does Range Tracker™ work on?",
    a: "Range Tracker™ is a web-based application that works on any device with a modern browser — PC, Mac, Android phone, Android tablet, iPhone, and iPad. No app download required.",
  },
  {
    q: "Is my data private?",
    a: "Absolutely. Your range records, photos, and personal information are private and belong to you. We do not share, sell, or use your data for any purpose other than providing the Range Tracker™ service.",
  },
  {
    q: "What is the Forever Free plan?",
    a: "The Forever Free plan gives you full access to Range Tracker™ features with a limited record capacity. It&#39;s perfect for trying the app out or for shooters who train occasionally.",
  },
  {
    q: "Can I export or download my data?",
    a: "Yes! You can download all your range records as an Excel spreadsheet and all your target photos as a zip file at any time. Your information is always yours to keep.",
  },
  {
    q: "What is included in a Range Record?",
    a: "A range record captures everything about a training session: date, location, firearm, ammunition, distance, target type, weather conditions, photos of your targets, and personal notes. Entries are built from customizable lists.",
  },
  {
    q: "Can I print a Range Report?",
    a: "Yes. Range Tracker™ lets you generate a professional-looking PDF Range Report for any session, which you can print or save for your records.",
  },
  {
    q: "What disciplines does Range Tracker™ support?",
    a: "Range Tracker™ is designed for handguns, rifles, air pistols, air rifles, and bow and arrow. If you use it at a range or in practice, Range Tracker™ can help you track it.",
  },
];

const FaqSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <Section id="faq" dark>
      <div ref={ref}>
        <SectionLabel>FAQ</SectionLabel>
        <SectionTitle>Common Questions</SectionTitle>
        <SectionSub>
          Everything you need to know before getting started.
        </SectionSub>
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              question={faq.q}
              answer={faq.a}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

const FaqItem = ({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
      isOpen
        ? "border-amber-500/40 bg-amber-500/5"
        : "border-white/10 bg-white/3 hover:border-white/20"
    }`}
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
    >
      <span className="text-white font-semibold text-sm md:text-base">
        {question}
      </span>
      <ChevronDown
        size={18}
        className={`text-amber-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
    {isOpen && (
      <div className="px-6 pb-5">
        <p className="text-slate-400 text-sm leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

// ─── Contact / Feedback Modal ─────────────────────────────────────────────────
const ANIMA_SEND_EMAIL_URL =
  "https://api.animaapp.com/v1/edge-functions/send-email";

type FormState = "idle" | "sending" | "sent" | "error";

interface FeedbackFormData {
  name: string;
  location: string;
  email: string;
  comments: string;
}

const BLANK_FORM: FeedbackFormData = {
  name: "",
  location: "",
  email: "",
  comments: "",
};

const sendEmail = async (payload: {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
}) => {
  const res = await fetch(ANIMA_SEND_EMAIL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Email send failed (${res.status}): ${text}`);
  }
  return res.json();
};

const adminNotificationHtml = (f: FeedbackFormData) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;padding:32px;">
  <h2 style="color:#0a1628;border-bottom:2px solid #f59e0b;padding-bottom:12px;">New Feedback Submission</h2>
  <table style="width:100%;border-collapse:collapse;margin-top:16px;">
    <tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold;width:140px;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #e9ecef;">${f.name}</td></tr>
    <tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold;">Location</td><td style="padding:8px 12px;border-bottom:1px solid #e9ecef;">${f.location}</td></tr>
    <tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #e9ecef;"><a href="mailto:${f.email}" style="color:#f59e0b;">${f.email}</a></td></tr>
    <tr><td style="padding:8px 12px;background:#f8f9fa;font-weight:bold;vertical-align:top;">Comments</td><td style="padding:8px 12px;">${f.comments.replace(/\n/g, "<br/>")}</td></tr>
  </table>
  <p style="color:#6c757d;font-size:12px;margin-top:24px;">Submitted via rangetracker.net feedback form</p>
</div>`;

const thankYouHtml = (name: string) => `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;padding:32px;">
  <div style="text-align:center;margin-bottom:28px;">
    <img src="${LOGO_URL}" alt="Range Tracker" style="width:80px;height:80px;border-radius:12px;object-fit:contain;" />
    <h1 style="color:#0a1628;font-size:22px;margin-top:12px;">Range Tracker<sup style="font-size:13px;">&#8482;</sup></h1>
  </div>
  <p style="font-size:16px;line-height:1.6;">Hi ${name},</p>
  <p style="font-size:15px;line-height:1.7;color:#374151;">Thank you so much for taking the time to share your feedback &#8212; we truly appreciate it. Hearing from real users is what helps us make Range Tracker&#8482; better every day.</p>
  <p style="font-size:15px;line-height:1.7;color:#374151;">We&#39;ll review your message carefully. Keep tracking those sessions!</p>
  <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e9ecef;color:#6c757d;font-size:14px;">
    <p style="margin:0;">Thank you,</p>
    <p style="margin:4px 0 0;font-weight:bold;color:#0a1628;">Larry S.</p>
    <p style="margin:2px 0 0;font-size:12px;">Creator, Range Tracker&#8482; &nbsp;|&nbsp; <a href="mailto:info@rangetracker.net" style="color:#f59e0b;text-decoration:none;">info@rangetracker.net</a></p>
  </div>
</div>`;

const FeedbackModal = ({ onClose }: { onClose: () => void }) => {
  const [form, setForm] = useState<FeedbackFormData>(BLANK_FORM);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  // ── helpers ──────────────────────────────────────────────────────────────
  const hasUnsavedInput =
    state !== "sent" &&
    (form.name.trim() !== "" ||
      form.location.trim() !== "" ||
      form.email.trim() !== "" ||
      form.comments.trim() !== "");

  const handleClose = () => {
    if (
      hasUnsavedInput &&
      !window.confirm(
        "You have unsaved input. Close anyway and discard your message?",
      )
    ) {
      return;
    }
    // Reset everything so reopening the modal starts fresh
    setForm(BLANK_FORM);
    setState("idle");
    setErrorMsg("");
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    setErrorMsg("");
    try {
      // 1. Insert row into Supabase
      const { error: dbError } = await supabase
        .from("feedback_submissions")
        .insert([
          {
            name: form.name,
            location: form.location,
            email: form.email,
            comments: form.comments,
          },
        ]);
      if (dbError) throw new Error(`DB insert: ${dbError.message}`);

      // 2. Admin notification email → info@rangetracker.net
      await sendEmail({
        to: "info@rangetracker.net",
        from: "info@rangetracker.net",
        replyTo: form.email,
        subject: "New Feedback Submission – Range Tracker",
        html: adminNotificationHtml(form),
      });

      // 3. Thank-you email → submitter
      await sendEmail({
        to: form.email,
        from: "info@rangetracker.net",
        subject: "Thank you for your feedback",
        html: thankYouHtml(form.name),
      });

      setState("sent");
    } catch (err: unknown) {
      console.error("FeedbackModal error:", err);
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
      setState("error");
    }
  };

  // ── entrance animation ────────────────────────────────────────────────────
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.22, ease: "power2.out" },
    ).fromTo(
      cardRef.current,
      { opacity: 0, y: 28, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.32, ease: "power3.out" },
      "-=0.1",
    );
  }, []);

  // ── success panel animation ───────────────────────────────────────────────
  useEffect(() => {
    if (state === "sent" && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, scale: 0.92, y: 16 },
        { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" },
      );
    }
  }, [state]);

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] modal-overlay flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        ref={cardRef}
        className="bg-[#0d1f38] border border-white/15 rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
      >
        {/* ✕ button — always visible */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
          aria-label="Close feedback modal"
        >
          <X size={20} />
        </button>

        {/* ── SUCCESS PANEL ─────────────────────────────────────────────── */}
        {state === "sent" ? (
          <div ref={successRef} className="text-center py-6">
            {/* Animated checkmark ring */}
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping" />
              <div className="relative w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/40">
                <CheckCircle size={38} className="text-green-400" />
              </div>
            </div>

            <h3 className="text-white font-black text-2xl mb-2">
              Thanks, {form.name}!
            </h3>
            <p className="text-green-400 font-semibold text-sm mb-4">
              Your message has been sent ✓
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-2 max-w-xs mx-auto">
              We appreciate you taking the time to share your feedback. A
              confirmation email is on its way to
            </p>
            <p className="text-amber-400 font-semibold text-sm mb-6">
              {form.email}
            </p>

            {/* Divider */}
            <div className="border-t border-white/10 mb-6" />

            {/* Logo + sign-off */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <img
                src={LOGO_URL}
                alt="Range Tracker"
                className="w-9 h-9 rounded-lg object-contain"
              />
              <p className="text-slate-400 text-xs text-left leading-snug">
                Thank you,
                <br />
                <span className="text-white font-semibold">Larry S.</span>
                <span className="text-slate-600">
                  {" "}
                  · Creator, Range Tracker&#8482;
                </span>
              </p>
            </div>

            <button
              onClick={handleClose}
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold px-8 py-3 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-amber-500/25"
            >
              <CheckCircle size={16} />
              Done
            </button>
          </div>
        ) : (
          /* ── FORM PANEL ────────────────────────────────────────────────── */
          <>
            <div className="mb-6">
              <h3 className="text-white font-bold text-xl mb-1">
                Share Your Feedback
              </h3>
              <p className="text-slate-400 text-sm">
                We&#39;d love to hear from you. Real feedback, no phony
                marketing!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block">
                <span className="text-slate-300 text-sm font-medium flex items-center gap-2 mb-1.5">
                  <User size={13} /> Your Name{" "}
                  <span className="text-red-400">*</span>
                </span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 focus:border-amber-500/60 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-colors"
                />
              </label>
              <label className="block">
                <span className="text-slate-300 text-sm font-medium flex items-center gap-2 mb-1.5">
                  <MapPin size={13} /> Where Are You From?{" "}
                  <span className="text-red-400">*</span>
                </span>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="City, State"
                  className="w-full bg-white/5 border border-white/10 focus:border-amber-500/60 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-colors"
                />
              </label>
              <label className="block">
                <span className="text-slate-300 text-sm font-medium flex items-center gap-2 mb-1.5">
                  <Mail size={13} /> Email Address{" "}
                  <span className="text-red-400">*</span>
                </span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@email.com"
                  className="w-full bg-white/5 border border-white/10 focus:border-amber-500/60 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-colors"
                />
              </label>
              <label className="block">
                <span className="text-slate-300 text-sm font-medium flex items-center gap-2 mb-1.5">
                  <MessageSquare size={13} /> Comments{" "}
                  <span className="text-red-400">*</span>
                </span>
                <textarea
                  name="comments"
                  value={form.comments}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Tell us about your experience..."
                  className="w-full bg-white/5 border border-white/10 focus:border-amber-500/60 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-600 outline-none transition-colors resize-none"
                />
              </label>
              {state === "error" && (
                <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                  <AlertCircle
                    size={15}
                    className="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <p className="text-red-400 text-sm leading-relaxed">
                    {errorMsg ||
                      "Something went wrong. Please try again or email us directly at info@rangetracker.net."}
                  </p>
                </div>
              )}
              <button
                type="submit"
                disabled={state === "sending"}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold py-3 rounded-full transition-all flex items-center justify-center gap-2"
              >
                {state === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail size={16} />
                    Send Feedback
                  </>
                )}
              </button>
              <p className="text-slate-600 text-xs text-center">
                Your info is never shared &middot; Powered by Range
                Tracker&#8482;
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ─── Contact Section ──────────────────────────────────────────────────────────
const ContactSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <Section id="contact">
      <div ref={ref} className="max-w-2xl mx-auto text-center">
        <SectionLabel>Contact</SectionLabel>
        <SectionTitle>We Want to Hear From You</SectionTitle>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Real feedback, real reviews — no phony marketing. Use Range Tracker™
          for a while and let us know how you like it. Your opinion shapes the
          product.
        </p>
        <button
          onClick={() => setModalOpen(true)}
          className="group inline-flex items-center gap-3 bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105"
        >
          <MessageSquare size={20} />
          Share Your Feedback
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </button>
        <p className="text-slate-500 text-sm mt-5">
          Or email us directly at{" "}
          <a
            href="mailto:info@rangetracker.net"
            className="text-amber-400 hover:underline"
          >
            info@rangetracker.net
          </a>
        </p>
      </div>
      {modalOpen && <FeedbackModal onClose={() => setModalOpen(false)} />}
    </Section>
  );
};

// ─── CTA Banner ───────────────────────────────────────────────────────────────
const CtaBanner = () => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <section
      className="relative py-24 px-8 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0d2240 0%, #1a3a5c 50%, #0d2240 100%)",
      }}
    >
      {/* Decorative rings */}
      <div className="absolute right-20 top-1/2 -translate-y-1/2 pointer-events-none opacity-10 hidden lg:block">
        <div className="target-ring" style={{ width: 400, height: 400 }} />
        <div
          className="target-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 260, height: 260 }}
        />
        <div
          className="target-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 130, height: 130 }}
        />
      </div>
      <div ref={ref} className="max-w-4xl mx-auto text-center relative z-10">
        <p className="text-amber-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
          Ready to Take Control?
        </p>
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
          Unlock Your <span className="aurora-text">Shooting Potential</span>{" "}
          Today
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-xl mx-auto">
          Join Range Tracker™ and bring the same discipline to your
          record-keeping that you bring to the range.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://rangetrackerapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-bold text-lg px-10 py-4 rounded-full shadow-2xl shadow-amber-500/30 transition-all duration-300 hover:scale-105"
          >
            Sign Up Free
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="#pricing"
            className="flex items-center justify-center gap-2 border border-white/20 hover:border-amber-400/50 text-white font-semibold text-lg px-10 py-4 rounded-full transition-all hover:bg-white/5"
          >
            View Plans
          </a>
        </div>
      </div>
    </section>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer className="bg-[#060e1a] border-t border-white/10 py-12 px-8">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <RangeTrackerLogo size={44} />
            <span className="text-white font-bold text-xl">
              Range Tracker
              <span className="text-amber-400 text-sm align-super">™</span>
            </span>
          </div>
          <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
            Your all-in-one digital shooting log. Designed by shooters, for
            shooters.
          </p>
          <a
            href="mailto:info@rangetracker.net"
            className="flex items-center gap-2 text-amber-400 hover:text-amber-300 text-sm mt-4 transition-colors"
          >
            <Mail size={14} />
            info@rangetracker.net
          </a>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
            Product
          </h4>
          <ul className="space-y-2">
            {[
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "FAQ", href: "#faq" },
              { label: "Contact", href: "#contact" },
            ].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-slate-500 hover:text-slate-300 text-sm transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* App link */}
        <div>
          <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">
            Get Started
          </h4>
          <a
            href="https://rangetrackerapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-bold text-sm px-5 py-2.5 rounded-full transition-all mb-3"
          >
            Open App
          </a>
          <p className="text-slate-600 text-xs">Forever free plan available</p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-slate-600 text-xs">
          &copy; {new Date().getFullYear()} Range Tracker™. All rights
          reserved.
        </p>
        <p className="text-slate-600 text-xs">
          Designed by shooters, for shooters.
        </p>
      </div>
    </div>
  </footer>
);

// ─── Root App ─────────────────────────────────────────────────────────────────
export const App = () => {
  return (
    <div className="font-inter text-white bg-[#0a1628]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <WhoUsesSection />
      <PricingSection />
      <TestimonialSection />
      <FaqSection />
      <ContactSection />
      <CtaBanner />
      <Footer />
    </div>
  );
};

export default App;
