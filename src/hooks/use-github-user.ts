import { useCallback, useRef, useState } from 'react';
import { getUser, getUserRepos } from '../api/github';
import type { ApiError, GitHubRepo, GitHubUser } from '../types/github';
import { saveLastUsername } from '../utils/storage';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface State {
  status: Status;
  user: GitHubUser | null;
  repos: GitHubRepo[];
  error: ApiError | null;
}

const initialState: State = { status: 'idle', user: null, repos: [], error: null };

export function useGitHubUser() {
  const [state, setState] = useState<State>(initialState);
  const lastQuery = useRef('');
  const requestId = useRef(0);

  const search = useCallback(async (username: string) => {
    const query = username.trim();
    if (!query) return;

    lastQuery.current = query;
    const id = ++requestId.current;
    setState({ ...initialState, status: 'loading' });

    try {
      const [user, repos] = await Promise.all([getUser(query), getUserRepos(query)]);
      if (id !== requestId.current) return;
      setState({ status: 'success', user, repos, error: null });
      saveLastUsername(query);
    } catch (err) {
      if (id !== requestId.current) return;
      setState({ ...initialState, status: 'error', error: err as ApiError });
    }
  }, []);

  const retry = useCallback(() => search(lastQuery.current), [search]);

  return { ...state, search, retry };
}