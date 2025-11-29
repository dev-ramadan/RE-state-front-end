type ProgressBarProps = {
  step: number;
  totalSteps: number;
  color?: string; // optional Tailwind color class
};

function ProgressBar({ step, totalSteps, color = 'bg-blue-600' }: ProgressBarProps) {
  const percentage = Math.min((step / totalSteps) * 100, 100);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className={`${color} h-2 rounded-full transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}

export default ProgressBar;
