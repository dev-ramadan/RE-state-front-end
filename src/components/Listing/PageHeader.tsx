import ProgressBar from './ProgressBar';

type PageHeaderProps = {
  title: string; // Main page title
  subtitle?: string; // Optional description/subtitle
  step?: number; // Optional current step
  totalSteps?: number; // Optional total steps
  color?: string; // Optional Tailwind color class (default: blue)
  className?: string; // Optional extra styling
};

function PageHeader({
  title,
  subtitle,
  step,
  totalSteps,
  color = 'bg-blue-600',
  className = '',
}: PageHeaderProps) {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 mb-8 ${className}`}>
      {/* Title and Step Info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>

        {step !== undefined && totalSteps !== undefined && (
          <div className="text-sm text-gray-500">
            Step {step} of {totalSteps}
          </div>
        )}
      </div>
      {/* Progress Bar (shown only if step/totalSteps provided) */}
      {step !== undefined && totalSteps !== undefined && (
        <ProgressBar step={step} totalSteps={totalSteps} color={color} />
      )}
    </div>
  );
}

export default PageHeader;
