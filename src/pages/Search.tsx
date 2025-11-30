import { useState } from 'react';
import { useAllProperties } from '../hooks/useProperty';
import { Search, SlidersHorizontal } from 'lucide-react';

import EstateCard from '../ui/EstateCard';
import OptionSelector from '../ui/OptionSelector';

import { Home, Building2, DollarSign, Ruler } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const propertyTypeOptions = [
  { value: 'Commercial', icon: <Building2 />, label: 'Commercial' },
  { value: 'Residential', icon: <Home />, label: 'Residential' },
];

const priceOptions = [
  { value: '100000', icon: <DollarSign />, label: '≤ 100k' },
  { value: '500000', icon: <DollarSign />, label: '≤ 500k' },
  { value: '1000000', icon: <DollarSign />, label: '≤ 1M' },
];

const areaOptions = [
  { value: '50', icon: <Ruler />, label: '≥ 50 m²' },
  { value: '100', icon: <Ruler />, label: '≥ 100 m²' },
  { value: '200', icon: <Ruler />, label: '≥ 200 m²' },
];

export default function SearchPage() {
  const {search,setSearch} = useAuth()
  const [maxPrice, setMaxPrice] = useState('');
  const [minArea, setMinArea] = useState('');
  const [type, setType] = useState('');

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const { data:commercial } = useAllProperties("commercial" );
  const { data:residential } = useAllProperties("residential" );


  

  const allProperties = [
    ...(commercial.items || []),
    ...(residential.items || []),
  ]

  
  const filtered = allProperties.filter((p:any) => {
    const matchesQuery =
      p?.title.toLowerCase().includes(search.toLowerCase()) ||
      p?.city?.toLowerCase().includes(search.toLowerCase()) ||
      p?.address?.toLowerCase().includes(search.toLowerCase());

    return (
      matchesQuery &&
      (maxPrice === '' || p.price <= +maxPrice) &&
      (minArea === '' || p.square >= +minArea) &&
      (type === '' || p.propertyType == type)
    );
  });

  const displayed = filtered.slice(0, page * itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto p-4 mb-40">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <SlidersHorizontal className="text-blue-600" />
        Search Properties
      </h1>

      {/* Search Input */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by city, title or neighborhood..."
          className="w-full p-4 pl-12 border rounded-2xl shadow-sm text-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="absolute left-4 top-4 text-gray-400" />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <OptionSelector
          title="Property Type"
          value={type}
          onChange={setType}
          options={propertyTypeOptions}
        />

        <OptionSelector
          title="Max Price"
          value={maxPrice}
          onChange={setMaxPrice}
          options={priceOptions}
        />

        <OptionSelector
          title="Min Area"
          value={minArea}
          onChange={setMinArea}
          options={areaOptions}
        />
      </div>

      {/* Property List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayed.length > 0 ? (
          displayed.map((property) => (
            <div key={property.propertyId}>
              <EstateCard property={property} image={property?.galleries}/>
            </div>
          ))
        ) : (
          <p>No properties match your search.</p>
        )}
      </div>

      {/* Load More */}
      {displayed.length < filtered.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setPage(page + 1)}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
