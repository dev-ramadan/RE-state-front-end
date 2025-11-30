import { MapPin, TrendingUp } from 'lucide-react';
import Header from '../auth/FormHeader';
import EstateCard from '../../ui/EstateCard';
import { Link } from 'react-router';
import { useAllProperties } from '../../hooks/useProperty';
import { useAuth } from '../../context/AuthContext';



const Estate = () => {
  const { data } = useAllProperties("commercial");
  const {user} = useAuth();
  return (
    <section className={`py-16 bg-gray-50 ${user?.role == "Agent" ? 'mt-96 lg:mt-40' : ''} `}>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center px-6 mb-10">
        <Header
          Hchildren="Featured Properties"
          Pchildren="Discover the latest listings in prime locations"
          Pcolor="gray-500"
        />
        <Link to={"/search"}>
          <p className="text-blue-600 flex items-center gap-1 font-semibold cursor-pointer mt-4 md:mt-0 hover:text-blue-700 transition">
            View All <TrendingUp className="w-4 h-4" />
          </p></Link>
      </div>

      {/* Estate Grid */}
      {data?.items?.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Properties Listed Yet</h3>
          <p className="text-gray-600">Be the first to list a property on First Estate!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-6">
          {data?.items?.slice(0, 8).map((property: any) => (
            <EstateCard key={property?.propertyId} property={property} image={property?.galleries}/>
          ))}
        </div>
      )}
    </section>
  );
};

export default Estate;
