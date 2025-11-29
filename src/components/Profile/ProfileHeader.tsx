import { Building2, User } from 'lucide-react';

type ProfileHeaderProps = {
  name: string;
  email: string;
  role?: string;
  agencyName?: string;
};

function ProfileHeader({ name, email, role = '', agencyName }: ProfileHeaderProps) {
  return (
    <div className="flex items-center space-x-4">
      <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
        <User className="h-10 w-10 text-blue-600" />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
        <p className="text-gray-600">{email}</p>
        {role === 'Agent' && agencyName && (
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Building2 className="h-4 w-4 mr-1" />
            <span>{agencyName}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileHeader;
