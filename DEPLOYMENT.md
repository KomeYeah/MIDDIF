# Deployment workflow

This project is prepared for a GitHub → Vercel → OVHcloud deployment flow. It uses npm, Node.js 22 LTS, and Vercel's native Next.js support. No Docker, custom server, or custom deployment configuration is required.

```text
local development → dev branch → Vercel Preview URL → merge into main → Vercel Production → zindi.fr
```

## Before the first push

The repository is initialized locally but has no commit, `dev` branch, or GitHub remote yet. Create an empty GitHub repository first; do not initialize it with a README, `.gitignore`, or license, as this project already contains those files.

Then run the following from the project root, replacing the placeholder with the repository URL GitHub gives you:

```bash
git add .
git commit -m "Initial portfolio deployment setup"
git branch -M main
git remote add origin <GITHUB_REPOSITORY_URL>
git push -u origin main
git switch -c dev
git push -u origin dev
```

Never commit `.env`, `.env.local`, `.vercel`, credentials, or API keys. `.env.example` is intentionally safe to commit.

## Vercel setup

1. Sign in to Vercel and import the GitHub repository.
2. Confirm the detected framework is **Next.js** and the install command is `npm install` (or Vercel's default npm install step).
3. Leave the build command as `npm run build`; Vercel's native Next.js integration handles routes, image optimization, and server rendering.
4. In **Project Settings → Environments**, keep `main` as the Production Branch.
5. Add `NEXT_PUBLIC_SITE_URL` with the value `https://zindi.fr` to the **Production** environment. It is safe to use the same public value in Preview, if desired; it controls canonical and `hreflang` URLs.
6. Do not add Twitch credentials: the current portfolio does not require them.

Vercel creates a preview deployment for pushes to `dev` and a production deployment for pushes to `main`. Do not attach `zindi.fr` to the `dev` branch.

## Daily development workflow

```bash
git switch dev
git pull --ff-only
npm install
npm run ci
git add <changed-files>
git commit -m "Describe the change"
git push
```

Open the Vercel Preview URL shown in the Vercel dashboard, GitHub pull request, or commit status. Validate the French and English routes, the project carousel, and a project page before release.

To release a validated change, create a pull request from `dev` to `main`, review the Preview deployment, and merge the pull request. A push to `main` triggers the Production deployment. Vercel keeps the last successful production deployment serving while a new build runs; a failed build is not promoted to the production domain.

## Connect `zindi.fr` through OVHcloud

1. First verify the application on the Vercel-generated Production URL.
2. In Vercel, open the project **Settings → Domains** and add `zindi.fr` to the Production environment.
3. Copy the exact DNS record type, host/name, and value Vercel presents. Vercel may choose records based on its current verification requirements; do not substitute guessed A, CNAME, or TXT values.
4. In OVHcloud, go to **Web Cloud → Domain names → zindi.fr → DNS zone**.
5. Before editing, inspect records for the same host and type. Add or update only the web-verification records requested by Vercel.
6. Do not change nameservers. Do not alter MX, TXT, SPF, DKIM, DMARC, or unrelated records used by email or other services.
7. Return to Vercel and wait for verification and HTTPS activation. DNS propagation can take time; OVHcloud notes that zone changes may take up to 24 hours.
8. Optionally add `www.zindi.fr` in Vercel, then configure its redirect to `zindi.fr` in Vercel's domain settings. Only add the corresponding OVHcloud DNS record after Vercel shows its exact requirement.

Keep DNS management at OVHcloud. Vercel needs records in the existing OVHcloud zone; it does not require a nameserver change for this workflow.

## Rollback and recovery

- **Before release:** do not merge the `dev` pull request until its Preview deployment is validated.
- **After release:** in Vercel, open the previous successful Production deployment and use **Promote** to restore it to the production domain. Alternatively, revert the problematic commit on `main` and push the revert.
- **Build failure:** open the failed deployment in Vercel, read the Build Logs, reproduce locally with `npm run ci`, fix on `dev`, and re-test through a Preview deployment.

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Vercel build fails | Build Logs, Node version, lockfile consistency, and `npm run ci` locally. |
| Preview did not appear | Confirm the Vercel GitHub App can access the repository and that the commit was pushed to `dev`. |
| Production updated unexpectedly | Confirm Vercel's Production Branch is `main` and no custom domain is assigned to `dev`. |
| `/fr` or `/en` route fails | Run `npm run build`; the Next.js Proxy redirects root visits and locale pages are generated under `app/[locale]`. |
| Domain will not verify | Compare OVHcloud record host/type/value exactly with Vercel's current request; wait for propagation; do not replace email records. |
| HTTPS is pending | Wait for DNS verification to complete, then re-check the Domains panel in Vercel. |

## Environment variables

| Variable | Where | Required now | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Vercel Production | Yes | Canonical and `hreflang` metadata base URL. |
| `TWITCH_CLIENT_ID` | Vercel server environment only | No | Future server-side Twitch status integration. |
| `TWITCH_CLIENT_SECRET` | Vercel server environment only | No | Future server-side Twitch status integration. |

When Twitch integration is implemented, use a server-side route or server action. Never expose the secret with a `NEXT_PUBLIC_` prefix.
