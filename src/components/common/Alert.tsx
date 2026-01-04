import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import './Alert.css';

interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const icons = {
    success: <CheckCircle size={20} />,
    error: <XCircle size={20} />,
    warning: <AlertCircle size={20} />,
    info: <Info size={20} />
  };

  return (
    <div className={`alert alert-${type}`}>
      <span className="mt-0.5">{icons[type]}</span>
      <span>{message}</span>
    </div>
  );
};

export default Alert;