import { useRepoFilters } from '../../hooks/use-repo-filters';
import type { GitHubRepo } from '../../types/github';
import { Pagination } from '../pagination/pagination';
import { RepoList } from '../repo-list/repo-list';
import { RepoToolbar } from '../repo-toolbar/repo-toolbar';

interface RepoExplorerProps {
  repos: GitHubRepo[];
}

export function RepoExplorer({ repos }: RepoExplorerProps) {
  const filters = useRepoFilters(repos);

  const emptyMessage =
    repos.length === 0
      ? 'Este usuário não possui repositórios públicos.'
      : 'Nenhum repositório corresponde aos filtros.';

  return (
    <>
      <RepoToolbar
        search={filters.search}
        language={filters.language}
        languages={filters.languages}
        sortField={filters.sortField}
        sortDirection={filters.sortDirection}
        onSearchChange={filters.setSearch}
        onLanguageChange={filters.setLanguage}
        onSortFieldChange={filters.setSortField}
        onSortDirectionChange={filters.setSortDirection}
      />

      <p aria-live="polite">{filters.totalResults} repositórios encontrados</p>

      <RepoList repos={filters.pageItems} emptyMessage={emptyMessage} />

      <Pagination
        currentPage={filters.currentPage}
        totalPages={filters.totalPages}
        onPageChange={filters.setPage}
      />
    </>
  );
}