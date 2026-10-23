import type { GitHubRepo } from '../../types/github';
import { formatDate } from '../../utils/format';
import styles from './repo-card.module.scss';

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <article className={styles.card}>
      <h3 className={styles.title}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
          {repo.name}
        </a>
      </h3>

      <p className={styles.description}>{repo.description ?? 'Sem descrição.'}</p>

      <ul className={styles.meta}>
        {repo.language && <li className={styles.language}>{repo.language}</li>}
        <li>{repo.stargazers_count} estrelas</li>
        <li>{repo.forks_count} forks</li>
        <li>Atualizado em {formatDate(repo.updated_at)}</li>
      </ul>
    </article>
  );
}