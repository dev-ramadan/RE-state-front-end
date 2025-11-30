import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "../services/ProfileService";
import { useAuth } from "../context/AuthContext";


export function useUserProfile() {
    const { user } = useAuth();
    if (!user) return { data: null, isLoading: false, error: "User not found" };

    return useQuery<any>({
        queryKey: ["userProfile", user?.userId],
        queryFn: () => getUserProfile(user.userId, user?.role!),
    });
}

