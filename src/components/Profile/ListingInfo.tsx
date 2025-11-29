import { MapPin } from 'lucide-react';
import type { PropertyGroupListItem } from '../../types/Responses';

function ListingInfo({ property }: { property: PropertyGroupListItem }) {
  return (
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900 mb-1">{property.title}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          {property.address}
        </div>
      </div>
      <span
        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          property.propertyPurpose === 0
            ? 'bg-green-100 text-green-800'
            : 'bg-purple-100 text-purple-800'
        }`}
      >
        For {property.propertyPurpose === 0 ? 'Sale' : 'Rent'}
      </span>
      <span
        className={`ml-2 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          property.propertyType === 'Residential'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-amber-100 text-amber-800'
        }`}
      >
        {property.propertyType === 'Residential' ? 'Residential' : 'Commercial'}
      </span>
    </div>
  );
}

export default ListingInfo;
