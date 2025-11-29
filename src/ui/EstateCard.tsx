import { Link } from 'react-router';
import { Bath, Bed, Heart, MapPin, Square, ThumbsUp } from 'lucide-react';
import { formatPrice } from '../utils/helper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemtoWishList, delItemFromWishList, getWishList } from '../store/wishListSlice';
import { Like } from '../services/LikesServices';

type EstateCardPropse = {
  property: any;
  image?: any[]
};

const EstateCard = ({ property, image }: EstateCardPropse) => {
  if (!property) return null;

  const dispatch = useDispatch();
  const wishList = useSelector(getWishList);

  const [isWishList, setIsWishList] = useState(false);

  const [likes, setLikes] = useState(property.likesCount ?? 0);
  const [isLiked, setIsLiked] = useState(property.isLiked ?? false);

  // check if property is already in wishlist
  useEffect(() => {
    if (property) {
      setLikes(property.likesCount ?? 0);
      setIsLiked(property.isLiked ?? false);
    }
    const exists = wishList.some((item) => item.propertyId === property.propertyId);
    setIsWishList(exists);
  }, [wishList, property.propertyId, property]);

  const handleWishListToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishList) {
      dispatch(delItemFromWishList(property.propertyId));
    } else {
      dispatch(addItemtoWishList(property));
    }
    setIsWishList(!isWishList);
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const id = property.propertyId;
    const response = await Like(id);

    if (response?.data === "Added") {
      setLikes((prev: number) => prev + 1);
      setIsLiked(true);
    }

    if (response?.data === "Deleted") {
      setLikes((prev: number) => (prev > 0 ? prev - 1 : 0));
      setIsLiked(false);
    }
  };



  return (
    <>
      <Link
        to={`/estateDetails/${property.propertyType}/${property.propertyId}`}
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
      >
        {/* Property Image */}
        <div className="relative h-48 bg-gray-200 cursor-pointer">
          <img
            src={image?.[0]?.imageUrl ? "https://re-estate.runasp.net" + image[0].imageUrl : "/placeholder.png"}
            alt={property.title}
          />
          {/* Badge */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${property.purpose === 'sale'
                ? 'bg-green-100 text-green-800'
                : 'bg-purple-100 text-purple-800'
                }`}
            >
              For {property.purpose === 'sale' ? 'Sale' : 'Rent'}
            </span>
          </div>

          {/* Wishlist Icon */}
          <button
            onClick={handleWishListToggle}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
          >
            <Heart
              className={`h-4 w-4 ${isWishList ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'
                }`}
            />
          </button>
        </div>

        {/* Property Details */}
        <div className="p-4 cursor-pointer">
          {/* Price */}
          <div className="text-xl font-bold text-blue-600 mb-2">{formatPrice(property.price)}</div>

          {/* name */}
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{property.title}</h3>

          {/*  زر اللايك */}
          <button
            onClick={handleLike}
            className="flex items-center space-x-2 mb-3 px-3 py-1 rounded-lg border text-sm hover:bg-gray-100 transition"
          >
            <ThumbsUp className={`h-4 w-4 ${isLiked ? 'text-blue-600 fill-blue-600' : 'text-gray-600'}`} />
            <span className="text-gray-700">{likes} Likes</span>
          </button>

          {/* Location */}
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
            <span className="text-sm truncate">{property.address}</span>
          </div>

          {/* Property Info */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-3">
              {property.bedrooms && property.bedrooms > 0 && (
                <div className="flex items-center space-x-1">
                  <Bed className="h-4 w-4" />
                  <span>{property.bedrooms}</span>
                </div>
              )}
              {property.bathrooms && property.bathrooms > 0 && (
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

          {/* Vendor */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="text-xs text-gray-500">
              Listed by {property.agencyName || property.vendorName}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default EstateCard;
