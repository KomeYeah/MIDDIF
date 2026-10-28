# Immersive Personal Portfolio

A cinematic, configuration-driven portfolio built with Next.js, TypeScript, Tailwind CSS, and Motion for React. The primary experience is a CSS-perspective project dressing: a spatial project carousel with four lightweight interactive previews and project-specific environmental states.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Customize content

All personally identifying information and external URLs are deliberately placeholders. Update these configuration files before sharing the site:

- `src/config/personal.ts` — name, introduction, profile copy, skills, email
- `src/config/social.ts` — GitHub, LinkedIn, Twitch, and stream state
- `src/config/projects.ts` — project content, status, technology, URLs, and visual themes

`streamStatus` supports `LIVE`, `OFFLINE`, and `UNKNOWN`. It defaults to `UNKNOWN`, so the interface never claims a live stream before a server-side Twitch integration confirms one. No credentials are exposed in the client.

Website and repository links default to `null`; the UI marks them as to-be-configured rather than inventing a destination.

## Languages

The portfolio is available at `/en` and `/fr`. User-facing copy is maintained separately in `src/i18n/dictionaries/en.ts` and `src/i18n/dictionaries/fr.ts`; update both dictionaries together when adding content.

The root URL detects French browser preferences and otherwise redirects to English. The language selector remembers an explicit choice in local storage and preserves the active home-carousel project across a switch. Set `NEXT_PUBLIC_SITE_URL` in your production environment to generate canonical and `hreflang` URLs for your own domain.

## Structure

```text
src/
  app/                 Next.js routes and global styles
  components/
    dressing/          Spatial project carousel
    previews/          Dedicated interactive project preview components
    about/ contact/    Secondary editorial sections
    twitch/ ui/        Reusable interaction components
  config/              Editable content and social configuration
  types/               Project model
```

## Notes

- The carousel uses CSS perspective and transform animation rather than a persistent WebGL scene.
- The Matchups preview uses clearly marked illustrative data; it is not a live statistical model.
- The agent workflow is explicitly labeled as a simulation.
- All animation respects `prefers-reduced-motion`.
