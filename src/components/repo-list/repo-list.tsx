import type { GitHubRepo } from '../../types/github';
import { RepoCard } from '../repo-card/repo-card';
import styles from './repo-list.module.scss';

interface RepoListProps {
  repos: GitHubRepo[];
  emptyMessage: string;
}

export function RepoList({ repos, emptyMessage }: RepoListProps) {
  if (repos.length === 0) {
    return <p className={styles.empty}>{emptyMessage}</p>;
  }

  return (
    <section aria-labelledby="repos-title" className={styles.section}>
      <h2 id="repos-title">Repositórios</h2>
      <ul className={styles.list}>
        {repos.map((repo) => (
          <li key={repo.id} className={styles.item}>
            <RepoCard repo={repo} />
          </li>
        ))}
      </ul>
    </section>
  );
}