import { Building2, Mail, Phone, User } from 'lucide-react';
import type { Profile } from '../../types/User';

type ProfileInfoTabProps = {
  user: Profile;
};
function ProfileInfoTab({ user }: ProfileInfoTabProps) {
  const userType = 'agencyName' in user ? 'agent' : 'customer';
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Information</h2>
        <div className="space-y-4">
          {/* name */}
          <div className="flex items-start">
            <User className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Full Name</div>
              <div className="font-medium text-gray-900">{user.username}</div>
            </div>
          </div>
          {/* email */}
          <div className="flex items-start">
            <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="font-medium text-gray-900">{user.email}</div>
            </div>
          </div>
          {/* phone */}
          {user.phoneNumber && (
            <div className="flex items-start">
              <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Phone</div>
                <div className="font-medium text-gray-900">{user.phoneNumber}</div>
              </div>
            </div>
          )}

          {/* user type */}
          <div className="flex items-start">
            <Building2 className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
            <div>
              <div className="text-sm text-gray-500">Account Type</div>
              <div className="font-medium text-gray-900 capitalize">{user.role}</div>
            </div>
          </div>
          {/* agency name  */}
          {userType === 'agent' && 'agencyName' in user && user.agencyName && (
            <div className="flex items-start">
              <Building2 className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
              <div>
                <div className="text-sm text-gray-500">Business Name</div>
                <div className="font-medium text-gray-900">{user.agencyName}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Account Stats</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-600">
              {new Date(user.dateJoined).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </div>
            <div className="text-sm text-gray-600">Member Since</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileInfoTab;
