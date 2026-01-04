import './Pagination.css';

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="pagination">
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`page-btn ${current === p ? 'active' : ''}`}
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default Pagination;