type ProfileTabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
};

function ProfileTabButton({ label, isActive, onClick }: ProfileTabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-4 font-medium border-b-2 transition-colors ${
        isActive
          ? 'border-blue-600 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      }`}
    >
      {label}
    </button>
  );
}

export default ProfileTabButton;
