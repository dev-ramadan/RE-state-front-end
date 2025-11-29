import ImageListing from './ImageListing';
import ListingInfo from './ListingInfo';
import ListingFeatures from './ListingFeatures';
import ListingControl from './ListingControl';
import type { PropertyGroupListItem } from '../../types/Responses';

type PropertyListingCardProps = {
  property: PropertyGroupListItem;
};

function PropertyListingCard({ property }: PropertyListingCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Image */}
        <ImageListing
          imageUrl={property.galleries[0]?.imageUrl}
          imageName={property.galleries[0]?.mediaId}
        />
        {/* Details */}
        <div className="flex-1 min-w-0">
          <ListingInfo property={property} />
          <ListingFeatures property={property} />
          <ListingControl propertyId={property.propertyId} propertyType={property.propertyType} />
        </div>
      </div>
    </div>
  );
}

export default PropertyListingCard;
