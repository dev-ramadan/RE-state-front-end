import { Bath, Bed, Square, Briefcase, UtensilsCrossed, Package, Layers } from 'lucide-react';
import { formatPrice } from '../../utils/helper';
import type { PropertyGroupListItem } from '../../types/Responses';
import { KitchenTypeOptions } from '../../constants/options';

function ListingFeatures({ property }: { property: PropertyGroupListItem }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
      <div className="font-bold text-blue-600">{formatPrice(property.price)}</div>

      {'bedrooms' in property && property.bedrooms && (
        <div className="flex items-center">
          <Bed className="h-4 w-4 mr-1" />
          <span>{property.bedrooms} bed</span>
        </div>
      )}

      {'bathrooms' in property && property.bathrooms && (
        <div className="flex items-center">
          <Bath className="h-4 w-4 mr-1" />
          <span>{property.bathrooms} bath</span>
        </div>
      )}

      {'businessType' in property && property.businessType && (
        <div className="flex items-center">
          <Briefcase className="h-4 w-4 mr-1" />
          <span>{property.businessType}</span>
        </div>
      )}

      {'kitchenType' in property && property.kitchenType >= 0 && (
        <div className="flex items-center">
          <UtensilsCrossed className="h-4 w-4 mr-1" />
          <span>
            {KitchenTypeOptions.find((option) => option.value === property.kitchenType)?.label ||
              'Unknown'}
          </span>
        </div>
      )}

      {'hasStorage' in property && property.hasStorage && (
        <div className="flex items-center">
          <Package className="h-4 w-4 mr-1" />
          <span>Storage</span>
        </div>
      )}

      {(('floors' in property && property.floors) ||
        ('floorNumber' in property && property.floorNumber)) && (
        <div className="flex items-center">
          <Layers className="h-4 w-4 mr-1" />
          <span>
            {('floors' in property && property.floors) ||
              ('floorNumber' in property && property.floorNumber)}{' '}
            floors
          </span>
        </div>
      )}

      {property.square && (
        <div className="flex items-center">
          <Square className="h-4 w-4 mr-1" />
          <span>{property.square} sq_ft</span>
        </div>
      )}
    </div>
  );
}

export default ListingFeatures;
