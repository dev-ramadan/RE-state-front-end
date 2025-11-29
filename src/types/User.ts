import type { PropertyGroup } from "./Responses";

export type UserRole = 'Customer' | 'Agent' | "Admin";

export interface userRoleResponse {
    roleId: string;
    roleName: string;
}

export type UserRegister = {
    email: string;
    password: string;
    userName: string;
    phone: string;
};
export type customerRegister = UserRegister & {
    roleDiscriminator: 3;
};
export type agentRegister = UserRegister & {
    roleDiscriminator: 1;
    agencyName: string,
    taxIdentificationNumber: number,
    experienceYears: number,
};
export type brokerRegister = UserRegister & {
    roleDiscriminator: 2;
    nationalID: string,
    licenseID: string,
};
export type RegitserForm = {
    email: string;
    password: string;
    userName: string;
    phone: string;
    roleDiscriminator: number;

    // For agent
    agencyName?: string;
    taxIdentificationNumber?: number;
    experienceYears?: number;

    // For broker
    nationalID?: string;
    licenseID?: string;
};
;
export type UserSignIn = {
    userName: string;
    password: string;
};
export type sessinToken = {
    user: UserProfile;
    jwtToken: string;
    roles: string[];
};
// profile

export type AgentData = UserData & {
    id: string;
    agencyName: string;
    taxIdentificationNumber: number;
    rating: number;
    experienceYears: number;
    user: UserData;
    properties: PropertyGroup;
};
export type UserData = {
    userId: string;
    username: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    role?: UserRole;
};
export type UserProfile = UserData;
export type AgentProfile = UserData & {
    agencyName: string;
    id: string;
    taxIdentificationNumber: number;
    rating: number;
    experienceYears: number;
}
export type Profile = UserProfile | AgentProfile;
