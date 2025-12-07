import { Link } from 'react-router-dom';
import { Bath, Bed, Heart, MapPin, Square, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Like } from '../services/LikesServices';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { formatPrice } from '../utils/helper';
import { getPropertyById } from '../services/PropertyService';

type EstateCardProps = {
  propertyType: string;
  propertyId: string;
};

const EstateCard = ({ propertyType, propertyId }: EstateCardProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: property, isLoading } = useQuery({
    queryKey: ['property', propertyType, propertyId],
    queryFn: () => getPropertyById(propertyId, propertyType),
    staleTime: Infinity,
  });

  const [isLiked, setIsLiked] = useState(property?.isLiked ?? false);
  const [likes, setLikes] = useState(property?.likesCount ?? 0);

  if (isLoading) return <div>Loading...</div>;
  if (!property) return null;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) return alert('Please login to like');

    try {
      const response = await Like(property.propertyId);

      const added = response.data === 'Added';
      setIsLiked(added);
      setLikes((prev:any) => added ? prev + 1 : Math.max(prev - 1, 0));

      queryClient.invalidateQueries({ queryKey: ['property', propertyType, propertyId] });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Link
      to={`/estateDetails/${property.propertyType}/${property.propertyId}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
    >
      <div className="relative h-48 bg-gray-200 cursor-pointer">
        <img
          src={property.galleries?.[0]?.imageUrl ?? ''}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${property.propertyPurpose === 'Sale' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
            {property.propertyPurpose}
          </span>
        </div>

        <button
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
        >
          <Heart className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
        </button>
      </div>

      <div className="p-4 cursor-pointer">
        <div className="text-xl font-bold text-blue-600 mb-2">{formatPrice(property.price)}</div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>

        <button
          onClick={handleLike}
          className="flex items-center space-x-2 mb-3 px-3 py-1 rounded-lg border text-sm hover:bg-gray-100 transition"
        >
          <ThumbsUp className={`h-4 w-4 ${isLiked ? 'text-blue-600 fill-blue-600' : 'text-gray-600'}`} />
          <span className="text-gray-700">{likes} Likes</span>
        </button>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
          <span className="text-sm truncate">{property.address}</span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-3">
            {property.bedrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center space-x-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}
            {property.square && (
              <div className="flex items-center space-x-1">
                <Square className="h-4 w-4" />
                <span>{property.square}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            Listed by {property.agencyName || property.vendorName}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EstateCard;
