import type { CommercialProperty, residentialProperty } from "../types/property";

export const residentialStepFields: Record<number, (keyof residentialProperty)[]> = {
    1: ['title', 'propertyPurpose', 'propertyType'],
    2: ['address', 'city', 'googleMapsUrl'],
    3: ['price', 'square', 'bedrooms', 'bathrooms', "kitchenType"],
    4: ['description', 'amenity'],
    5: ['images'],
};

export const commercialStepFields: Record<number, (keyof CommercialProperty)[]> = {
    1: ['title', 'propertyPurpose', 'propertyType'],
    2: ['address', 'city', 'googleMapsUrl'],
    3: ['price', 'square', 'floorNumber', 'businessType', 'hasStorage'],
    4: ['description', 'amenity'],
    5: ['images'],
};