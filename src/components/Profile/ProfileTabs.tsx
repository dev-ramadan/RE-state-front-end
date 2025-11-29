import { useState } from 'react';
import ProfileTabButton from './ProfileTabButton';
import ProfileInfoTab from './ProfileInfoTab';
import ProfileListingsTab from './ProfileListingsTab';
import type { Profile } from '../../types/User';
import type { PropertyGroupList } from '../../types/Responses';

export type ActiveTab = 'profile' | 'listings';

type ProfileTabsProps = {
  user: Profile;
  properties?: PropertyGroupList | [];
};

function ProfileTabs({ user, properties }: ProfileTabsProps) {
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  return (
    <div>
      <div className="border-b border-gray-200 flex">
        <ProfileTabButton
          label="Profile Info"
          isActive={activeTab === 'profile'}
          onClick={() => setActiveTab('profile')}
        />
        <ProfileTabButton
          label="My Listings"
          isActive={activeTab === 'listings'}
          onClick={() => setActiveTab('listings')}
        />
      </div>

      <div className="p-6">
        {activeTab === 'profile' && <ProfileInfoTab user={user} />}
        {activeTab === 'listings' && properties && <ProfileListingsTab properties={properties} />}
      </div>
    </div>
  );
}

export default ProfileTabs;
