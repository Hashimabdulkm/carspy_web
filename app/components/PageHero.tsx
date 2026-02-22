'use client'

type PageHeroProps = {
  /** Optional small label above the title (e.g. "Vehicle info & RTO services") */
  eyebrow?: string
  /** Main heading. Use a fragment with <span className="text-[var(--pbmit-xclean-global-color)]"> for an accent word */
  title: React.ReactNode
  /** Subtitle below the title */
  subtitle?: string
}

export function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--pbmit-xclean-blackish-bg-color)]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 70% 20%, var(--pbmit-xclean-global-color) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 20% 80%, rgba(251,163,17,0.2) 0%, transparent 50%)',
        }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,24,55,0.4)_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="max-w-4xl mx-auto text-center pt-6 sm:pt-8 lg:pt-10">
          {eyebrow && (
            <p className="text-[var(--pbmit-xclean-global-color)] text-sm font-semibold uppercase tracking-wider mb-3 sm:mb-4">
              {eyebrow}
            </p>
          )}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 sm:mt-5 text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
