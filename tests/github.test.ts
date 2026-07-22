import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchGitHubProjectStats, getRepoFromUrl } from '../src/lib/github';

afterEach(() => vi.restoreAllMocks());

describe('GitHub project metadata', () => {
  it('extracts owner and repository names', () => {
    expect(getRepoFromUrl('https://github.com/utensils/nxv')).toBe('utensils/nxv');
    expect(getRepoFromUrl('https://github.com/utensils/nxv.git')).toBe('utensils/nxv');
    expect(getRepoFromUrl('https://example.com/utensils/nxv')).toBeNull();
  });

  it('returns repository metrics and the latest release', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ stargazers_count: 133, forks_count: 1 }), { status: 200 })
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            tag_name: 'v0.4.4',
            html_url: 'https://github.com/utensils/nxv/releases/tag/v0.4.4',
          }),
          { status: 200 }
        )
      );

    await expect(fetchGitHubProjectStats('https://github.com/utensils/nxv')).resolves.toEqual({
      stars: 133,
      forks: 1,
      latestRelease: 'v0.4.4',
      latestReleaseUrl: 'https://github.com/utensils/nxv/releases/tag/v0.4.4',
    });
  });

  it('keeps metrics when a repository has no release', async () => {
    vi.spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ stargazers_count: 10, forks_count: 2 }), { status: 200 })
      )
      .mockResolvedValueOnce(new Response('', { status: 404 }));

    await expect(fetchGitHubProjectStats('https://github.com/utensils/Envisaged')).resolves.toEqual(
      {
        stars: 10,
        forks: 2,
      }
    );
  });

  it('falls back cleanly when GitHub is unavailable', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    await expect(fetchGitHubProjectStats('https://github.com/utensils/nxv')).resolves.toBeNull();
  });
});
