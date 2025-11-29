import { DollarSign, Home } from 'lucide-react';

export const PropertyTypeOptions = [
  { value: 0, label: 'residential' },
  { value: 1, label: 'commercial' },
];
export const PropertyPurposeOptions = [
  { value: 0, label: 'sale', icon: <DollarSign /> },
  { value: 1, label: 'rent', icon: <Home /> },
];

export const bedroomsOptions = [
  { value: 0, label: 'studio' },
  { value: 1, label: '1 bedrooms' },
  { value: 2, label: '2 bedrooms' },
  { value: 3, label: '3 bedrooms' },
  { value: 4, label: '4 bedrooms' },
  { value: 5, label: '5+ bedrooms' },
];
export const FloorsOptions = [
  { value: 0, label: 'Ground floor' },
  { value: 1, label: '1st floor' },
  { value: 2, label: '2nd floor' },
  { value: 3, label: '3rd floor' },
  { value: 4, label: '4th floor' },
  { value: 5, label: '5th floor or higher' },
];
export const FloorNumberOptions = [
  { value: 1, label: '1 floors' },
  { value: 2, label: '2 floors' },
  { value: 3, label: '3 floors' },
  { value: 4, label: '4 floors' },
  { value: 5, label: '5 floors' },
];
export const KitchenTypeOptions = [
  { value: 0, label: 'American' },
  { value: 1, label: 'LShaped' },
  { value: 2, label: 'UShaped' },
  { value: 3, label: 'Island' },
];
export const bathroomsOptions = [
  { value: 0, label: 'No bathroom' },
  { value: 1, label: '1 bathroom' },
  { value: 2, label: '1 bedrooms' },
  { value: 3, label: '3 bedrooms' },
  { value: 4, label: '4+ bedrooms' },
];

// export const amenityOptions = [
//   { value: 'parking', label: 'Parking', icon: <Car /> },
//   { value: 'ac', label: 'Air Conditioning', icon: <Snowflake /> },
//   { value: 'internet', label: 'Internet/WiFi', icon: <Wifi /> },
//   { value: 'security', label: '24/7 Security', icon: <Shield /> },
//   { value: 'pool', label: 'Swimming Pool', icon: <Waves /> },
//   { value: 'gym', label: 'Gym/Fitness', icon: <Dumbbell /> },
//   { value: 'garden', label: 'Garden', icon: <Sprout /> },
//   { value: 'balcony', label: 'Balcony', icon: <Building2 /> },
// ];
