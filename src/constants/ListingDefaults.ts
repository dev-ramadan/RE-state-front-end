import type { ListingFormInputs } from "../types/property";

export const defaultResidentialValues: ListingFormInputs = {
    propertyPurpose: 0, // 0 -> For Sale, 1 -> For Rent
    title: "",
    userId: "",
    propertyStatus: 1,
    propertyType: 0,
    compoundId: "",
    address: "",
    city: "",
    googleMapsUrl: "",
    price: 0, // EGP
    square: 0, // square meters
    description: "",
    amenity: {
        hasElectricityLine: false,
        hasWaterLine: false,
        hasGasLine: false,
    },
    bathrooms: 1,
    bedrooms: 1,
    kitchenType: 0,
    floors: 1,
    images: [], // will be uploaded later
};

export const defaultCommercialValues: ListingFormInputs = {
    propertyPurpose: 0,
    title: "",
    userId: "",
    propertyStatus: 0,
    propertyType: 1,
    compoundId: "",
    address: "",
    city: "",
    googleMapsUrl: "",
    price: 0,
    square: 0,
    description: "",
    amenity: {
        hasElectricityLine: false,
        hasWaterLine: false,
        hasGasLine: false,
    },
    floorNumber: 0,
    businessType: "",
    hasStorage: false,
    images: [],
};
