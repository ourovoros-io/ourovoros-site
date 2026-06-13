// Build-time fetch of the public ourovoros-io repositories. Runs in Astro
// frontmatter during `astro build`, so the deployed site ships a static repo
// list with no client-side API calls and no rate-limit exposure for visitors.
// A rebuild refreshes stars and descriptions.

export interface Repo {
  name: string;
  description: string;
  url: string;
  language: string | null;
  stars: number;
  updatedAt: string;
}

const ORG = "ourovoros-io";

// Flagship tooling shown first, in this order. The rest follow sorted by stars.
// These are the repos that best demonstrate the systems/low-level work.
const FLAGSHIPS = ["sway-analyzer", "charcoal", "dyno"];

// Forks and the org meta-repo are not original work, so they never surface.
const EXCLUDED = new Set([".github"]);

interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
  fork: boolean;
}

function rank(repo: Repo): number {
  const flagshipIndex = FLAGSHIPS.indexOf(repo.name);
  // Flagships occupy the first slots in their declared order; everything else
  // sorts after them by star count.
  return flagshipIndex === -1 ? FLAGSHIPS.length - repo.stars : flagshipIndex;
}

export async function fetchRepos(): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ourovoros-site-build",
  };
  // Optional token raises the rate limit for CI; unauthenticated works locally.
  const token = import.meta.env["GITHUB_TOKEN"];
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const response = await fetch(
    `https://api.github.com/orgs/${ORG}/repos?per_page=100&type=public`,
    { headers },
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API returned ${response.status} ${response.statusText} for org ` +
        `"${ORG}". Set GITHUB_TOKEN if this is a rate limit.`,
    );
  }

  const raw = (await response.json()) as GitHubRepo[];

  const repos: Repo[] = raw
    .filter((r) => !r.fork && !EXCLUDED.has(r.name))
    .map((r) => ({
      name: r.name,
      description: r.description ?? "",
      url: r.html_url,
      language: r.language,
      stars: r.stargazers_count,
      updatedAt: r.pushed_at,
    }));

  repos.sort((a, b) => rank(a) - rank(b));
  return repos;
}
