// Small dependency-free REST client. All routes are constructed by trusted code.
export function githubApi(token, fetcher = fetch) {
  if (!token) throw new Error('GITHUB_TOKEN is required.');
  return async (route, { method = 'GET', body } = {}) => {
    const response = await fetcher(`https://api.github.com${route}`, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      redirect: 'error',
    });
    // Do not echo response bodies, tokens or request bodies into workflow logs.
    if (!response.ok)
      throw new Error(
        `GitHub API ${method} failed (${response.status}). Check workflow permissions, branch protection and Actions logs; use the CLI fallback.`,
      );
    if (response.status === 204) return;
    const result = await response.json();
    if (route === '/graphql' && (result.errors?.length || !result.data?.updateRefs)) {
      throw new Error(
        'GitHub atomic branch update was rejected. The branch may have changed or protection may block the update; request a fresh proposal or use the CLI.',
      );
    }
    return result;
  };
}

export async function paginate(api, route) {
  const result = [];
  for (let page = 1; page <= 100; page++) {
    const entries = await api(
      `${route}${route.includes('?') ? '&' : '?'}per_page=100&page=${page}`,
    );
    if (!Array.isArray(entries)) throw new Error('Expected a paginated GitHub list.');
    result.push(...entries);
    if (entries.length < 100) return result;
  }
  throw new Error('GitHub list exceeds the supported size; use the manual workflow.');
}
