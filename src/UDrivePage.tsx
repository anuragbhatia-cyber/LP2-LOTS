import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

// LOTS247 / UDrive — Landing page implemented from Figma node 443:10198.
// Self-contained: single file, Tailwind v4, DM Sans (via index.css).

const ONBOARDING_REDIRECT =
  'https://lots-247-design.vercel.app/sections/onboarding-and-activation/screen-designs/OnboardingFlow/fullscreen'

type Lang = 'English' | 'Hindi'
type LangCtx = { lang: Lang; setLang: (l: Lang) => void }
const LangContext = createContext<LangCtx>({ lang: 'English', setLang: () => {} })
function useLang() { return useContext(LangContext) }
function useT() {
  const { lang } = useLang()
  return (en: string, hi: string) => (lang === 'Hindi' ? hi : en)
}

type DashboardModalCtx = { open: (opts?: { initialPhone?: string }) => void }
const DashboardModalContext = createContext<DashboardModalCtx>({ open: () => {} })
function useOpenDashboardModal() { return useContext(DashboardModalContext).open }

export function UDrivePage() {
  const [lang, setLang] = useState<Lang>('English')
  const [modalOpen, setModalOpen] = useState(false)
  const [initialPhone, setInitialPhone] = useState('')

  const openModal = useCallback((opts?: { initialPhone?: string }) => {
    setInitialPhone((opts?.initialPhone ?? '').replace(/\D/g, '').slice(0, 10))
    setModalOpen(true)
  }, [])
  const closeModal = useCallback(() => setModalOpen(false), [])

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <DashboardModalContext.Provider value={{ open: openModal }}>
        <div className="bg-white text-stone-900 font-sans antialiased">
          <Header />
          <Hero />
          <Stats />
          <Clientele />
          <RoadReality />
          <HowItWorks />
          <WhatYouGet />
          <DashboardPreview />
          <Pricing />
          <UseCases />
          <Testimonials />
          <Faq />
          <Footer />
        </div>
        <DashboardModal open={modalOpen} onClose={closeModal} initialPhone={initialPhone} />
      </DashboardModalContext.Provider>
    </LangContext.Provider>
  )
}

/* ─────────────────────────── shared ─────────────────────────── */

function Wordmark({ tone = 'dark', variant = 'mark' }: { tone?: 'dark' | 'light'; variant?: 'mark' | 'full' }) {
  if (variant === 'full') {
    return (
      <a href="#" className="inline-flex items-center -ml-3">
        <img
          src="/lots247-logo-full-white.webp"
          alt="LOTS247 — India's first roadside legal assistance platform, by Lawyered"
          className="h-24 w-auto"
          loading="lazy"
          decoding="async"
        />
      </a>
    )
  }
  const src = tone === 'light' ? '/lots247-logo-white.png' : '/lots247-logo-dark.png'
  return (
    <a href="#" className="inline-flex items-center">
      <img src={src} alt="LOTS247" className="h-9 w-auto" />
    </a>
  )
}

function CtaButton({
  children, className = '', variant = 'solid', onClick, type = 'button',
}: {
  children: React.ReactNode
  className?: string
  variant?: 'solid' | 'invert' | 'outline'
  onClick?: () => void
  type?: 'button' | 'submit'
}) {
  const styles =
    variant === 'solid'
      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
      : variant === 'invert'
        ? 'bg-white text-stone-950 hover:bg-stone-100'
        : 'border border-stone-700 text-white hover:border-stone-500'
  return (
    <button type={type} onClick={onClick} className={`relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors ${styles} ${className}`}>
      {children}
    </button>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function SectionKicker(_props: {
  label: string
  align?: 'center' | 'left'
  tone?: 'emerald' | 'amber' | 'stone'
  surface?: 'light' | 'dark'
}) {
  return null
}

/** Editorial serif heading used across sections. */
function DisplayHeading({
  children,
  align = 'center',
  surface = 'light',
  size = 'lg',
  className = '',
}: {
  children: React.ReactNode
  align?: 'center' | 'left'
  surface?: 'light' | 'dark'
  size?: 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeCls = {
    md: 'text-[1.5rem] sm:text-[1.875rem] lg:text-[2.25rem]',
    lg: 'text-[1.75rem] sm:text-[2.125rem] lg:text-[2.75rem] xl:text-[3.125rem]',
    xl: 'text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]',
  }[size]
  const color = surface === 'dark' ? 'text-white' : 'text-stone-900'
  return (
    <h2
      className={[
        'font-serif-display font-medium text-balance leading-[1.02] tracking-[-0.02em]',
        sizeCls,
        color,
        align === 'center' ? 'text-center mx-auto max-w-[26ch]' : 'text-left max-w-[26ch]',
        className,
      ].join(' ')}
      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
    >
      {children}
    </h2>
  )
}

/* ─────────────────────────── 00 DASHBOARD MODAL ─────────────────────────── */

function DashboardModal({
  open, onClose, initialPhone,
}: { open: boolean; onClose: () => void; initialPhone: string }) {
  const t = useT()
  const [phone, setPhone] = useState(initialPhone)
  const [touched, setTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  // Reset state every time the modal opens
  useEffect(() => {
    if (!open) return
    setPhone(initialPhone)
    setTouched(false)
    setSubmitting(false)
  }, [open, initialPhone])

  // Body scroll lock + Escape to close + autofocus input
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const focusId = window.setTimeout(() => inputRef.current?.focus(), 60)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
      window.clearTimeout(focusId)
    }
  }, [open, onClose])

  if (!open) return null

  const valid = /^\d{10}$/.test(phone)
  const showError = touched && !valid

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setTouched(true)
    if (!valid || submitting) {
      inputRef.current?.focus()
      return
    }
    setSubmitting(true)
    window.location.href = ONBOARDING_REDIRECT
  }

  return (
    <div role="dialog" aria-modal="true" aria-labelledby="dashboard-modal-title" className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8 animate-fade-in" style={{ animationDuration: '120ms' }}>
      {/* backdrop */}
      <button
        type="button"
        aria-label={t('Close', 'बंद करें')}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/55 backdrop-blur-sm cursor-default"
      />

      {/* card */}
      <div className="relative w-full max-w-[460px] rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)] animate-fade-up overflow-hidden" style={{ animationDuration: '160ms' }}>
        {/* close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={t('Close', 'बंद करें')}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors"
        >
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>

        <div className="px-7 pt-8 pb-7 sm:px-9 sm:pt-10 sm:pb-9">
          <h2
            id="dashboard-modal-title"
            className="font-serif-display text-[1.75rem] sm:text-[2rem] font-medium leading-[1.05] tracking-[-0.02em] text-stone-900"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
          >
            {t('Enter mobile number', 'मोबाइल नंबर दर्ज करें')}
          </h2>

          <form onSubmit={onSubmit} className="mt-7">
            <label htmlFor="dashboard-phone" className="sr-only">{t('Mobile number', 'मोबाइल नंबर')}</label>
            <div className="relative">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none">
                <span className="font-mono text-[13px] font-semibold text-stone-600">+91</span>
                <span className="h-4 w-px bg-stone-300" />
              </div>
              <input
                ref={inputRef}
                id="dashboard-phone"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                onBlur={() => setTouched(true)}
                placeholder={t('Enter your mobile number', 'अपना मोबाइल नंबर दर्ज करें')}
                aria-invalid={showError || undefined}
                aria-describedby={showError ? 'dashboard-phone-error' : undefined}
                className={[
                  'w-full rounded-2xl border bg-white pl-[74px] pr-4 py-[18px] text-[15px] placeholder:text-stone-400 focus:outline-none focus:ring-2 transition-shadow shadow-[0_1px_0_rgba(0,0,0,0.02)]',
                  showError ? 'border-red-400 focus:ring-red-300 focus:border-transparent' : 'border-stone-300 focus:ring-emerald-500 focus:border-transparent',
                ].join(' ')}
              />
            </div>
            {showError && (
              <p id="dashboard-phone-error" className="mt-2 text-[12px] text-red-600">
                {t('Please enter a valid 10-digit mobile number.', 'कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।')}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-4 group relative w-full inline-flex items-center justify-center rounded-2xl bg-stone-900 px-8 py-[18px] text-[15px] font-semibold text-white hover:bg-stone-800 transition-colors shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span>{submitting ? t('Setting up…', 'तैयार किया जा रहा है…') : t('Continue', 'जारी रखें')}</span>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </form>

          <p className="mt-5 text-center font-mono-label text-[9.5px] text-stone-500">
            {t('By continuing, you agree to our ', 'जारी रखने पर आप हमारी ')}
            <a
              href="/terms"
              onClick={(e) => {
                e.preventDefault()
                onClose()
                window.history.pushState({}, '', '/terms')
                window.dispatchEvent(new PopStateEvent('popstate'))
              }}
              className="text-emerald-600 hover:text-emerald-700 underline underline-offset-2 transition-colors"
            >
              {t('Terms & Conditions', 'नियम व शर्तों')}
            </a>
            {t('', ' से सहमत होते हैं')}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── 01 HEADER ─────────────────────────── */

const NAV_ITEMS: { href: string; label: { en: string; hi: string } }[] = [
  { href: '#pricing', label: { en: 'Pricing', hi: 'मूल्य' } },
  { href: '#features', label: { en: 'Features', hi: 'विशेषताएँ' } },
  { href: '#faq', label: { en: 'FAQ', hi: 'सवाल-जवाब' } },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, setLang } = useLang()
  const t = useT()
  const openModal = useOpenDashboardModal()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll + close on Escape while drawer is open
  useEffect(() => {
    if (!menuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-40 h-[64px] sm:h-[72px] transition-[background,backdrop-filter,border-color,box-shadow] duration-300',
          scrolled
            ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/70 shadow-[0_4px_18px_-12px_rgba(0,0,0,0.18)]'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16 h-full flex items-center justify-between">
          <Wordmark tone="dark" />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-stone-700">
            {NAV_ITEMS.map(n => (
              <a
                key={n.href}
                href={n.href}
                className="px-4 py-2 rounded-full hover:bg-stone-900/5 hover:text-stone-900 transition-colors"
              >
                {t(n.label.en, n.label.hi)}
              </a>
            ))}
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden md:flex items-center gap-2.5">
            <LangSwitch value={lang} onChange={setLang} />
            <button type="button" onClick={() => openModal()} className="group inline-flex items-center gap-2 rounded-full bg-stone-900 hover:bg-stone-800 transition-colors px-4 py-2 text-[13px] font-semibold text-white">
              <span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span>
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-3 h-3 text-white" />
              </span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="md:hidden -mr-2 inline-flex items-center justify-center w-11 h-11 rounded-full text-stone-900 hover:bg-stone-900/5 active:bg-stone-900/10 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7" />
              <line x1="4" y1="13" x2="20" y2="13" />
              <line x1="4" y1="19" x2="14" y2="19" />
            </svg>
          </button>
        </div>
      </header>

      <MobileDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        nav={NAV_ITEMS}
        lang={lang}
        onLangChange={setLang}
      />
    </>
  )
}

function MobileDrawer({
  open, onClose, nav, lang, onLangChange,
}: {
  open: boolean
  onClose: () => void
  nav: { href: string; label: { en: string; hi: string } }[]
  lang: 'English' | 'Hindi'
  onLangChange: (l: 'English' | 'Hindi') => void
}) {
  const t = useT()
  const openModal = useOpenDashboardModal()
  return (
    <div
      className={[
        'md:hidden fixed inset-0 z-50 transition-opacity duration-200',
        open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
        className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
      />

      {/* Panel — slides from right, takes ~88% width to keep the page peeking */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={[
          'absolute right-0 top-0 h-full w-[88%] max-w-[400px] bg-[var(--color-cream)]',
          'flex flex-col shadow-[0_0_60px_-10px_rgba(0,0,0,0.35)]',
          'transition-transform duration-300 ease-out',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 h-[64px] border-b border-stone-200/70 shrink-0">
          <Wordmark tone="dark" />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="-mr-2 inline-flex items-center justify-center w-11 h-11 rounded-full text-stone-700 hover:bg-stone-900/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-[22px] h-[22px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-7 flex flex-col gap-7">
          {/* Nav */}
          <nav className="flex flex-col">
            {nav.map((n, i) => (
              <a
                key={n.href}
                href={n.href}
                onClick={onClose}
                className={[
                  'group flex items-center justify-between py-4 -mx-1 px-1 transition-colors',
                  i > 0 ? 'border-t border-stone-200/80' : '',
                ].join(' ')}
              >
                <span
                  className="font-serif-display text-[1.75rem] leading-[1.1] tracking-[-0.01em] text-stone-900"
                  style={{ fontVariationSettings: '"opsz" 96, "SOFT" 35' }}
                >
                  {t(n.label.en, n.label.hi)}
                </span>
                <span
                  aria-hidden="true"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white border border-stone-200 text-stone-500 transition-all group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </a>
            ))}
          </nav>

          {/* Language toggle — full-width segmented */}
          <div>
            <div className="font-mono-label text-[10px] text-stone-500 mb-2">{t('Language', 'भाषा')}</div>
            <div className="inline-flex items-center rounded-full bg-white border border-stone-200 p-1 w-full">
              {(['English', 'Hindi'] as const).map(l => {
                const active = lang === l
                return (
                  <button
                    key={l}
                    type="button"
                    onClick={() => onLangChange(l)}
                    className={[
                      'flex-1 h-10 rounded-full text-[13px] font-semibold transition-colors',
                      active ? 'bg-stone-900 text-white shadow-sm' : 'text-stone-600 hover:text-stone-900',
                    ].join(' ')}
                  >
                    {l === 'English' ? 'English' : 'हिन्दी'}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Call affordance */}
          <a
            href="tel:+919999999999"
            className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-white border border-stone-200 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
          >
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0">
              <PhoneIcon className="w-[18px] h-[18px]" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[13px] font-semibold text-stone-900">{t('Talk to support', 'सहायता से बात करें')}</span>
              <span className="text-[11.5px] text-stone-500">{t('Mon–Sat · 9 AM–9 PM IST', 'सोम–शनि · सुबह 9 – रात 9 IST')}</span>
            </span>
          </a>
        </div>

        {/* Pinned CTA */}
        <div className="px-5 py-4 border-t border-stone-200/70 bg-[var(--color-cream)] shrink-0">
          <button
            type="button"
            onClick={() => { onClose(); openModal() }}
            className="group relative w-full inline-flex items-center justify-center rounded-2xl bg-stone-900 px-6 py-[16px] text-[15px] font-semibold text-white hover:bg-stone-800 transition-colors shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]"
          >
            <span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>
          <p className="mt-3 text-center font-mono-label text-[9.5px] text-stone-500">
            {t('By continuing, you agree to our Terms & Conditions', 'जारी रखने पर आप हमारी नियम व शर्तों से सहमत होते हैं')}
          </p>
        </div>
      </aside>
    </div>
  )
}

const LANGS: Array<'English' | 'Hindi'> = ['English', 'Hindi']

function LangSwitch({
  value, onChange,
}: { value: 'English' | 'Hindi'; onChange: (l: 'English' | 'Hindi') => void }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="inline-flex items-center gap-2 rounded-full bg-[#f8f5f2] px-3.5 py-1.5 text-[11px] font-semibold text-stone-900 hover:bg-stone-200 transition-colors"
      >
        <span>{value === 'English' ? 'English' : 'हिन्दी'}</span>
        <svg viewBox="0 0 24 24" className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-lg bg-white border border-stone-200 shadow-lg py-1 z-30">
          {LANGS.map(l => (
            <button
              key={l}
              type="button"
              onMouseDown={() => { onChange(l); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-[12px] ${value === l ? 'text-emerald-600 font-semibold' : 'text-stone-700 hover:bg-stone-50'}`}
            >
              {l === 'English' ? 'English' : 'हिन्दी'}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── 02 HERO ─────────────────────────── */

function Hero() {
  const t = useT()
  const openModal = useOpenDashboardModal()
  const [heroPhone, setHeroPhone] = useState('')
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-cream)] pt-[72px]">
      {/* Hairline grid — operational dispatch feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16 pt-10 lg:pt-14 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 items-end gap-10 lg:gap-12">
          {/* Left copy + form */}
          <div className="lg:col-span-6 max-w-[640px]">
            <h1
              className="animate-fade-up font-serif-display font-medium text-stone-900 text-balance
                         text-[1.75rem] sm:text-[2.125rem] lg:text-[2.75rem] xl:text-[3.125rem]
                         leading-[1.05] tracking-[-0.025em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 25' }}
            >
              {t('Get Legal support for your commercial vehicle', 'अपने कमर्शियल वाहन के लिए कानूनी सहायता पाएँ')}
            </h1>

            <p className="animate-fade-up mt-6 lg:mt-8 text-[15px] lg:text-[17px] leading-[1.65] text-stone-700 max-w-[520px]" style={{ animationDelay: '120ms' }}>
              {t(
                'Get 24×7 on-call legal support, challan assistance and a vehicle-wise dashboard. Stay ready before a roadside issue becomes a business stoppage.',
                '24×7 ऑन-कॉल कानूनी सहायता, चालान निवारण और वाहन-वार डैशबोर्ड पाएँ। सड़क पर कोई समस्या आपके व्यापार को रोके, उससे पहले तैयार रहें।'
              )}
            </p>

            <form
              onSubmit={(e) => { e.preventDefault(); openModal({ initialPhone: heroPhone }) }}
              className="animate-fade-up mt-8 max-w-[460px]"
              style={{ animationDelay: '220ms' }}
            >
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none">
                  <span className="font-mono text-[13px] font-semibold text-stone-600">+91</span>
                  <span className="h-4 w-px bg-stone-300" />
                </div>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  value={heroPhone}
                  onChange={(e) => setHeroPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder={t('Enter your mobile number', 'अपना मोबाइल नंबर दर्ज करें')}
                  aria-label={t('Mobile number', 'मोबाइल नंबर')}
                  className="w-full rounded-2xl border border-stone-300 bg-white pl-[74px] pr-4 py-[18px] text-[15px] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                />
              </div>
              <button type="submit" className="mt-3 group relative w-full inline-flex items-center justify-center rounded-2xl bg-stone-900 px-8 py-[18px] text-[15px] font-semibold text-white hover:bg-stone-800 transition-colors shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
                <span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </form>
          </div>

          {/* Right illustration */}
          <div className="lg:col-span-6 relative animate-fade-up" style={{ animationDelay: '340ms' }}>
            <img
              src="/hero-truck.png"
              alt="Decorated commercial truck — driver on call with a lawyer"
              className="w-full max-w-[720px] mx-auto lg:mx-0 lg:ml-auto select-none pointer-events-none mix-blend-darken"
              draggable={false}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 03 STATS ─────────────────────────── */

const STATS: { v: string; l: { en: string; hi: string } }[] = [
  { v: '80,000+', l: { en: 'lawyers', hi: 'वकील' } },
  { v: '98%', l: { en: 'pin codes', hi: 'पिन कोड' } },
  { v: '24×7', l: { en: 'Legal Support', hi: 'कानूनी सहायता' } },
  { v: '75 Crore+', l: { en: 'Savings on Legal Fees', hi: 'कानूनी शुल्क में बचत' } },
]

function Stats() {
  const t = useT()
  return (
    <section className="bg-white border-y border-stone-200/70">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={[
                'py-10 lg:py-14 px-6 lg:px-8 flex flex-col items-start',
                i === 1 || i === 3 ? 'border-l border-stone-200' : '',
                i >= 2 ? 'border-t sm:border-t-0 border-stone-200' : '',
                i > 0 ? 'sm:border-l border-stone-200' : '',
              ].join(' ')}
            >
              <div
                className="font-serif-display font-semibold text-emerald-700 num-tabular
                           text-[1.625rem] sm:text-[2rem] lg:text-[2.5rem]
                           leading-[1] tracking-[-0.02em] min-h-[1.35em] flex items-center"
                style={{ fontVariationSettings: '"opsz" 120, "SOFT" 25' }}
              >
                {s.v.split('×').flatMap((part, idx, arr) =>
                  idx < arr.length - 1
                    ? [<span key={`p${idx}`}>{part}</span>, <span key={`x${idx}`} className="inline-block text-[1.35em] font-medium align-[-0.06em] mx-[0.02em]">×</span>]
                    : [<span key={`p${idx}`}>{part}</span>]
                )}
              </div>
              <div className="mt-1.5 font-mono-label text-[12px] sm:text-[13px] lg:text-[14px] text-stone-500 whitespace-nowrap">
                {t(s.l.en, s.l.hi)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 03b CLIENTELE ─────────────────────────── */

const CLIENTS = [
  'Tata Motors',
  'Mahindra',
  'Ashok Leyland',
  'BharatBenz',
  'Eicher',
  'VECV',
  'Force Motors',
  'SML Isuzu',
  'Delhivery',
  'BlackBuck',
  'Rivigo',
  'Porter',
]
const CLIENTS_LOOP = [...CLIENTS, ...CLIENTS]

function Clientele() {
  const t = useT()
  return (
    <section className="bg-white border-b border-stone-200/70">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16 py-10 lg:py-14">
        <p className="font-mono-label text-[10.5px] text-stone-500 text-center">
          {t('Trusted by fleets & logistics teams across India', 'भारत भर के फ्लीट और लॉजिस्टिक्स दलों का भरोसा')}
        </p>
        <div
          className="relative mt-8 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="flex w-max animate-marquee gap-12 lg:gap-16 pr-12 lg:pr-16">
            {CLIENTS_LOOP.map((name, i) => (
              <span
                key={i}
                className="shrink-0 font-serif-display text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-medium text-stone-400 hover:text-stone-700 transition-colors tracking-tight whitespace-nowrap"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 04 ROAD REALITY ─────────────────────────── */

type LocalizedCard = { img: string; alt: string; title: { en: string; hi: string }; body: { en: string; hi: string } }
const ROAD_REALITY_CARDS: LocalizedCard[] = [
  {
    img: '/issue-challan.png',
    alt: 'Driver overwhelmed by pending challan papers',
    title: { en: 'Challan Pressure', hi: 'चालान का दबाव' },
    body: { en: 'Pending challans piling up. Renewals and permits getting blocked.', hi: 'पेंडिंग चालान बढ़ते जा रहे हैं। रिन्यूअल और परमिट अटक रहे हैं।' },
  },
  {
    img: '/issue-police.png',
    alt: 'Driver speaking with a police officer at a checkpoint',
    title: { en: 'Police Checking', hi: 'पुलिस जाँच' },
    body: { en: 'Vehicle stopped, papers questioned, driver unsure what to say next.', hi: 'वाहन रोका गया, कागज़ात पर सवाल, ड्राइवर को समझ नहीं आ रहा क्या कहे।' },
  },
  {
    img: '/issue-business-delay.png',
    alt: 'Stressed business owner facing a delayed delivery schedule',
    title: { en: 'Business Delay', hi: 'व्यापार में देरी' },
    body: { en: 'One stuck trip cascades into missed deliveries and unhappy clients.', hi: 'एक रुकी हुई ट्रिप से डिलीवरी छूटती है और ग्राहक नाराज़ होते हैं।' },
  },
]

function RoadReality() {
  const t = useT()
  return (
    <section className="relative bg-[var(--color-cream-deep)] py-20 lg:py-28 overflow-hidden">
      {/* warning-territory dot pattern — subtle, hazard-tone */}
      <div className="absolute inset-0 bg-hazard-dots opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="max-w-[920px]">
          <SectionKicker label="The reality" tone="amber" align="left" />
          <DisplayHeading align="left" size="lg" className="mt-5">
            {t("One roadside issue can stop your full day's business", 'सड़क पर एक समस्या आपके पूरे दिन का काम रोक सकती है')}
          </DisplayHeading>
        </div>

        <div className="mt-14 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ROAD_REALITY_CARDS.map((c, i) => (
            <article
              key={i}
              className="group relative rounded-2xl bg-white border border-stone-200/80 overflow-hidden"
            >
              <div className="overflow-hidden aspect-[1536/1024] bg-stone-100">
                <img
                  src={c.img}
                  alt={c.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif-display text-[1.5rem] sm:text-[1.75rem] font-medium text-orange-700 leading-[1.05] tracking-tight">{t(c.title.en, c.title.hi)}</h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-stone-600">{t(c.body.en, c.body.hi)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 05 WHAT YOU GET ─────────────────────────── */

const WHAT_YOU_GET_SMALL: { title: { en: string; hi: string }; body: { en: string; hi: string } }[] = [
  { title: { en: 'Vehicle Dashboard', hi: 'वाहन डैशबोर्ड' }, body: { en: 'Vehicle, driver, challan and support details — all in one place.', hi: 'वाहन, ड्राइवर, चालान और सहायता — सब एक ही जगह।' } },
  { title: { en: 'Wallet Credits', hi: 'वॉलेट क्रेडिट' }, body: { en: 'Use available credits for eligible services right from the dashboard.', hi: 'डैशबोर्ड से ही उपलब्ध क्रेडिट का उपयोग पात्र सेवाओं पर करें।' } },
  { title: { en: 'Challan Assistance', hi: 'चालान सहायता' }, body: { en: 'Check, pay, contest and close challans with guided support.', hi: 'चालान देखें, भुगतान करें, चुनौती दें और सहायता के साथ बंद करें।' } },
  { title: { en: 'On-Ground Lawyer', hi: 'मौके पर वकील' }, body: { en: 'If physical support is needed, a lawyer is arranged on actual basis.', hi: 'मौके पर सहायता ज़रूरी हो तो वकील वास्तविक आधार पर भेजा जाता है।' } },
]

function WhatYouGet() {
  const t = useT()
  const openModal = useOpenDashboardModal()
  return (
    <section id="features" className="bg-[var(--color-cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="max-w-[820px] mx-auto text-center">
          <SectionKicker label="What you get" />
          <DisplayHeading className="mt-5" size="lg">
            {t('Everything your vehicle needs to stay legally ready', 'आपके वाहन को कानूनी रूप से तैयार रखने के लिए ज़रूरी सब कुछ')}
          </DisplayHeading>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Big "Included" feature card — ink dark for emphasis */}
          <article className="lg:col-span-6 relative overflow-hidden rounded-[24px] bg-white text-stone-900 border border-stone-200 min-h-[400px] sm:min-h-[420px] transition-all duration-300 hover:-translate-y-0.5">
            {/* soft emerald halo */}
            <div className="pointer-events-none absolute -left-24 -top-24 w-[420px] h-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
            <img
              src="/lawyer-on-call.png"
              alt="Lawyer at desk on a phone call with legal books and laptop"
              className="absolute bottom-0 right-0 w-[58%] max-w-[380px] select-none pointer-events-none z-0"
              draggable={false}
              loading="lazy"
              decoding="async"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, black 28%, black 100%), linear-gradient(to right, transparent 0%, black 28%, black 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, black 28%, black 100%), linear-gradient(to right, transparent 0%, black 28%, black 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            />
            <div className="relative z-10 pt-6 pr-10 pb-10 pl-7 sm:pt-7 sm:pr-12 sm:pb-12 sm:pl-8">
              <div className="inline-flex items-center gap-2.5">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono-label text-[10.5px] text-emerald-600">{t('Included', 'शामिल')}</span>
              </div>
              <h3 className="mt-6 font-serif-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.02] tracking-[-0.02em] text-stone-900">
                {t('24×7 On-Call Legal Support', '24×7 ऑन-कॉल कानूनी सहायता')}
              </h3>
              <p className="mt-6 text-[14px] sm:text-[15px] leading-[1.65] text-stone-600 max-w-[360px]">
                {t('Talk to legal support the moment your vehicle faces a roadside issue.', 'जैसे ही आपके वाहन को सड़क पर कोई समस्या आए, तुरंत कानूनी सहायता से बात करें।')}
              </p>
            </div>
          </article>

          {/* 4 small editorial cards in 2x2 */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {WHAT_YOU_GET_SMALL.map((c, i) => (
              <div
                key={i}
                className="group relative rounded-[20px] border border-stone-300/70 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.10)]"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono-label text-[9.5px] text-stone-400 num-tabular">{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true" className="h-px w-6 bg-stone-300 group-hover:bg-emerald-500 transition-colors" />
                </div>
                <h4 className="mt-5 font-serif-display text-[1.25rem] sm:text-[1.375rem] font-medium tracking-tight text-stone-900 leading-[1.1]">{t(c.title.en, c.title.hi)}</h4>
                <p className="mt-2 text-[12.5px] leading-[1.6] text-stone-600">{t(c.body.en, c.body.hi)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button type="button" onClick={() => openModal()} className="group relative inline-flex items-center gap-3 rounded-full bg-stone-900 hover:bg-stone-800 transition-colors px-8 py-4 text-[14px] font-semibold text-white">
            <span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 06 HOW IT WORKS ─────────────────────────── */

const HOW_IT_WORKS_STEPS: { title: { en: string; hi: string }; body: { en: string; hi: string } }[] = [
  { title: { en: 'Enter mobile number', hi: 'मोबाइल नंबर दर्ज करें' }, body: { en: 'Add your mobile number to get started — no documents needed.', hi: 'शुरू करने के लिए अपना मोबाइल नंबर डालें — कोई दस्तावेज़ नहीं चाहिए।' } },
  { title: { en: 'Verify OTP', hi: 'OTP सत्यापित करें' }, body: { en: 'Quick mobile OTP confirms your number in seconds.', hi: 'त्वरित मोबाइल OTP आपके नंबर की पुष्टि सेकंडों में करता है।' } },
  { title: { en: 'Choose your plan', hi: 'अपना प्लान चुनें' }, body: { en: 'Pick the plan that fits your vehicle and business needs.', hi: 'अपने वाहन और व्यापार के लिए सही प्लान चुनें।' } },
  { title: { en: 'Create your dashboard', hi: 'अपना डैशबोर्ड बनाएँ' }, body: { en: 'Unlock 24×7 legal support, challan assistance and wallet credits.', hi: '24×7 कानूनी सहायता, चालान सहायता और वॉलेट क्रेडिट अनलॉक करें।' } },
]
const HOW_IT_WORKS_TOTAL = HOW_IT_WORKS_STEPS.length

function HowItWorks() {
  const t = useT()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = window.setInterval(() => {
      setActive(prev => (prev + 1) % HOW_IT_WORKS_TOTAL)
    }, 3200)
    return () => { if (intervalRef.current !== null) window.clearInterval(intervalRef.current) }
  }, [paused])

  const progress = HOW_IT_WORKS_TOTAL > 1 ? active / (HOW_IT_WORKS_TOTAL - 1) : 0

  // Mobile carousel — track which card is centered, sync with autoplay
  const trackRef = useRef<HTMLUListElement | null>(null)
  const [mobileActive, setMobileActive] = useState(0)

  // Drive autoplay → scroll on mobile when paused === false
  useEffect(() => {
    if (paused) return
    const track = trackRef.current
    if (!track) return
    const card = track.children[active] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
  }, [active, paused])

  // Observe scroll on mobile track to keep dots / desktop active synced
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const center = track.scrollLeft + track.clientWidth / 2
        let nearest = 0
        let bestDist = Infinity
        for (let i = 0; i < track.children.length; i++) {
          const el = track.children[i] as HTMLElement
          const elCenter = el.offsetLeft + el.offsetWidth / 2 - track.offsetLeft
          const d = Math.abs(elCenter - center)
          if (d < bestDist) { bestDist = d; nearest = i }
        }
        setMobileActive(nearest)
      })
    }
    track.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      track.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section className="bg-white py-20 lg:py-28 border-y border-stone-200/60">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-[1100px] mx-auto">
          <SectionKicker label="How it works" />
          <DisplayHeading className="mt-5" size="lg">
            {t('Start in 4 simple steps', '4 आसान चरणों में शुरू करें')}
          </DisplayHeading>
          <p className="mt-5 text-[14px] sm:text-[15px] text-stone-600 leading-relaxed max-w-[34ch] sm:max-w-none mx-auto">
            {t('From vehicle entry to active legal cover in under two minutes — no documents required upfront.', 'वाहन दर्ज करने से लेकर सक्रिय कानूनी सुरक्षा तक — दो मिनट से भी कम में, बिना कोई दस्तावेज़।')}
          </p>
        </div>

        <div
          className="mt-10 lg:mt-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {/* MOBILE: horizontal snap carousel — full-bleed, peek next card */}
          <div className="lg:hidden -mx-4">
            <ul
              ref={trackRef}
              className="no-scrollbar flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 px-4 py-3"
              style={{ scrollPaddingLeft: '16px' }}
            >
              {HOW_IT_WORKS_STEPS.map((step, i) => (
                <li
                  key={i}
                  className="snap-start shrink-0 w-[82vw] max-w-[320px]"
                >
                  <article className="relative h-full rounded-2xl bg-white ring-1 ring-stone-200 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)] p-5 flex flex-col">
                    <header className="flex items-center gap-3">
                      <span className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500 text-white text-[11px] font-bold font-mono">
                        0{i + 1}
                      </span>
                      <h3 className="text-[15px] font-bold leading-tight tracking-tight text-stone-900">
                        {t(step.title.en, step.title.hi)}
                      </h3>
                    </header>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-stone-600">
                      {t(step.body.en, step.body.hi)}
                    </p>
                    <div className="relative mt-4 mx-auto w-full max-w-[220px] rounded-[20px] bg-gradient-to-br from-emerald-50 via-white to-stone-50 border border-stone-200/80 px-2 py-1 overflow-hidden">
                      <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 h-32 w-[85%] rounded-full bg-emerald-500/20 blur-3xl" />
                      <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-emerald-200/40 blur-3xl" />
                      <div className="relative">
                        <HowPhoneScreen step={i} />
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>

            {/* Progress dots */}
            <div className="mt-5 px-4 flex items-center justify-center gap-2">
              {HOW_IT_WORKS_STEPS.map((_, i) => {
                const isActive = i === mobileActive
                return (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Go to step ${i + 1}`}
                    onClick={() => {
                      const track = trackRef.current
                      if (!track) return
                      const card = track.children[i] as HTMLElement
                      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
                      setPaused(true)
                    }}
                    className={[
                      'h-1.5 rounded-full transition-all',
                      isActive ? 'w-6 bg-stone-900' : 'w-1.5 bg-stone-300 hover:bg-stone-400',
                    ].join(' ')}
                  />
                )
              })}
            </div>
          </div>

          {/* DESKTOP: vertical stepper + sticky phone */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_minmax(0,380px)] gap-14 items-start">
            <div className="relative">
              <div className="absolute left-[39.5px] top-8 bottom-8 w-px bg-stone-200 z-0" aria-hidden="true" />
              <div
                className="absolute left-[39.5px] top-8 w-px bg-emerald-500 z-0 transition-[height] duration-700 ease-out"
                style={{ height: `calc((100% - 64px) * ${progress})` }}
                aria-hidden="true"
              />

              <ol className="space-y-6 max-w-[560px]">
                {HOW_IT_WORKS_STEPS.map((step, i) => {
                  const isActive = i === active
                  const isPast = i < active
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className={[
                          'group relative z-10 w-full text-left flex items-start gap-5 rounded-2xl px-3 py-4 transition-all duration-300',
                          isActive
                            ? 'bg-white ring-1 ring-stone-200 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)]'
                            : 'hover:bg-white/60',
                        ].join(' ')}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span
                          className={[
                            'relative shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full text-sm font-bold transition-all duration-300',
                            isActive
                              ? 'bg-stone-900 text-white shadow-[0_8px_16px_-6px_rgba(0,0,0,0.35)] scale-105'
                              : isPast
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white text-stone-500 ring-1 ring-stone-300',
                          ].join(' ')}
                        >
                          {isPast ? (
                            <CheckIcon className="w-5 h-5" />
                          ) : (
                            <span className="font-mono">0{i + 1}</span>
                          )}
                        </span>

                        <span className="flex-1 min-w-0 pt-1">
                          <span className={[
                            'block text-[18px] font-bold leading-tight tracking-tight',
                            isActive ? 'text-stone-900' : isPast ? 'text-stone-500' : 'text-stone-800',
                          ].join(' ')}>
                            {t(step.title.en, step.title.hi)}
                          </span>
                          <span className={[
                            'mt-2 block text-[14px] leading-relaxed transition-colors',
                            isActive ? 'text-stone-600' : isPast ? 'text-stone-400' : 'text-stone-500',
                          ].join(' ')}>
                            {t(step.body.en, step.body.hi)}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="sticky top-24">
              <div className="relative rounded-[24px] bg-gradient-to-br from-emerald-50 via-white to-stone-50 border border-stone-200/80 px-2 py-1 overflow-hidden">
                <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 h-40 w-[85%] rounded-full bg-emerald-500/25 blur-3xl" />
                <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />

                <div className="relative mx-auto w-full max-w-[320px]">
                  <HowPhoneScreen step={active} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const HOW_PHONE_SOURCES = ['/device-step-1.png', '/device-step-otp.png', '/device-step-2.png', '/device-step-3.png']
const HOW_PHONE_ALTS = ['Enter mobile number', 'Verify OTP', 'Choose your plan', 'Dashboard ready']

function HowPhoneScreen({ step }: { step: number }) {
  const idx = Math.min(step, HOW_PHONE_SOURCES.length - 1)
  return (
    <img
      key={step}
      src={HOW_PHONE_SOURCES[idx]}
      alt={HOW_PHONE_ALTS[idx]}
      loading="lazy"
      decoding="async"
      className="block w-full h-auto animate-fade-in"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  )
}

/* ─────────────────────────── 07 DASHBOARD PREVIEW ─────────────────────────── */

const LOCKED_FEATURES: { en: string; hi: string }[] = [
  { en: '24/7 Lawyer Availability', hi: '24/7 वकील उपलब्धता' },
  { en: 'Easy Challan Resolution', hi: 'आसान चालान निवारण' },
  { en: 'Wallet Benefit Credits', hi: 'वॉलेट बेनिफिट क्रेडिट' },
]

function DashboardPreview() {
  const openModal = useOpenDashboardModal()
  const t = useT()
  return (
    <section className="relative bg-[var(--color-ink)] text-white py-24 lg:py-32 overflow-hidden">
      {/* atmospheric depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 380px at 20% 20%, rgba(0,184,118,0.10), transparent 60%), radial-gradient(700px 500px at 90% 80%, rgba(255,255,255,0.04), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="text-center max-w-[680px] mx-auto">
          <SectionKicker label="The dashboard" surface="dark" />
          <h2
            className="font-serif-display mt-5 font-medium text-balance text-white text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.02em]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
          >
            {t('Your vehicle dashboard, built for daily business movement', 'आपका वाहन डैशबोर्ड, रोज़मर्रा के व्यापार के लिए बनाया गया')}
          </h2>
        </div>

        {/* MOBILE: dashboard preview visible, unlock card stacked below */}
        <div className="lg:hidden mt-12 space-y-4">
          <div className="relative overflow-hidden rounded-2xl bg-stone-950 border border-white/10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.5)]">
            <img
              src="/dashboard-preview.png"
              alt="LOTS247 vehicle dashboard"
              className="block w-full h-auto"
              loading="lazy"
              decoding="async"
            />
            {/* Soft fade at bottom edge to hint there's more & blend into the unlock card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-stone-950 to-transparent"
            />
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex w-11 h-11 rounded-xl bg-stone-950 border border-white/10 items-center justify-center text-white shrink-0">
                <LockIcon className="w-5 h-5" />
              </span>
              <div className="min-w-0">
                <div className="font-mono-label text-[10px] text-amber-400">{t('Locked', 'लॉक')}</div>
                <div className="text-[15px] font-semibold text-white leading-tight">
                  {t('Unlock after activation', 'सक्रिय करने के बाद अनलॉक')}
                </div>
              </div>
            </div>

            <ul className="mt-5 space-y-2">
              {LOCKED_FEATURES.map((f) => (
                <li
                  key={f.en}
                  className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-3"
                >
                  <span className="text-[14px] font-medium text-stone-200 truncate">{t(f.en, f.hi)}</span>
                  <span className="inline-flex items-center gap-1 text-[9.5px] font-bold text-amber-400 uppercase tracking-[0.12em] flex-shrink-0">
                    <LockIcon className="w-3 h-3" />
                    {t('Locked', 'लॉक')}
                  </span>
                </li>
              ))}
            </ul>

            <button type="button" onClick={() => openModal()} className="group relative mt-5 w-full inline-flex items-center justify-center rounded-2xl bg-emerald-500 px-6 py-[16px] text-[14px] font-semibold text-white hover:bg-emerald-600 transition-colors shadow-[0_8px_24px_-12px_rgba(0,184,118,0.55)]">
              <span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span>
              <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-stone-950/25 transition-transform group-hover:translate-x-0.5">
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </button>
          </div>
        </div>

        {/* DESKTOP: side-by-side preview with right-side unlock overlay */}
        <div className="hidden lg:block relative mt-16">
          <div className="absolute -inset-x-5 top-10 rounded-[32px] bg-emerald-500/8" />
          <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.25)] bg-stone-950 min-h-[760px]">
            <img
              src="/dashboard-preview.png"
              alt="LOTS247 vehicle dashboard"
              className="absolute inset-0 w-full h-full object-cover object-left-top block"
              loading="lazy"
              decoding="async"
            />

            <div className="absolute inset-y-0 right-0 left-[42%] backdrop-blur-[4px] bg-white/40 flex items-center justify-center pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 8%, rgba(255,255,255,0.55) 100%)',
                }}
              />
              <div className="relative text-center px-6 w-full max-w-md pointer-events-auto">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-950 text-white shadow-2xl">
                  <LockIcon className="w-6 h-6" />
                </div>

                <div className="mt-6 space-y-2">
                  {LOCKED_FEATURES.map((f) => (
                    <div
                      key={f.en}
                      className="flex items-center justify-between gap-3 rounded-xl bg-white/85 border border-stone-200 px-4 py-2.5 text-[14px] font-medium text-stone-800 shadow-sm"
                    >
                      <span className="truncate">{t(f.en, f.hi)}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-600 uppercase tracking-[0.12em] flex-shrink-0">
                        <LockIcon className="w-3 h-3" />
                        {t('Locked', 'लॉक')}
                      </span>
                    </div>
                  ))}
                </div>

                <button type="button" onClick={() => openModal()} className="mt-6 group relative w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3.5 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors">
                  <span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

/* ─────────────────────────── 08 PRICING ─────────────────────────── */

const PRICING_INCLUDES: { label: { en: string; hi: string }; value: 'check' | { en: string; hi: string }; indent?: boolean }[] = [
  { label: { en: 'No. of Vehicles', hi: 'वाहनों की संख्या' }, value: { en: '1', hi: '1' } },
  { label: { en: '24/7 On-Call', hi: '24/7 ऑन-कॉल' }, value: 'check' },
  { label: { en: 'On-Site Legal', hi: 'मौके पर कानूनी' }, value: 'check' },
  { label: { en: 'Challan Service', hi: 'चालान सेवा' }, value: 'check' },
  { label: { en: 'Online', hi: 'ऑनलाइन' }, value: 'check', indent: true },
  { label: { en: 'Lok Adalat', hi: 'लोक अदालत' }, value: 'check', indent: true },
  { label: { en: 'Court', hi: 'न्यायालय' }, value: 'check', indent: true },
  { label: { en: 'RTO Services', hi: 'RTO सेवाएँ' }, value: { en: 'Pay Per Use', hi: 'प्रति उपयोग शुल्क' } },
  { label: { en: 'Dashboard', hi: 'डैशबोर्ड' }, value: 'check' },
]
const PRICING_COST_ROWS: { l: { en: string; hi: string }; v: string }[] = [
  { l: { en: 'One private lawyer consult', hi: 'एक निजी वकील परामर्श' }, v: '₹3,000' },
  { l: { en: 'RTO challan resolution', hi: 'RTO चालान निवारण' }, v: '₹1,500' },
]

function Pricing() {
  const openModal = useOpenDashboardModal()
  const t = useT()
  return (
    <section id="pricing" className="relative bg-[var(--color-cream)] py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="text-center">
          <SectionKicker label="Pricing" />
          <DisplayHeading className="mt-5" size="lg">
            {t('Activate your vehicle and get wallet credits', 'अपना वाहन सक्रिय करें और वॉलेट क्रेडिट पाएँ')}
          </DisplayHeading>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-6 items-start">
          {/* Dark pricing card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-[var(--color-ink)] p-8 lg:p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
            <div className="absolute -right-16 -bottom-16 w-[420px] h-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="font-mono-label text-[10.5px] text-emerald-300">{t('UDrive Vehicle Plan', 'UDrive वाहन प्लान')}</span>
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span
                  className="font-serif-display text-[2.75rem] lg:text-[3.75rem] font-medium tracking-[-0.03em] text-white leading-[0.9] num-tabular"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 25' }}
                >
                  ₹999
                </span>
                <span className="font-mono-label text-[10px] text-stone-400">{t('per vehicle / year', 'प्रति वाहन / वर्ष')}</span>
              </div>
              <div className="mt-3 text-[15px] text-stone-300">{t('Works out to ~₹83 / month', 'लगभग ₹83 / माह')}</div>

              <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-16">
                {PRICING_INCLUDES.map((it) => (
                  <li key={it.label.en} className="flex items-center justify-between gap-4 py-2.5 border-b border-white/10">
                    <span className="text-[14px] lg:text-[15px] text-stone-200 leading-snug">{t(it.label.en, it.label.hi)}</span>
                    {it.value === 'check' ? (
                      <span aria-label={t('Included', 'शामिल')} className="inline-flex items-center justify-center text-emerald-400 shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                    ) : (
                      <span className="text-[14px] lg:text-[15px] font-semibold text-white shrink-0">{t(it.value.en, it.value.hi)}</span>
                    )}
                  </li>
                ))}
              </ul>

              <button type="button" onClick={() => openModal()} className="mt-8 group relative w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3.5 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors">
                <span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </div>
          </div>

          {/* Right panels */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white px-7 py-4 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center gap-5">
                <div className="min-w-0 flex-1">
                  <h3
                    className="font-serif-display text-[1.875rem] lg:text-[2.25rem] font-medium tracking-[-0.02em] leading-[1.05] text-stone-900 num-tabular"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                  >
                    {t('You pay 999,', 'आप 999 देते हैं,')} <span className="inline-block rounded-md bg-emerald-100 text-emerald-800 px-2 py-0.5">{t('you get 1,100', '1,100 आपको मिलते हैं')}</span> {t('wallet benefit back', 'वॉलेट बेनिफिट के रूप में')}
                  </h3>
                </div>
                <img
                  src="/wallet-coin.png"
                  alt="Gold coin — wallet recharge"
                  className="shrink-0 w-24 h-24 lg:w-28 lg:h-28 object-contain select-none pointer-events-none"
                  draggable={false}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <div className="text-[12px] font-bold tracking-[0.18em] text-stone-600">{t('WHAT IT WOULD COST OTHERWISE', 'सामान्य तौर पर इसकी कीमत')}</div>
                <div className="text-[12px] font-bold tracking-[0.14em] text-stone-500">{t('PER YEAR', 'प्रति वर्ष')}</div>
              </div>

              <ul className="mt-5 space-y-3.5">
                {PRICING_COST_ROWS.map((r, i) => (
                  <li key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-2.5 h-2.5"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                      </span>
                      <span className="text-[13px] font-medium text-stone-700">{t(r.l.en, r.l.hi)}</span>
                    </div>
                    <span className="text-[14px] font-semibold text-stone-400 line-through tabular-nums">{r.v}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-dashed border-stone-200 pt-4">
                <span className="text-[11px] font-medium text-stone-500">{t('Typical yearly cost', 'सामान्य वार्षिक खर्च')}</span>
                <span className="text-[14px] font-bold text-stone-700 tabular-nums">₹4,500+</span>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <div className="text-[13px] font-semibold text-stone-900">{t('UDrive — full year, per vehicle', 'UDrive — पूरा साल, प्रति वाहन')}</div>
                  </div>
                  <span className="text-[18px] font-bold text-emerald-700 tabular-nums leading-none">₹999</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-px flex-1 bg-stone-200" />
                <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase">{t('You save ₹3,500+ a year', 'सालाना ₹3,500+ की बचत')}</span>
                <span className="h-px flex-1 bg-stone-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 09 USE CASES ─────────────────────────── */

type LocalizedUseCase = { num: string; time: { en: string; hi: string }; title: { en: string; hi: string }; body: { en: string; hi: string }; outcome: { en: string; hi: string } }
const USE_CASES: LocalizedUseCase[] = [
  { num: '01', time: { en: '11:42 PM · Highway', hi: 'रात 11:42 · हाईवे' }, title: { en: 'Police checking on highway', hi: 'हाईवे पर पुलिस जाँच' }, body: { en: 'Quick call to a lawyer who guides the driver through the conversation.', hi: 'वकील को त्वरित कॉल जो ड्राइवर को बातचीत में मार्गदर्शन देता है।' }, outcome: { en: 'Truck moves in ~15 min', hi: 'ट्रक ~15 मिनट में आगे बढ़ता है' } },
  { num: '02', time: { en: 'Renewal day · Office', hi: 'रिन्यूअल का दिन · ऑफ़िस' }, title: { en: 'Pending challan blocking permit', hi: 'पेंडिंग चालान से परमिट अटका' }, body: { en: 'Guided resolution — online, Lok Adalat or court — whatever fits.', hi: 'मार्गदर्शित समाधान — ऑनलाइन, लोक अदालत या न्यायालय — जो उपयुक्त हो।' }, outcome: { en: 'Permit unblocked', hi: 'परमिट खुल गया' } },
  { num: '03', time: { en: 'Saturday · Local road', hi: 'शनिवार · स्थानीय सड़क' }, title: { en: 'Minor accident or dispute', hi: 'छोटी दुर्घटना या विवाद' }, body: { en: 'On-ground lawyer arranged when needed. Driver is not alone.', hi: 'ज़रूरत पड़ने पर मौके पर वकील। ड्राइवर अकेला नहीं है।' }, outcome: { en: 'Driver not alone', hi: 'ड्राइवर अकेला नहीं' } },
  { num: '04', time: { en: 'Monday morning · RTO', hi: 'सोमवार सुबह · RTO' }, title: { en: 'Document confusion at RTO', hi: 'RTO पर दस्तावेज़ों की उलझन' }, body: { en: 'Support to figure out what is required and where to file it.', hi: 'क्या ज़रूरी है और कहाँ जमा करना है — इसमें सहायता।' }, outcome: { en: 'No more guesswork', hi: 'अब कोई अंदाज़ा नहीं' } },
]

function UseCases() {
  const t = useT()
  const openModal = useOpenDashboardModal()
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* faint hairline grid — operational dispatch feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 font-mono-label text-[10.5px] text-stone-500">
            <span className="h-px w-6 bg-stone-300" />
            {t('Real moments', 'असली पल')}
            <span className="h-px w-6 bg-stone-300" />
          </div>
          <DisplayHeading className="mt-5" size="lg">
            {t('Built for the moments that stop your day.', 'उन पलों के लिए बना है जो आपका दिन रोक देते हैं।')}
          </DisplayHeading>
        </div>

        {/* cards */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {USE_CASES.map((c, i) => (
            <article
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-stone-50 transition-all duration-300 hover:bg-stone-100/80 hover:-translate-y-0.5"
            >
              {/* header strip — number + time chip */}
              <div className="px-5 pt-5 pb-3 flex items-baseline justify-between">
                <span className="font-mono-label text-[10.5px] text-stone-400 tabular-nums">
                  {c.num} <span className="text-stone-300">/ 04</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.04em] text-stone-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  {t(c.time.en, c.time.hi)}
                </span>
              </div>

              {/* problem zone */}
              <div className="px-5 pb-6 flex-1">
                <h3
                  className="font-serif-display text-[1.25rem] sm:text-[1.3rem] font-medium leading-[1.15] tracking-[-0.01em] text-stone-900"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                >
                  {t(c.title.en, c.title.hi)}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-stone-600">
                  {t(c.body.en, c.body.hi)}
                </p>
              </div>

              {/* resolution strip — visually distinct, white bg, emerald accent */}
              <div className="relative bg-white border-t border-stone-200/80 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_2px_8px_-2px_rgba(16,185,129,0.55)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                      <polyline points="4 12 10 18 20 6" />
                    </svg>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono-label text-[9px] text-stone-400">{t('Outcome', 'परिणाम')}</span>
                    <span className="text-[12.5px] font-semibold text-stone-900 tracking-tight">{t(c.outcome.en, c.outcome.hi)}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <CtaButton onClick={() => openModal()}><span>{t('Create My Dashboard', 'मेरा डैशबोर्ड बनाएँ')}</span><ArrowRight className="w-4 h-4" /></CtaButton>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 10 TESTIMONIALS ─────────────────────────── */

type Testi = { quote: { en: string; hi: string }; name: string; img: string; role: { en: string; hi: string }; meta: { en: string; hi: string } }
const TESTIS: Testi[] = [
  {
    quote: { en: 'My driver was stopped near Sonipat at 11 PM. One call and the lawyer guided him through the whole thing. The truck moved by midnight.', hi: 'मेरा ड्राइवर रात 11 बजे सोनीपत के पास रोका गया। एक कॉल और वकील ने पूरा मामला संभाल लिया। आधी रात तक ट्रक आगे बढ़ गया।' },
    name: 'Rakesh Yadav', img: '/rakesh.jpg',
    role: { en: 'Owner, transport business · Sonipat, NH-44', hi: 'मालिक, ट्रांसपोर्ट व्यापार · सोनीपत, NH-44' },
    meta: { en: '8 trucks · 14 months on UDrive · 9 lawyer calls', hi: '8 ट्रक · UDrive पर 14 माह · 9 वकील कॉल' },
  },
  {
    quote: { en: "I used to lose two days every month chasing challans. Now I just open the dashboard, pay or contest, and it's done.", hi: 'पहले हर महीने दो दिन चालान निपटाने में लगते थे। अब डैशबोर्ड खोला, भुगतान किया या चुनौती दी, हो गया।' },
    name: 'Suman Patel', img: '/suman.jpg',
    role: { en: 'Proprietor, tempo fleet · Ahmedabad', hi: 'मालिक, टेम्पो फ्लीट · अहमदाबाद' },
    meta: { en: '12 tempos · 8 months on UDrive · 22 challans cleared', hi: '12 टेम्पो · UDrive पर 8 माह · 22 चालान निपटे' },
  },
  {
    quote: { en: 'For my size of business, hiring a lawyer was never possible. UDrive gives me that comfort at a price I can actually pay.', hi: 'मेरे आकार के व्यापार के लिए वकील रखना संभव नहीं था। UDrive मुझे वही भरोसा एक किफायती क़ीमत पर देता है।' },
    name: 'Mohammed Aslam', img: '/aslam.jpg',
    role: { en: 'Cab operator · Hyderabad', hi: 'कैब ऑपरेटर · हैदराबाद' },
    meta: { en: '1 cab · 6 months on UDrive · 3 lawyer calls', hi: '1 कैब · UDrive पर 6 माह · 3 वकील कॉल' },
  },
]
const MINI_TESTIS: { en: string; hi: string }[] = [
  { en: 'Saved me 4 hours at the RTO last week. — Vikram, Jaipur', hi: 'पिछले हफ्ते RTO में मेरे 4 घंटे बचाए। — विक्रम, जयपुर' },
  { en: 'Driver felt confident because lawyer was on call. — Nitin, Pune', hi: 'वकील ऑन-कॉल था तो ड्राइवर पूरी तरह आश्वस्त था। — नितिन, पुणे' },
  { en: 'Challan was contested and reduced. — Arif, Lucknow', hi: 'चालान को चुनौती मिली और राशि कम हुई। — आरिफ़, लखनऊ' },
  { en: 'For ₹999 a year, this is a no-brainer. — Priya, Bengaluru', hi: 'साल के ₹999 में, इसमें सोचने वाली कोई बात नहीं। — प्रिया, बेंगलुरु' },
]
const MINI_TESTIS_LOOP = [...MINI_TESTIS, ...MINI_TESTIS]

function Testimonials() {
  const t = useT()
  return (
    <section className="bg-[var(--color-cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="text-center">
          <SectionKicker label="Voices from the road" />
          <DisplayHeading className="mt-5" size="lg">
            {t('Built for businesses that cannot afford vehicle stoppage', 'उन व्यवसायों के लिए बना है जो वाहन रुकने की कीमत नहीं उठा सकते')}
          </DisplayHeading>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIS.map((ti, i) => (
            <div key={i} className="rounded-2xl border border-emerald-500 bg-white p-7 flex flex-col min-h-[300px] transition-colors duration-300 hover:border-emerald-600">
              <span
                aria-hidden="true"
                className="font-serif-display text-[72px] leading-[0.6] text-emerald-500 select-none"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
              >&ldquo;</span>
              <p className="mt-3 font-serif-display text-[17px] leading-[1.45] text-stone-800 italic" style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50' }}>{t(ti.quote.en, ti.quote.hi)}</p>
              <div className="mt-auto pt-5 border-t border-stone-200">
                <div className="mt-3 flex items-center gap-3">
                  <img src={ti.img} alt={ti.name} loading="lazy" decoding="async" className="h-10 w-10 rounded-full object-cover border border-stone-200" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-stone-900">{ti.name}</span>
                      <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2 h-2"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500">{t(ti.role.en, ti.role.hi)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono-label text-[10.5px] text-stone-500">{t('More voices from the road', 'सड़क से और भी आवाज़ें')}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-stone-300" />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            <div className="flex w-max animate-marquee gap-3 pr-3">
              {MINI_TESTIS_LOOP.map((q, i) => (
                <div key={i} className="shrink-0 w-[320px] sm:w-[360px] rounded-xl border border-stone-300/70 bg-white px-4 py-4">
                  <span className="font-serif-display text-[13px] leading-[1.5] text-stone-800 italic" style={{ fontVariationSettings: '"opsz" 24, "SOFT" 60' }}>{t(q.en, q.hi)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 11 FAQ ─────────────────────────── */

const FAQ_ITEMS: { q: { en: string; hi: string }; a: { en: string; hi: string } }[] = [
  {
    q: { en: 'What is UDrive by LOTS247?', hi: 'LOTS247 का UDrive क्या है?' },
    a: { en: 'UDrive is a self-serve legal and challan support plan for commercial vehicle owners.', hi: 'UDrive कमर्शियल वाहन मालिकों के लिए एक सेल्फ-सर्व कानूनी और चालान सहायता प्लान है।' },
  },
  {
    q: { en: 'Who is this plan for?', hi: 'यह प्लान किसके लिए है?' },
    a: { en: 'Small fleet owners, commercial vehicle owners, transport operators and SMEs using vehicles for business.', hi: 'छोटे फ्लीट मालिक, कमर्शियल वाहन मालिक, ट्रांसपोर्ट ऑपरेटर और व्यापार के लिए वाहन उपयोग करने वाले SME।' },
  },
  {
    q: { en: 'Does UDrive work outside cities?', hi: 'क्या UDrive शहरों के बाहर भी काम करता है?' },
    a: { en: "Yes. The network covers 98% of India's pin codes — highways, semi-urban routes and remote checkpoints included.", hi: 'जी हाँ। नेटवर्क भारत के 98% पिन कोड को कवर करता है — हाईवे, अर्ध-शहरी रूट और दूरस्थ चेकपॉइंट सहित।' },
  },
  {
    q: { en: 'Is the price per vehicle?', hi: 'क्या क़ीमत प्रति वाहन है?' },
    a: { en: 'Yes. The subscription is planned vehicle-wise. Each vehicle needs to be activated separately.', hi: 'जी हाँ। सब्सक्रिप्शन वाहन-वार होती है। हर वाहन को अलग से सक्रिय करना होता है।' },
  },
  {
    q: { en: 'Is on-ground lawyer support included?', hi: 'क्या मौके पर वकील सहायता शामिल है?' },
    a: { en: 'On-ground lawyer support is available when required and is charged on actual basis.', hi: 'ज़रूरत पड़ने पर मौके पर वकील सहायता उपलब्ध है और इसका शुल्क वास्तविक आधार पर लिया जाता है।' },
  },
  {
    q: { en: 'How do I cancel my subscription?', hi: 'मैं अपनी सब्सक्रिप्शन कैसे रद्द करूँ?' },
    a: { en: "Cancel anytime from your dashboard or by writing to support. There's no lock-in.", hi: 'अपने डैशबोर्ड से या सहायता को लिखकर कभी भी रद्द करें। कोई लॉक-इन नहीं है।' },
  },
  {
    q: { en: 'What happens after I enter my vehicle number?', hi: 'वाहन नंबर डालने के बाद क्या होता है?' },
    a: { en: 'Your dashboard is created after OTP verification. You can activate the plan to unlock support features.', hi: 'OTP सत्यापन के बाद आपका डैशबोर्ड बन जाता है। प्लान सक्रिय करके सहायता सुविधाएँ अनलॉक कर सकते हैं।' },
  },
]

function Faq() {
  const t = useT()
  const [open, setOpen] = useState<number>(0)
  return (
    <section id="faq" className="bg-white py-24 lg:py-32 border-y border-stone-200/70">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="text-center">
          <SectionKicker label="FAQ" />
          <DisplayHeading className="mt-5" size="lg">
            {t('Quick answers before you activate', 'सक्रिय करने से पहले त्वरित जवाब')}
          </DisplayHeading>
        </div>
        <div className="mt-16 grid lg:grid-cols-12 gap-6 items-start">
          {/* Dark support card — ink surface */}
          <div className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-[var(--color-ink)] p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] lg:sticky lg:top-24">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="absolute -left-20 bottom-0 w-[360px] h-[280px] rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative">
              <SectionKicker label="Still have questions?" surface="dark" align="left" />
              <h3
                className="mt-5 font-serif-display text-[2rem] lg:text-[2.25rem] font-medium tracking-[-0.02em] text-white leading-[1]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
              >
                {t('Talk to a human.', 'किसी इंसान से बात करें।')}
              </h3>
              <p className="mt-4 text-[13px] leading-[1.65] text-stone-400">
                {t('Our support team handles your queries directly — no bots, no forms. Most owners get a reply in under 10 minutes.', 'हमारी सहायता टीम आपके सवाल सीधे देखती है — कोई बॉट या फ़ॉर्म नहीं। ज़्यादातर मालिकों को 10 मिनट के अंदर जवाब मिलता है।')}
              </p>
              <button className="mt-7 w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3.5 text-[13px] font-semibold text-white hover:bg-emerald-400 transition-colors">
                {t('WhatsApp us', 'व्हाट्सऐप करें')}
              </button>
              <button className="mt-3 w-full inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3.5 text-[13px] font-medium text-white hover:border-stone-500 hover:bg-white/5 transition-colors">
                {t('Call us', 'हमें कॉल करें')}
              </button>
              <p className="mt-6 text-center font-mono-label text-[10px] text-stone-500">{t('Mon–Sat · 9 AM to 9 PM IST', 'सोम–शनि · सुबह 9 – रात 9 IST')}</p>
            </div>
          </div>

          {/* Accordion — editorial list with hairline dividers */}
          <div className="lg:col-span-8 divide-y divide-stone-200 border-y border-stone-200">
            {FAQ_ITEMS.map((it, i) => {
              const isOpen = open === i
              return (
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  key={i}
                  className={`relative w-full text-left transition-colors px-1 sm:px-2 py-6 ${
                    isOpen ? 'bg-transparent' : 'hover:bg-stone-50/60'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-baseline gap-4 sm:gap-6 flex-1 min-w-0">
                      <span className="font-mono-label text-[10.5px] text-stone-400 num-tabular shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-serif-display text-[1.125rem] sm:text-[1.25rem] leading-[1.3] tracking-tight ${isOpen ? 'text-stone-900' : 'text-stone-800'}`}
                        style={{ fontVariationSettings: '"opsz" 96, "SOFT" 40' }}
                      >
                        {t(it.q.en, it.q.hi)}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? 'bg-stone-900 border-stone-900 text-white rotate-45' : 'bg-white border-stone-300 text-stone-500'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[13.5px] leading-[1.65] text-stone-600 pl-0 sm:pl-12">{t(it.a.en, it.a.hi)}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 12 FOOTER ─────────────────────────── */

function Footer() {
  const t = useT()
  return (
    <footer className="bg-black pt-20 pb-12 border-t border-stone-900">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="col-span-2 lg:col-span-5">
            <Wordmark variant="full" />
            <p className="mt-5 text-[13px] leading-[1.65] text-stone-400 max-w-sm">
              {t('LOTS247 keeps legal, challan and roadside support ready for your commercial vehicle, so one issue does not stop your business movement.', 'LOTS247 आपके कमर्शियल वाहन के लिए कानूनी, चालान और सड़क-किनारे सहायता तैयार रखता है, ताकि एक समस्या आपके व्यापार को न रोके।')}
            </p>
            <address className="mt-6 not-italic text-[11px] leading-[1.65] text-stone-500 max-w-sm">
              <span className="block font-semibold text-stone-200">Sproutech Solutions Private Limited</span>
              {t('India Accelerator Coworking, Lower Ground Floor, LG-007-02,', 'इंडिया एक्सेलरेटर कोवर्किंग, लोअर ग्राउंड फ्लोर, LG-007-02,')}<br />
              {t('MGF Metropolis Mall, MG Road, Gurugram, Haryana, 122002', 'MGF मेट्रोपोलिस मॉल, MG रोड, गुरुग्राम, हरियाणा, 122002')}
            </address>
          </div>
          <div className="col-span-1 lg:col-span-3 lg:col-start-7">
            <ul className="space-y-3 text-[13px] text-stone-300">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t('Features', 'विशेषताएँ')}</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">{t('Pricing', 'मूल्य')}</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">{t('How it works', 'कैसे काम करता है')}</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">{t('FAQ', 'सवाल-जवाब')}</a></li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <ul className="space-y-3 text-[13px] text-stone-300">
              <li>
                <a
                  className="hover:text-emerald-400 transition-colors"
                  href="/terms"
                  onClick={(e) => {
                    e.preventDefault()
                    window.history.pushState({}, '', '/terms')
                    window.dispatchEvent(new PopStateEvent('popstate'))
                  }}
                >
                  {t('Terms & Conditions', 'नियम व शर्तें')}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-emerald-400 transition-colors"
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault()
                    window.history.pushState({}, '', '/privacy')
                    window.dispatchEvent(new PopStateEvent('popstate'))
                  }}
                >
                  {t('Privacy Policy', 'गोपनीयता नीति')}
                </a>
              </li>
              <li><a className="hover:text-emerald-400 transition-colors" href="#">{t('Contact us', 'संपर्क करें')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-label text-[10px] text-stone-500 order-2 sm:order-1">{t('© 2026 LOTS247. All rights reserved.', '© 2026 LOTS247. सर्वाधिकार सुरक्षित।')}</p>
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.37 4.28 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="#" aria-label="YouTube" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────── icons ─────────────────────────── */

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}
function HeadsetIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 38v-6a22 22 0 0 1 44 0v6" />
      <rect x="6" y="36" width="12" height="18" rx="3" fill="currentColor" />
      <rect x="46" y="36" width="12" height="18" rx="3" fill="currentColor" />
      <path d="M52 52v4a6 6 0 0 1-6 6h-6" />
    </svg>
  )
}
function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" opacity="0.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" opacity="0.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  )
}
function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h13" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )
}
function DocCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 15 11 17 15 13" />
    </svg>
  )
}
function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 12 10 18 20 6" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function ShieldPolice() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
function DocAlert() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
function FileSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <circle cx="17" cy="9" r="4" />
      <line x1="20" y1="12" x2="22" y2="14" />
    </svg>
  )
}
