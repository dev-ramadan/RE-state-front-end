import { User, Building2 } from 'lucide-react';
import type { UserRole } from '../../types/User';

interface UserTypeSelectorProps {
  value: UserRole;
  onChange: (type: UserRole) => void;
  className?: string;
}

function UserTypeSelector({ value, onChange, className = '' }: UserTypeSelectorProps) {
  return (
    <div className={`mb-6 border-b border-gray-300 pb-4 ${className}`}>
      <label className="block text-base font-semibold text-gray-700 mb-3">
        I am signing up as a:
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange('Customer')}
          className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-sm flex flex-col items-center group ${
            value === 'Customer'
              ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
              : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          <User className="h-6 w-6 mb-1 transition-colors group-hover:text-blue-600" />
          <span className="text-sm">Buyer</span>
        </button>

        <button
          type="button"
          onClick={() => onChange('Agent')}
          className={`p-4 rounded-xl border-2 transition-all duration-200 shadow-sm flex flex-col items-center group ${
            value === 'Agent'
              ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold'
              : 'border-gray-200 bg-white hover:bg-gray-50'
          }`}
        >
          <Building2 className="h-6 w-6 mb-1 transition-colors group-hover:text-blue-600" />
          <span className="text-sm">Vendor</span>
        </button>
      </div>
    </div>
  );
}

export default UserTypeSelector;
