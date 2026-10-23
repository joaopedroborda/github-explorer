import type { GitHubRepo } from '../types/github';

export type SortField = 'name' | 'stars' | 'updated';
export type SortDirection = 'asc' | 'desc';

export function getLanguages(repos: GitHubRepo[]): string[] {
  const languages = repos
    .map((repo) => repo.language)
    .filter((language): language is string => language !== null);

  return [...new Set(languages)].sort();
}

export function filterRepos(repos: GitHubRepo[], search: string, language: string): GitHubRepo[] {
  const term = search.trim().toLowerCase();

  return repos.filter(
    (repo) =>
      (!term || repo.name.toLowerCase().includes(term)) &&
      (!language || repo.language === language),
  );
}

export function sortRepos(
  repos: GitHubRepo[],
  field: SortField,
  direction: SortDirection,
): GitHubRepo[] {
  const factor = direction === 'asc' ? 1 : -1;

  return [...repos].sort((a, b) => {
    switch (field) {
      case 'name':
        return a.name.localeCompare(b.name) * factor;
      case 'stars':
        return (a.stargazers_count - b.stargazers_count) * factor;
      case 'updated':
        return (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()) * factor;
    }
  });
}

export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}