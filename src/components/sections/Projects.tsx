import { ExternalLink } from "lucide-react";
import { GithubIcon, BoxIcon } from "@/components/icons";
import { projects } from "@/lib/data";
import { Section } from "@/components/Section";
import { GameProp } from "@/components/GameProp";

export function Projects() {
  return (
    <Section
      id="projects"
      eyebrow="What I've built"
      title="Projects"
      decorations={
        <GameProp
          id="prop-box"
          icon={<BoxIcon size={30} />}
          className="right-8 top-10 hidden sm:block"
        />
      }
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.title}
            className="flex flex-col rounded-2xl border border-border bg-background-elevated p-6 transition-colors hover:border-accent-2"
          >
            <h3 className="text-lg font-semibold text-foreground">{project.title}</h3>
            <p className="mt-2 flex-1 text-sm text-foreground-muted">{project.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-background px-2.5 py-1 font-mono text-xs text-accent-2"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-5 flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
                >
                  <GithubIcon size={16} />
                  Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-foreground-muted hover:text-foreground"
                >
                  <ExternalLink size={16} />
                  Live
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
