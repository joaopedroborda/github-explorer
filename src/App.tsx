import { SearchForm } from './components/search-form/search-form';
import { useGitHubUser } from './hooks/use-github-user';
import { UserProfile } from './components/user-profile/user-profile';
import { RepoExplorer } from './components/repo-explorer/repo-explorer';
import { useEffect, useState } from 'react';
import { getLastUsername } from './utils/storage';
import { Loading } from './components/feedback/loading';
import { ErrorMessage } from './components/feedback/error-message';
import styles from './app.module.scss';

function App() {
  const { status, user, repos, error, search, retry } = useGitHubUser();
  const [initialUser] = useState(getLastUsername);

  useEffect(() => {
    if (initialUser) search(initialUser);
  }, [initialUser, search]);

  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.title}>GitHub Explorer</h1>
      </header>

      <SearchForm onSearch={search} loading={status === 'loading'} initialValue={initialUser} />

      {status === 'loading' && <Loading />}
      {status === 'error' && error && <ErrorMessage error={error} onRetry={retry} />}

      {status === 'success' && user && (
        <>
          <UserProfile user={user} />
          <RepoExplorer key={user.login} repos={repos} />
        </>
      )}
    </main>
  );
}

export default App;