import Button from '../ui/Button';
import CardSection from '../ui/CardSection';
import ProfileHeader from '../components/Profile/ProfileHeader';
import ProfileTabs from '../components/Profile/ProfileTabs';
import { useUserProfile } from '../hooks/useProfile';
import { useLogout } from '../hooks/useAuth';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { useAgent } from '../hooks/useAgent';

function MyProfile() {

  const {  error } = useUserProfile();
  const { agent } = useAgent()
  const {user} = useAuth()
  const agentListing = agent?.data.properties
  const { mutate: logout } = useLogout();
 
  const navigate = useNavigate();
  
  const handleLogout = () => {
    if (user?.userId) {
      logout(user.userId, {
        onSuccess: () => {
          toast('Logged out successfully');
          setTimeout(() => navigate('/'), 900);
        },
      });
    }
  };

  if (!user) {
    const errorMessage = error instanceof Error ? JSON.parse(error.message) : 'An error occurred';
    navigate('/error');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Error: {errorMessage}</p>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 space-y-10 mb-20">
        {/* Header */}
        <CardSection>
          <ProfileHeader
            name={user?.username}
            email={user?.email}
            role={user.role}
            agencyName={'agencyName' in user ? user.agencyName : undefined}
          />
        </CardSection>

        {/* Tabs */}
        <CardSection>
          <ProfileTabs user={user} properties={agentListing} />
        </CardSection>

        {/* Logout */}
        <CardSection className="flex justify-end">
          <Button variant="destructive" type="button" onClick={handleLogout}>
            Log out
          </Button>
        </CardSection>
      </div>
      {/* toasts are rendered globally via Toaster in App */}
    </main>
  );
}

export default MyProfile;
