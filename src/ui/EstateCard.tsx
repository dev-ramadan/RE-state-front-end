import { Link } from 'react-router';
import { Bath, Bed, Heart, MapPin, Square, ThumbsUp } from 'lucide-react';
import { formatPrice } from '../utils/helper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItemtoWishList,
  delItemFromWishList,
  getWishList
} from '../store/wishListSlice';
import { Like } from '../services/LikesServices';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

type EstateCardPropse = {
  property: any;
  image?: any[];
};

const EstateCard = ({ property, image }: EstateCardPropse) => {
  if (!property) return null;

  const { user } = useAuth();
  const dispatch = useDispatch();
  const wishList = useSelector(getWishList);

  const [isWishList, setIsWishList] = useState(false);

  const [likes, setLikes] = useState<number>(property.likesCount ?? 0);
  const [isLiked, setIsLiked] = useState<boolean>(property.isLiked ?? false);
  const [loadingLike, setLoadingLike] = useState(false);

  useEffect(() => {
    if (property) {
      setIsLiked(property.isLiked ?? false);
      setLikes(property.likesCount ?? 0);

      const exists = wishList.some(
        (item: any) => item.propertyId === property.propertyId
      );
      setIsWishList(exists);
    }
  }, [wishList, property.propertyId]);

  // add and delete in watchList
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

  // handle property Like
  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error('Please login first');
      return;
    }

    if (loadingLike) return;

    try {
      setLoadingLike(true);

      const id = property.propertyId;
      const response = await Like(id);

      if (response?.data === 'Added') {
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      }

      if (response?.data === 'Deleted') {
        setLikes((prev) => (prev > 0 ? prev - 1 : 0));
        setIsLiked(false);
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoadingLike(false);
    }
  };

  return (
    <Link
      to={`/estateDetails/${property.propertyType}/${property.propertyId}`}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-gray-200"
    >
      {/*  صورة العقار */}
      <div className="relative h-48 bg-gray-200 cursor-pointer">
        <img
          src={
            image?.[0]?.imageUrl
              ? 'https://re-estate.runasp.net' + image[0].imageUrl
              : ''
          }
          alt={property.title}
          className="w-full h-full object-cover"
        />

        {/*  نوع الإعلان */}
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            For {property.propertyPurpose}
          </span>
        </div>

        {/*  زر المفضلة */}
        <button
          onClick={handleWishListToggle}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition"
        >
          <Heart
            className={`h-4 w-4 ${
              isWishList
                ? 'fill-red-500 text-red-500'
                : 'text-gray-400 hover:text-red-500'
            }`}
          />
        </button>
      </div>

      {/*  تفاصيل العقار */}
      <div className="p-4 cursor-pointer">
        <div className="text-xl font-bold text-blue-600 mb-2">
          {formatPrice(property.price)}
        </div>

        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {property.title}
        </h3>

        {/*  زر اللايك  */}
        <button
          onClick={handleLike}
          disabled={loadingLike}
          className="flex items-center gap-2 mb-3 px-3 py-1 rounded-lg border text-sm hover:bg-gray-100 transition"
        >
          <ThumbsUp
            className={`h-4 w-4 ${
              isLiked ? 'text-blue-600 fill-blue-600' : 'text-gray-600'
            }`}
          />
          <span className="text-gray-700">{likes} Likes</span>
        </button>

        {/*  العنوان */}
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm truncate">{property.address}</span>
        </div>

        {/*  بيانات العقار */}
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-3">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{property.bedrooms}</span>
              </div>
            )}

            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{property.bathrooms}</span>
              </div>
            )}

            {property.square && (
              <div className="flex items-center gap-1">
                <Square className="h-4 w-4" />
                <span>{property.square}</span>
              </div>
            )}
          </div>
        </div>

        {/*  صاحب الإعلان */}
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
