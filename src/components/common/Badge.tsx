import './Badge.css';

interface BadgeProps {
  label: string;
  variant?: 'success' | 'warning' | 'danger' | 'primary';
}

const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary' }) => {
  return <span className={`badge badge-${variant}`}>{label}</span>;
};

export default Badge;