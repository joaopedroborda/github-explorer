import type { SortDirection, SortField } from '../../utils/repos';
import styles from './repo-toolbar.module.scss';

interface RepoToolbarProps {
  search: string;
  language: string;
  languages: string[];
  sortField: SortField;
  sortDirection: SortDirection;
  onSearchChange: (value: string) => void;
  onLanguageChange: (value: string) => void;
  onSortFieldChange: (value: SortField) => void;
  onSortDirectionChange: (value: SortDirection) => void;
}

export function RepoToolbar({
  search,
  language,
  languages,
  sortField,
  sortDirection,
  onSearchChange,
  onLanguageChange,
  onSortFieldChange,
  onSortDirectionChange,
}: RepoToolbarProps) {
 return (
  <div role="group" aria-label="Filtros de repositórios" className={styles.toolbar}>
    <div className={styles.field}>
      <label htmlFor="repo-search" className={styles.label}>
        Buscar por nome
      </label>
      <input
        id="repo-search"
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>

    <div className={styles.field}>
      <label htmlFor="repo-language" className={styles.label}>
        Linguagem
      </label>
      <select
        id="repo-language"
        value={language}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        <option value="">Todas</option>
        {languages.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="repo-sort" className={styles.label}>
        Ordenar por
      </label>
      <select
        id="repo-sort"
        value={sortField}
        onChange={(e) => onSortFieldChange(e.target.value as SortField)}
      >
        <option value="updated">Última atualização</option>
        <option value="stars">Estrelas</option>
        <option value="name">Nome</option>
      </select>
    </div>

    <div className={styles.field}>
      <label htmlFor="repo-direction" className={styles.label}>
        Ordem
      </label>
      <select
        id="repo-direction"
        value={sortDirection}
        onChange={(e) => onSortDirectionChange(e.target.value as SortDirection)}
      >
        <option value="desc">Decrescente</option>
        <option value="asc">Crescente</option>
      </select>
    </div>
  </div>
);
}