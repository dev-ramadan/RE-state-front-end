export type PropertyPurpose = "sale" | "rent";
export type PropertyType = "commercial" | "residential";

export type Property = {
    id?: string;
    propertyId?: string;
    title: string;
    name?: string;
    purpose: PropertyPurpose;
    square: number;
    price: number;
    address: string;
    bedrooms?: number;
    bathrooms?: number;
    imageUrl: string;
    type?: string;
    propertyType?: string
    galleries?: any[]
    likes?: boolean | number | any
    likesCount?: number
    isLiked?: boolean
    images?: any[]
};

export type PropertyWithAgency = Property & {
    agencyName: string;
    vendorName: string;
};
export type Amenity = {
    hasElectricityLine: boolean;
    hasWaterLine: boolean;
    hasGasLine: boolean;
};

export type baseLisintingForm = {
    userId: string;
    propertyStatus: number;
    // Step 1 info
    title: string;
    propertyPurpose: 0 | 1;
    compoundId?: string | null;
    // Step 2
    address: string;
    city: string;
    googleMapsUrl: string;
    // Step 3
    price: number;
    square: number;
    // Step 4
    description: string;
    amenity: Amenity; // multiple selections
    // Step 5
    images: File[];
};
export type residentialProperty = baseLisintingForm & {
    propertyType: 0;
    bathrooms: number;
    bedrooms: number;
    kitchenType: number;
    floors: number;

};
export type CommercialProperty = baseLisintingForm & {
    propertyType: 1;
    floorNumber: number;
    businessType: string;
    hasStorage: boolean
};
export type ListingFormInputs =
    | CommercialProperty
    | residentialProperty;
export type ListingImagesFormInputs = {
    images: File[];
}

export type PropertyGallery = {
    mediaId: string;
    propertyId: string;
    imageUrl: string;
    uploadedAt: string;
    videoUrl?: string | null;
}

export type Compound = {
    compoundId: string;
    name: string;
    city: string;
    address: string;
    description: string;
};

export type PropertyRes = {
    address: string;
    amenity: Amenity;
    businessType: string;
    city: string;
    comments: any[]; // ممكن تضبط type لاحقًا حسب شكل التعليقات
    compound: Compound;
    dateListed: string; // أو Date لو هتحولها
    description: string;
    floorNumber: number;
    galleries: PropertyGallery[];
    googleMapsUrl: string;
    hasStorage: boolean;
    isLiked: boolean;
    likesCount: number;
    price: number;
    propertyId: string;
    propertyPurpose: "Sale" | "Rent";
    propertyStatus: string;
    propertyType: "Commercial" | "Residential";
    square: number;
    title: string;
    userId: string;
};