import { MapPin, Phone, Bed, Bath, Ruler, Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import Button from '../ui/Button';
import Comments from '../components/comments/Comments';
import { useParams } from 'react-router';
import { getPropertyById } from '../services/PropertyService';
import type { PropertyRes } from '../types/property';

const EstateDetails = () => {
  const [property, setProperty] = useState<PropertyRes | any>();
  const { id, type } = useParams<{ id: string; type: string }>();
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id || !type) return;

      try {
        setLoading(true);
        const res = await getPropertyById(id, type);
        setProperty(res.data); 

        setProperty(res.data); 
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id, type]);

  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (!property) return <h1 className="text-center mt-10">Property not found.</h1>;

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8 text-left">
      {/* Property Title */}
      <div className="flex justify-between items-start border-b pb-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{property.title}</h1>
          <p className="text-gray-500 flex items-center gap-1 mt-1">
            <MapPin size={18} className="text-blue-500" />
            {property.address}
          </p>
        </div>
        <button className="text-red-500 hover:text-red-600">
          <Heart size={24} />
        </button>
      </div>

      {/* Image Gallery */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="w-full md:w-[70%]">
          <img
            src={`https://re-estate.runasp.net/${property.galleries[mainImageIndex]?.imageUrl}`}
            alt="main"
            className="h-80 w-full object-cover rounded-xl shadow-md transition-all"
          />
        </div>
        <div className="flex md:flex-col gap-1.5 sm:gap-3.5 justify-center mx-auto w-26 sm:w-auto md:w-[30%]">
          {property.galleries?.map((img: any, index: number) => (
            <img
              key={index}
              src={`https://re-estate.runasp.net/${img.imageUrl}`}
              alt={`thumb-${index}`}
              className={`h-24 object-cover rounded-lg cursor-pointer border-2 transition-transform duration-200 ${
                mainImageIndex === index
                  ? 'border-blue-500 scale-105'
                  : 'border-transparent hover:border-gray-300 hover:scale-105'
              }`}
              onClick={() => setMainImageIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Basic Details */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 text-center border-t border-b py-4">
        <div>
          <Ruler className="mx-auto text-blue-500" />
          <p className="text-sm text-gray-500">Area</p>
          <p className="font-semibold">{property.square}</p>
        </div>
        <div>
          <Bed className="mx-auto text-blue-500" />
          <p className="text-sm text-gray-500">Rooms</p>
          <p className="font-semibold">{property.bedrooms}</p>
        </div>
        <div>
          <Bath className="mx-auto text-blue-500" />
          <p className="text-sm text-gray-500">Baths</p>
          <p className="font-semibold">{property.bathrooms}</p>
        </div>
        <div className="col-span-3 sm:col-span-3 flex items-center justify-center gap-2">
          <p className="text-xl font-bold text-green-600">{property.price}</p>
        </div>
      </div>

      {/* Description */}
      <section>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-700 leading-relaxed">{property.description || property.title}</p>
      </section>

      {/* Vendor Info */}
      <section className="border rounded-xl p-4 flex justify-between items-center bg-gray-50 shadow-sm">
        <div>
          <h5 className="text-sm">
            <span>Vendor Name: </span>
            {property.vendorName}
          </h5>
          <h3 className="font-semibold">
            <span>Agency Name: </span>
            {property.agencyName}
          </h3>
          <p className="text-gray-600 flex items-center gap-1">
            <Phone size={16} className="text-blue-500" /> {property.agentName || '+20 1029 246 873'}
          </p>
        </div>
        <Button children="Call now" className="w-fit" icon={<Phone />} />
      </section>

      {/* Comments */}
      <Comments id={id!} />
    </div>
  );
};

export default EstateDetails;
