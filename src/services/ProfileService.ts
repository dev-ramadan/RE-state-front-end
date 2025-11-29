import type { getAgentProfileResponse, getUser, getUserProfileResponse, getUserRolesResponse } from "../types/Responses";
import type { UserRole } from "../types/User";
import request from "../utils/request"


export const getUserProfile = async (id: string, userRole: UserRole) => {
    const res = userRole === "Agent" ? await request<getAgentProfileResponse>(`/api/Agent/${id}`, {
        method: "GET"
    }) : await request<getUserProfileResponse>(`/api/User/${id}`, {
        method: "GET"
    });
    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }

    return res;

}
export const getUserById = async (id: string) => {
    const res = await request<getUser>(`/api/User/${id}`, {
        method: "GET"
    })
    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }

    return res;

}
export const getUserRoles = async (id: string) => {
    const res = await request<getUserRolesResponse>(`/api/UserRole/user-roles/${id}`, {
        method: "GET"
    })
    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }
    return res;
}