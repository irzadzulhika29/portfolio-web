import { Grid2x2, Mail } from "lucide-react";

function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
      <path d="M12 .5a11.5 11.5 0 0 0-3.637 22.41c.575.106.787-.25.787-.556 0-.275-.012-1.188-.018-2.156-3.204.694-3.88-1.356-3.88-1.356-.525-1.337-1.281-1.693-1.281-1.693-1.05-.718.08-.703.08-.703 1.162.081 1.774 1.193 1.774 1.193 1.033 1.768 2.71 1.257 3.37.962.105-.75.404-1.258.735-1.547-2.558-.291-5.248-1.279-5.248-5.694 0-1.258.45-2.286 1.187-3.092-.12-.29-.514-1.462.112-3.048 0 0 .968-.31 3.173 1.18a10.98 10.98 0 0 1 5.776 0c2.203-1.49 3.17-1.18 3.17-1.18.628 1.586.234 2.758.115 3.048.74.806 1.185 1.834 1.185 3.092 0 4.426-2.695 5.4-5.26 5.686.414.357.783 1.058.783 2.134 0 1.541-.014 2.781-.014 3.16 0 .31.207.668.793.554A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.27 8.25h4.46V23H.27V8.25ZM8.23 8.25h4.27v2.01h.06c.6-1.13 2.05-2.32 4.21-2.32 4.5 0 5.33 2.96 5.33 6.8V23h-4.45v-7.28c0-1.74-.03-3.98-2.43-3.98-2.43 0-2.8 1.9-2.8 3.86V23H8.23V8.25Z" />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="size-7 fill-current">
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5a3.95 3.95 0 0 0 3.95 3.95h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  );
}

export function FooterSection() {
  return (
    <footer
      id="site-footer"
      className="relative overflow-hidden border-t border-white/10 bg-black text-white"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <h2 className="max-w-4xl text-5xl font-semibold uppercase leading-[1.08] tracking-[-0.08em] text-white sm:text-6xl lg:text-[5.5rem]">
              Let&apos;s build
              <br />
              something
              <br />
              amazing together!
            </h2>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://github.com"
                className="inline-flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/90 text-black transition-transform duration-200 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <GitHubMark />
              </a>
              <a
                href="https://linkedin.com"
                className="inline-flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/90 text-black transition-transform duration-200 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <LinkedInMark />
              </a>
              <a
                href="https://instagram.com"
                className="inline-flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/90 text-black transition-transform duration-200 hover:-translate-y-1"
                aria-label="Instagram"
              >
                <InstagramMark />
              </a>
              <a
                href="mailto:irza@example.com"
                className="inline-flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/90 text-black transition-transform duration-200 hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail className="size-7" />
              </a>
              <a
                href="#projects"
                className="inline-flex size-16 items-center justify-center rounded-2xl border border-white/15 bg-white/90 text-black transition-transform duration-200 hover:-translate-y-1"
                aria-label="Projects"
              >
                <Grid2x2 className="size-7" />
              </a>
            </div>

            <p className="mt-8 text-sm font-semibold text-zinc-500">
              © 2026 IRZA. All Rights Reserved.
            </p>
          </div>

          <div className="lg:justify-self-end lg:text-right">
            <p className="text-4xl font-semibold uppercase tracking-[-0.06em] text-white sm:text-5xl">
              Menu
            </p>
            <nav className="mt-8 flex flex-col gap-5 text-2xl uppercase tracking-[0.08em] text-zinc-500 sm:text-3xl">
              <a href="#top" className="transition-colors duration-200 hover:text-white">
                Home
              </a>
              <a href="#about" className="transition-colors duration-200 hover:text-white">
                About
              </a>
              <a href="#projects" className="transition-colors duration-200 hover:text-white">
                Projects
              </a>
              <a href="#contact" className="transition-colors duration-200 hover:text-white">
                Contact
              </a>
            </nav>
          </div>
        </div>

        <div className="relative flex justify-center items-center overflow-hidden border-t border-white/10 pt-8 text-center">
          <p className="translate-y-[18%] text-[5.5rem] font-semibold uppercase leading-none tracking-[-0.1em] text-white sm:text-[8rem] lg:text-[13rem]">
            IRZAA
          </p>
        </div>
      </div>
    </footer>
  );
}
