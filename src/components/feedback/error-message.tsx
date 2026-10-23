import type { ApiError } from '../../types/github';
import styles from './error-message.module.scss';

interface ErrorMessageProps {
  error: ApiError;
  onRetry: () => void;
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  const canRetry = error.type !== 'not_found';

  return (
    <div role="alert" className={styles.error}>
      <p>{error.message}</p>
      {canRetry && <button onClick={onRetry}>Tentar novamente</button>}
    </div>
  );
}