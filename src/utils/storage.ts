const key = 'github-explorer:last-user';

export function getLastUsername(): string {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}

export function saveLastUsername(username: string): void {
  try {
    localStorage.setItem(key, username);
  } catch {
    //
  }
}