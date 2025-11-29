import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getUserProfile } from "../services/ProfileService";
import type { getAgentProfileResponse, getUserProfileResponse } from "../types/Responses";

export function useUserProfile() {
    const stored = Cookies.get("Authentication");
    if (!stored) throw new Error("User not found in cookies");

    const { user } = JSON.parse(stored);
    return useQuery<getAgentProfileResponse | getUserProfileResponse>({
        queryKey: ["userProfile", user.userId],
        queryFn: () => getUserProfile(user.userId, user.role)
        ,
    });
}
