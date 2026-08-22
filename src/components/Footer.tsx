import { Link } from 'react-router-dom'
import { GithubLogoIcon, LinkedinLogoIcon, EnvelopeSimpleIcon } from '@phosphor-icons/react'

interface NavLinkItem {
  label: string
  href: string
  external?: boolean
}

interface NavColumn {
  title: string
  links: NavLinkItem[]
}

const footerNav: NavColumn[] = [
  {
    title: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Projects', href: '/projects' },
      { label: 'Resume', href: '/resume' },
    ],
  },
  {
    title: 'Content',
    links: [
      { label: 'Repositories', href: '/projects' },
      { label: 'Devup Club', href: 'https://devup.co.in/', external: true },
      { label: 'Tech Stack', href: '/tech-stack' },
    ],
  },
  {
    title: 'Social & Connect',
    links: [
      { label: 'GitHub', href: 'https://github.com/varunkushwah31', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/varun-kushwah/', external: true },
      { label: 'Email', href: 'mailto:varun.kush3@gmail.com', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-[#27272a] bg-[#0a0a0a] text-zinc-400">
      {/* 3-Column Navigation Grid */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {footerNav.map((col) => (
            <div key={col.title} className="flex flex-col gap-3 min-w-0">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1">
                {col.title}
              </p>
              {col.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 w-fit"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors duration-150 w-fit"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar with Copyright & Socials */}
      <div className="border-t border-[#1f1f23]">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
          <p>© 2026 Varun Kushwah — India</p>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/varunkushwah31"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <GithubLogoIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/varun-kushwah/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <LinkedinLogoIcon size={16} />
            </a>
            <a
              href="mailto:varun.kush3@gmail.com"
              aria-label="Email"
              className="p-1 text-zinc-400 hover:text-white transition-colors"
            >
              <EnvelopeSimpleIcon size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
