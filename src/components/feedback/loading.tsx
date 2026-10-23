import styles from './loading.module.scss';

export function Loading() {
  return (
    <div role="status" className={styles.loading}>
      <span className={styles.spinner} aria-hidden="true" />
      <span>Carregando...</span>
    </div>
  );
}