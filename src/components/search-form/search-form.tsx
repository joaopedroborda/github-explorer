import { useState } from 'react';
import styles from './search-form.module.scss';

interface SearchFormProps {
  onSearch: (username: string) => void;
  loading: boolean;
  initialValue?: string;
}

export function SearchForm({ onSearch, loading, initialValue = '' }: SearchFormProps) {
  const [value, setValue] = useState(initialValue);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(value);
  }

  return (
  <form onSubmit={handleSubmit} role="search" className={styles.form}>
    <label htmlFor="username" className={styles.label}>
      Usuário do GitHub
    </label>

    <div className={styles.field}>
      <input
        id="username"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ex.: torvalds"
        autoComplete="off"
        className={styles.input}
      />
      <button type="submit" disabled={loading || !value.trim()}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </div>
  </form>
);
}