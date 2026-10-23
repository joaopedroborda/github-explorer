import type { GitHubUser } from '../../types/github';
import styles from './user-profile.module.scss';

interface UserProfileProps {
  user: GitHubUser;
}

export function UserProfile({ user }: UserProfileProps) {
  return (
    <section aria-labelledby="profile-title" className={styles.profile}>
      <img
        className={styles.avatar}
        src={user.avatar_url}
        alt={`Avatar de ${user.login}`}
        width={120}
        height={120}
      />

      <div className={styles.info}>
        <h2 id="profile-title" className={styles.name}>
          {user.name ?? user.login}
        </h2>
        <a href={user.html_url} target="_blank" rel="noopener noreferrer">
          @{user.login}
        </a>

        {user.bio && <p className={styles.bio}>{user.bio}</p>}
        {user.location && <p className={styles.location}>{user.location}</p>}

        <ul className={styles.stats}>
          <li>
            <strong>{user.followers}</strong> seguidores
          </li>
          <li>
            <strong>{user.following}</strong> seguindo
          </li>
          <li>
            <strong>{user.public_repos}</strong> repositórios
          </li>
        </ul>
      </div>
    </section>
  );
}