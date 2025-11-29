import type { getAgentProfileResponse, getUserProfileResponse } from "../types/Responses";

export function formatPrice(value: number): string {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "EGP",
    }).format(value);
}


export function formatDate(dateStr: string): string {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(dateStr));
}

export function capitalize(str: string) {
    return str
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');;

}
export function destructUserProfile(data?: getUserProfileResponse | getAgentProfileResponse) {
    if (!data || !data.isSuccess) return { user: null, listings: [] };

    const profileData = data.data;
    (profileData);
    if ('agencyName' in profileData) {
        const { properties, user, ...rest } = profileData;
        const agentInfo = { ...rest, ...user };

        const listings = properties;
        (listings);
        return {
            user: agentInfo,
            listings,
        };
    }
    return {
        user: profileData,
        listings: [],
    };

}