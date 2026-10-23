import { useMemo, useState } from 'react';
import type { GitHubRepo } from '../types/github';
import {
  filterRepos,
  getLanguages,
  paginate,
  sortRepos,
  type SortDirection,
  type SortField,
} from '../utils/repos';

const PAGE_SIZE = 10;

export function useRepoFilters(repos: GitHubRepo[]) {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('');
  const [sortField, setSortField] = useState<SortField>('updated');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [page, setPage] = useState(1);

  const languages = useMemo(() => getLanguages(repos), [repos]);

  const filtered = useMemo(
    () => sortRepos(filterRepos(repos, search, language), sortField, sortDirection),
    [repos, search, language, sortField, sortDirection],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = useMemo(
    () => paginate(filtered, currentPage, PAGE_SIZE),
    [filtered, currentPage],
  );

  return {
    search,
    language,
    sortField,
    sortDirection,
    languages,
    pageItems,
    totalResults: filtered.length,
    currentPage,
    totalPages,
    setSearch: (value: string) => {
      setSearch(value);
      setPage(1);
    },
    setLanguage: (value: string) => {
      setLanguage(value);
      setPage(1);
    },
    setSortField: (value: SortField) => {
      setSortField(value);
      setPage(1);
    },
    setSortDirection: (value: SortDirection) => {
      setSortDirection(value);
      setPage(1);
    },
    setPage,
  };
}