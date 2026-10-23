import type { ApiError, GitHubRepo, GitHubUser } from '../types/github';

const base_url = 'https://api.github.com';

async function request<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${base_url}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
  } catch {
    throw {
      type: 'network',
      message: 'Não foi possível conectar à API. Verifique sua internet e tente novamente.',
    } satisfies ApiError;
  }

  if (!response.ok) {
    throw toApiError(response.status);
  }

  return response.json() as Promise<T>;
}

function toApiError(status: number): ApiError {
  if (status === 404) {
    return { type: 'not_found', message: 'Usuário não encontrado.' };
  }

  if (status === 403 || status === 429) {
    return {
      type: 'rate_limit',
      message: 'Limite de requisições da API atingido. Aguarde alguns minutos e tente novamente.',
    };
  }

  return { type: 'unknown', message: 'Ocorreu um erro inesperado. Tente novamente.' };
}

export function getUser(username: string): Promise<GitHubUser> {
  return request<GitHubUser>(`/users/${encodeURIComponent(username)}`);
}

export function getUserRepos(username: string): Promise<GitHubRepo[]> {
  return request<GitHubRepo[]>(
    `/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
  );
}