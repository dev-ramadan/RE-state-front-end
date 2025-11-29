import { Building2 } from 'lucide-react';

function EmptyListing() {
  return (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Building2 className="h-10 w-10 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No Listings Yet</h3>
      <p className="text-gray-600 mb-6">
        You haven't created any property listings. Start by adding your first property!
      </p>
    </div>
  );
}

export default EmptyListing;
