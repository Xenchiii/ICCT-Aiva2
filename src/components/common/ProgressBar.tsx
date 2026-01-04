import './ProgressBar.css';

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-fill" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;