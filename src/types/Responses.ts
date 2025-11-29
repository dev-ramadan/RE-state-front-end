import type { CommercialProperty, PropertyGallery, residentialProperty } from "./property";
import type { AgentData, UserData, userRoleResponse } from "./User";

export type BadRequest = {
    isSuccess: false,
    message: string,
    data?: string
}
export type getAllCompoundsResponse = {
    isSuccess: boolean;
    message: string;
    data?: {
        items: any[];
        totalCount: number;
        totalPages: number;
    };
};
export type compoundResposne = {
    address: string;
    city: string;
    compoundId: string;
    description: string;
    name: string;
}
export type getResidentialPropertyById = {
    isSuccess: true;
    message: string;
    data?: Omit<residentialProperty, "images" | "agentId" | "propertyStatus" | "propertyType" | "propertyPurpose"> & {
        propertyId: string;
        galleries: PropertyGallery[];
        compound: compoundResposne;
        agentName: string;
        dateListed: string;
        propertyStatus: string;
        propertyType: string;
        propertyPurpose: string;
        bedrooms?: number;
        bathrooms?: number;
        phone: string;
        agencyName: string;
        vendorName: string;
    };
}
export type postResPropertyResponse = {
    isSuccess: true;
    message: string;
    data: ResidentialPropertyResponse;
} | BadRequest;
export type getCommercialPropertyById = {
    isSuccess: true;
    message: string;
    data?: CommercialPropertyResponse;
}



export type postComPropertyResponse =
    | {
        isSuccess: true;
        message: string;
        data:
        Omit<CommercialProperty, "images" | "compoundId" | "agentId"> & {
            compoundName: string;
            agentName: string;
            propertyId: string;
        };
    }
    | BadRequest;
// Agent profile response types

export type CommercialPropertyResponse = Omit<CommercialProperty, "images" | "compoundId" | "agentId" | "propertyType" | "propertyPurpose" | "propertyStatus"> & {
    propertyId: string;
    galleries: PropertyGallery[];
    compound: compoundResposne;
    agentName: string;
    dateListed: string;
    propertyStatus: string;
    propertyType: string;
    propertyPurpose: string;

};;

export type ResidentialPropertyResponse = Omit<residentialProperty, "images" | "agentId" | "propertyType"> & {
    propertyId: string;
    galleries: PropertyGallery[];
    compoundName: string;
    agentName: string;
    propertyType: string;
    dateListed: string;
}
export type PropertyGroupListItem = (CommercialPropertyResponse | ResidentialPropertyResponse);

export type PropertyGroup = (CommercialPropertyResponse | ResidentialPropertyResponse)[];
export type PropertyGroupList = (CommercialPropertyResponse | ResidentialPropertyResponse)[];

export type getAgentProfileResponse = {
    isSuccess: true;
    message: string;
    data: AgentData;
} | BadRequest;

// User profile response

export type getUserProfileResponse = {
    isSuccess: true;
    message: string;
    data: UserData;
} | BadRequest;
export type getUser = {
    isSuccess: true;
    message: string;
    data: UserData;
} | BadRequest;
// delete property 
export type deletePropertyResponse = { isSuccess: boolean, message: string, data?: null | boolean }

// auth


export type LoginSuccess = {
    isSuccess: true;
    message: string;
    data: {
        userId: string;
        jwtToken: string;
    };
};
export type getUserRolesResponse = {
    isSuccess: true;
    message: string;
    data: {
        userId: string;
        roles: userRoleResponse[];
    };
} | BadRequest;
export type LoginResponse = LoginSuccess | BadRequest;


export type CommentResponse = {
    commentText: string;
    propertyId: string;
    commentId?: string;
    userID?: string;
    likesCount:number;
    isLiked:boolean;
    userName:string
}

export type postCommentResponse = {
    isSuccess: true;
    message: string;
    data: [];
} | BadRequest;
