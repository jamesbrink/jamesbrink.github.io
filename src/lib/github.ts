export interface GitHubProjectStats {
  stars: number;
  forks: number;
  latestRelease?: string;
  latestReleaseUrl?: string;
}

export function getRepoFromUrl(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1].replace(/\.git$/, '') : null;
}

export async function fetchGitHubProjectStats(
  repositoryUrl: string
): Promise<GitHubProjectStats | null> {
  const repo = getRepoFromUrl(repositoryUrl);
  if (!repo) return null;

  try {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'jamesbrink-website',
    };
    const [repositoryResponse, releaseResponse] = await Promise.all([
      fetch(`https://api.github.com/repos/${repo}`, { headers }),
      fetch(`https://api.github.com/repos/${repo}/releases/latest`, { headers }),
    ]);

    if (!repositoryResponse.ok) return null;

    const repository = await repositoryResponse.json();
    const release = releaseResponse.ok ? await releaseResponse.json() : null;

    return {
      stars: repository.stargazers_count,
      forks: repository.forks_count,
      ...(release?.tag_name && {
        latestRelease: release.tag_name,
        latestReleaseUrl: release.html_url,
      }),
    };
  } catch {
    return null;
  }
}
