import styles from './pagination.module.scss';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
  <nav aria-label="Paginação de repositórios" className={styles.nav}>
    <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
      Anterior
    </button>

    <span className={styles.info}>
      Página {currentPage} de {totalPages}
    </span>

    <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
      Próxima
    </button>
  </nav>
);
}