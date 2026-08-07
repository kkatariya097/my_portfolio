"use client";

import { useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile } from "@/lib/data";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/70 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <a href="#home" className="font-mono text-sm tracking-widest text-accent-2">
          {profile.name.split(" ")[0].toUpperCase() || "PORTFOLIO"}
        </a>

        <ul className="hidden items-center gap-8 sm:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-foreground-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 sm:flex">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-foreground-muted transition-colors hover:text-foreground"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-foreground-muted transition-colors hover:text-foreground"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="flex items-center gap-2 rounded-full border border-accent px-4 py-1.5 text-sm text-accent transition-colors hover:bg-accent hover:text-background"
          >
            <Download size={14} />
            Resume
          </a>
        </div>

        <button
          className="text-foreground sm:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border px-6 py-4 sm:hidden">
          <ul className="flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-foreground-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="flex items-center gap-4 pt-2">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={18} />
              </a>
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center gap-2 rounded-full border border-accent px-4 py-1.5 text-sm text-accent"
              >
                <Download size={14} />
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
