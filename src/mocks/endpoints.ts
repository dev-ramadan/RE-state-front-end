type EndpointMethod = "GET" | "POST" | "PUT" | "DELETE";

interface Endpoint<T> {
    method: EndpointMethod;
    path: string;
    response: (req: {
        body?: Record<string, any>;
        params: { [key: string]: string };
    }) => T | T[];
}

interface Endpoints {
    [resource: string]: Endpoint<unknown>[];
}

const agentStore: Record<string, any> = {
    "3fa85f64-5717-4562-b3fc-2c963f66afa6": {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        agencyName: "Premium Real Estate Agency",
        taxIdentificationNumber: 123456789,
        rating: 4.8,
        experienceYears: 5,
        user: {
            userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            username: "JohnAgent",
            email: "john.agent@example.com",
            phoneNumber: "+201234567890",
            dateJoined: "2025-11-04T18:52:40.887Z",
        },
        // Keep the same shape used elsewhere in this file (object with two arrays)
        properties: {
            commercialProperties: [
                {
                    propertyId: "3fa85f64-5717-4562-b3fc-2312963f66afa6",
                    city: "Cairo",
                    title: "MyHouse 2 ",
                    address: "Downtown Business District",
                    googleMapsUrl: "https://maps.google.com/example",
                    propertyType: { 0: "Residential" },
                    propertyPurpose: { 0: "Rent" },
                    propertyStatus: { 0: "Accepted" },
                    price: 500000,
                    square: 200,
                    description: "Prime commercial space in downtown",
                    agentName: "John Agent",
                    compoundName: "Business Complex One",
                    businessType: "Office",
                    floorNumber: 5,
                    hasStorage: true,
                    amenity: {
                        hasElectricityLine: true,
                        hasWaterLine: true,
                        hasGasLine: true,
                    },
                    galleries: [
                        {
                            mediaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            imageUrl: "https://images.dubizzle.com.eg/thumbnails/146038752-800x600.webp",
                            uploadedAt: "2025-11-04T18:52:40.887Z",
                        },
                    ],
                },
            ],
            residentialProperties: [
                {
                    propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    title: "MyHouse",
                    city: "Cairo",
                    address: "New Cairo Residential Area",
                    googleMapsUrl: "https://maps.google.com/example",
                    propertyType: { 0: "Residential" },
                    propertyPurpose: { 0: "Rent" },
                    propertyStatus: { 0: "Accepted" },
                    price: 300000,
                    square: 150,
                    description: "Modern residential apartment",
                    dateListed: "2025-11-04T18:52:40.888Z",
                    agentName: "John Agent",
                    compoundName: "Green Valley Compound",
                    bedrooms: 3,
                    bathrooms: 2,
                    floors: 1,
                    kitchenType: 0,
                    galleries: [
                        {
                            mediaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            imageUrl: "https://images.dubizzle.com.eg/thumbnails/146038752-800x600.webp",
                            uploadedAt: "2025-11-04T18:52:40.888Z",
                        },
                    ],
                    amenity: {
                        hasElectricityLine: true,
                        hasWaterLine: true,
                        hasGasLine: true,
                    },
                },
            ],
        },
    },
};

function removePropertyFromAgents(propertyId: string) {
    Object.values(agentStore).forEach((agent) => {
        const groups = Array.isArray(agent.properties) ? agent.properties : [agent.properties];
        groups.forEach((group: any) => {
            if (Array.isArray(group.commercialProperties)) {
                group.commercialProperties = group.commercialProperties.filter((p: any) => p.propertyId !== propertyId);
            }
            if (Array.isArray(group.residentialProperties)) {
                group.residentialProperties = group.residentialProperties.filter((p: any) => p.propertyId !== propertyId);
            }
        });
        // keep original shape (object or array)
        agent.properties = Array.isArray(agent.properties) ? groups : groups[0];
    });
}

export const endpoints: Endpoints = {
    //  User profile endpoints
    userProfile: [
        {
            method: "GET",
            path: "/api/User/:UserId",
            response: ({ params }) => {
                return {
                    isSuccess: true,
                    message: "User profile retrieved successfully",
                    data: {
                        userId: params.UserId || "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        username: "JohnDoe",
                        email: "john.doe@example.com",
                        phoneNumber: "+201234567890",
                        dateJoined: "2025-11-04T17:58:06.618Z"
                    }
                };
            }
        }
    ],

    //  Agent profile endpoints
    agentProfile: [
        {
            method: "GET",
            path: "/api/Agent/:AgentId",
            response: ({ params }) => {
                const id = params.AgentId || "3fa85f64-5717-4562-b3fc-2c963f66afa6";
                const agent = agentStore[id];
                if (agent) {
                    return {
                        isSuccess: true,
                        message: "Agent profile retrieved successfully",
                        data: agent,
                    };
                }
                // fallback to minimal default
                return {
                    isSuccess: true,
                    message: "Agent profile retrieved successfully",
                    data: {
                        id,
                        agencyName: "Premium Real Estate Agency",
                        taxIdentificationNumber: 123456789,
                        rating: 4.8,
                        experienceYears: 5,
                        user: {
                            userId: id,
                            username: "JohnAgent",
                            email: "john.agent@example.com",
                            phoneNumber: "+201234567890",
                            dateJoined: "2025-11-04T18:52:40.887Z",
                        },
                        properties: { commercialProperties: [], residentialProperties: [] },
                    },
                };
            },
        }
    ],
    users: [
        {
            method: "GET",
            path: "/users",
            response: () => [
                { id: 1, name: "John Maverick" },
                { id: 2, name: "Jane Doe" },
                { id: 3, name: "Foo Bar" },
            ],
        },
        {
            method: "GET",
            path: "/users/:id",
            response: (req) => ({
                name: `User ${req.params.id}`,
            }),
        },
        {
            method: "POST",
            path: "/users",
            response: (req) => ({ id: Date.now(), ...req.body }),
        },
    ],

    auth: [
        {
            method: "POST",
            path: "/api/Auth/register",
            response: () => {
                return {
                    isSuccess: true,
                    message: "Login successful",
                    data: {
                        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        jwtToken: "mock-jwt-token-123",
                    },
                };
            },
        },
        {
            method: "POST",
            path: "/api/Auth/login",
            response: () => {
                return {
                    isSuccess: true,
                    message: "Login successful",
                    data: {
                        userId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        jwtToken: "mock-jwt-token-123",
                    },
                };
            },
        },
        {
            method: "POST",
            path: "/api/Auth/logout/:userId",
            response: (req) => ({
                message: `User ${req.params.userId} logged out successfully.`,
            }),
        },
        {
            method: "GET",
            path: "/api/Auth/me",
            response: () => ({
                id: 1,
                userName: "John Maverick",
                email: "john@example.com",
                phone: "+123456789",
            }),
        },
    ],
    commercialProperty: [
        {
            method: "POST",
            path: "/api/CommercialProperty/AddCommercialProperty",
            response: (req) => {
                const body = req.body || {};
                return {
                    isSuccess: true,
                    message: "Commercial property added successfully",
                    data: {
                        propertyId: "6fa85f64-5717-4562-b3fc-2c963f66afa6",
                        city: body.city,
                        address: body.address,
                        googleMapsUrl: body.googleMapsUrl,
                        propertyType: body.propertyType,
                        propertyPurpose: body.propertyPurpose,
                        propertyStatus: body.propertyStatus,
                        price: body.price,
                        square: body.square,
                        description: body.description,
                        dateListed: new Date().toISOString(),
                        agentName: "Agent Example",
                        compoundName: "Compound Example",
                        floorNumber: body.floorNumber,
                        businessType: body.businessType,
                        hasStorage: body.hasStorage,
                        amenity: body.amenity,
                    },
                };
            },
        },
        {
            method: "PUT",
            path: "/api/CommercialProperty/:id",
            response: ({ params }) => {
                const { id } = params;
                return {
                    isSuccess: true,
                    message: "Commercial property retrieved successfully",
                    data: {
                        propertyId: id,
                        city: "Alexandria",
                        title: "omar property title",
                        address: "15 El Tahrir St, Cairo, Egypt",
                        googleMapsUrl: "vhttps://www.google.com/maps/@29.9609231,32.5484151,13z?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D",
                        propertyType: 1,
                        propertyPurpose: 1,
                        propertyStatus: 1,
                        price: 4000000,
                        square: 400,
                        description: "A spacious office space available for rent.",
                        dateListed: new Date().toISOString(),
                        agentName: "Agent Example",
                        compoundName: "Compound Example",
                        floorNumber: 3,
                        businessType: "Office",
                        hasStorage: false,
                        amenity: {
                            hasElectricityLine: true,
                            hasWaterLine: true,
                            hasGasLine: false,
                        },
                        galleries: [
                            {
                                mediaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                imageUrl: "https://images.dubizzle.com.eg/thumbnails/146038752-800x600.webp",
                                uploadedAt: "2025-11-04T18:52:40.887Z"
                            }
                        ],
                    },
                };
            },
        },
        {
            method: "GET",
            path: "/api/CommercialProperty/:id",
            response: ({ params }) => {
                const { id } = params;
                return {
                    isSuccess: true,
                    message: "Commercial property retrieved successfully",
                    data: {
                        propertyId: id,
                        city: "Alexandria",
                        title: "omar property title",
                        address: "15 El Tahrir St, Cairo, Egypt",
                        googleMapsUrl: "vhttps://www.google.com/maps/@29.9609231,32.5484151,13z?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D",
                        propertyType: 1,
                        propertyPurpose: 1,
                        propertyStatus: 1,
                        price: 4000000,
                        square: 400,
                        description: "A spacious office space available for rent.",
                        dateListed: new Date().toISOString(),
                        agentName: "Agent Example",
                        compoundName: "Compound Example",
                        floorNumber: 3,
                        businessType: "Office",
                        hasStorage: false,
                        amenity: {
                            hasElectricityLine: true,
                            hasWaterLine: true,
                            hasGasLine: false,
                        },
                        galleries: [
                            {
                                mediaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                imageUrl: "https://images.dubizzle.com.eg/thumbnails/146038752-800x600.webp",
                                uploadedAt: "2025-11-04T18:52:40.887Z"
                            }
                        ],
                    },
                };
            },
        },
        {
            method: "DELETE",
            path: "/api/CommercialProperty/:id",
            response: ({ params }) => {
                const { id } = params;
                // remove property from any agent that references it
                try {
                    removePropertyFromAgents(id);
                } catch (e) {
                    // ignore errors in mock removal
                }
                return {
                    isSuccess: true,
                    message: "Commercial property deleted successfully",
                    data: true,
                };
            },
        },
    ],


    residentialProperty: [
        {
            method: "POST",
            path: "/api/ResidentialProperty/AddResidentialProperty",
            response: (req) => {
                const body = req.body || {};
                return {
                    isSuccess: true,
                    message: "Residential property added successfully",
                    data: {
                        propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                        city: body.city,
                        address: body.address,
                        googleMapsUrl: body.googleMapsUrl,
                        propertyType: body.propertyType,
                        propertyPurpose: body.propertyPurpose,
                        propertyStatus: body.propertyStatus,
                        price: body.price,
                        square: body.square,
                        description: body.description,
                        dateListed: new Date().toISOString(),
                        agentName: "Agent Example",
                        compoundName: "Compound Example",
                        bedrooms: body.bedrooms,
                        bathrooms: body.bathrooms,
                        floors: body.floors,
                        kitchenType: body.kitchenType,
                        amenity: body.amenity,
                    },
                };
            },
        },
        {
            method: "PUT",
            path: "/api/ResidentialProperty/:id",
            response: ({ params }) => {
                const { id } = params;
                return {
                    isSuccess: true,
                    message: "Residential property retrieved successfully",
                    data: {
                        propertyId: id,
                        title: "omar property title",
                        city: "Cairo",
                        address: "15 El Tahrir St, Cairo, Egypt",
                        googleMapsUrl: "https://www.google.com/maps/@29.9609231,32.5484151,13z?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D",
                        propertyType: 0,
                        propertyPurpose: 0,
                        propertyStatus: 1,
                        price: 2000000,
                        square: 150,
                        description: "A beautiful residential apartment near the Nile.",
                        dateListed: new Date().toISOString(),
                        agentName: "Agent Example",
                        compoundName: "Compound Example",
                        bedrooms: 3,
                        bathrooms: 2,
                        floors: 5,
                        kitchenType: 1,
                        amenity: {
                            hasElectricityLine: true,
                            hasWaterLine: true,
                            hasGasLine: true,
                        },
                        galleries: [
                            {
                                mediaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                imageUrl: "https://images.dubizzle.com.eg/thumbnails/146038752-800x600.webp",
                                uploadedAt: "2025-11-04T18:52:40.887Z"
                            }
                        ],
                    },
                };
            },
        },
        {
            method: "GET",
            path: "/api/ResidentialProperty/:id",
            response: ({ params }) => {
                const { id } = params;
                return {
                    isSuccess: true,
                    message: "Residential property retrieved successfully",
                    data: {
                        propertyId: id,
                        title: "omar property title",
                        city: "Cairo",
                        address: "15 El Tahrir St, Cairo, Egypt",
                        googleMapsUrl: "https://www.google.com/maps/@29.9609231,32.5484151,13z?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D",
                        propertyType: 0,
                        propertyPurpose: 0,
                        propertyStatus: 1,
                        price: 2000000,
                        square: 150,
                        description: "A beautiful residential apartment near the Nile.",
                        dateListed: new Date().toISOString(),
                        agentName: "Agent Example",
                        compoundName: "Compound Example",
                        bedrooms: 3,
                        bathrooms: 2,
                        floors: 5,
                        kitchenType: 1,
                        amenity: {
                            hasElectricityLine: true,
                            hasWaterLine: true,
                            hasGasLine: true,
                        },
                        galleries: [
                            {
                                mediaId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                propertyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                                imageUrl: "https://images.dubizzle.com.eg/thumbnails/146038752-800x600.webp",
                                uploadedAt: "2025-11-04T18:52:40.887Z"
                            }
                        ],
                    },
                };
            },
        },
        {
            method: "DELETE",
            path: "/api/ResidentialProperty/:id",
            response: ({ params }) => {
                const { id } = params;
                try {
                    removePropertyFromAgents(id);
                } catch (e) {
                    // ignore errors in mock removal
                }
                return {
                    isSuccess: true,
                    message: "Residential property deleted successfully",
                    data: true,
                };
            },
        },
    ],

    // 👇 Compound endpoints
    compound: [
        {
            method: "POST",
            path: "/api/Compound/AddCompound",
            response: (req) => {
                const body = req.body || {};
                return {
                    isSuccess: true,
                    message: "Compound added successfully",
                    data: {
                        compoundId: crypto.randomUUID(),
                        name: body.name,
                        city: body.city,
                        address: body.address,
                        description: body.description,
                    },
                };
            },
        },
        {
            method: "GET",
            path: "/api/Compound/GetAll",
            response: () => ({
                isSuccess: true,
                message: "Compounds retrieved successfully",
                data: {
                    data: [
                        {
                            compoundId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                            name: "Palm Hills",
                            city: "Cairo",
                            address: "6th of October",
                            description: "Luxury residential compound",
                        },
                        {
                            compoundId: "2fa95f64-5717-4562-b3fc-2c963f66afa6",
                            name: "Madinaty",
                            city: "Cairo",
                            address: "New Cairo",
                            description: "Spacious modern living community",
                        },
                    ],
                    totalCount: 2,
                    totalPages: 1,
                },
            }),
        },
    ],
    Images: [
        {
            method: "POST",
            path: "/api/PropertyGallery",
            response: (req) => {
                const body = req.body || {};
                const propertyId = body.propertyId || "unknown";
                // simulate uploaded image URLs
                const uploadedImages = Array.isArray(body.images)
                    ? body.images.map((_, index) =>
                        `https://mock-server.com/uploads/${propertyId}-${index}.jpg`
                    )
                    : [
                        `https://mock-server.com/uploads/${propertyId}-0.jpg`,
                    ];

                return {
                    isSuccess: true,
                    message: "Images uploaded successfully (mock)",
                    data: uploadedImages,
                };
            },
        },
    ],


};
