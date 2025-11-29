import EstateCard from '../ui/EstateCard';
import { getWishList } from '../store/wishListSlice';
import { Heart } from 'lucide-react';
import { useSelector } from 'react-redux';
import Container from '../ui/Continer';

function WishList() {
  const wishList = useSelector(getWishList);

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Heart className="h-8 w-8 text-red-500 fill-current" />
            <h1 className="text-3xl font-bold text-gray-900">Saved Properties</h1>
          </div>

          <p className="text-gray-600">
            You have {wishList.length} saved{" "}
            {wishList.length === 1 ? "property" : "properties"}
          </p>
        </div>

        {/* No Items */}
        {wishList.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No Saved Properties
            </h3>
            <p className="text-gray-600 mb-6">
              Start exploring and save properties you're interested in
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
            {wishList.map((property,idx) => (
              <EstateCard key={idx} property={property} />
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}

export default WishList;
