import Cookies from "js-cookie";
import request from "../utils/request";
import type { RegitserForm, UserSignIn } from "../types/User";
import { getUserById } from "./ProfileService";
import type { LoginResponse } from "../types/Responses";



export async function loginService(user: UserSignIn) {
    const res = await request<LoginResponse>("/api/Auth/login", {
        method: "POST",
        body: JSON.stringify(user),
    });

    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to log in");
    }

    return res;
}

export async function registerService(user: RegitserForm) {
    const res = await request<LoginResponse>("/api/Auth/register", {
        method: "POST",
        body: JSON.stringify(user),
    });

    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to register");
    }
    return res;
}
export async function logoutService(id: string) {
    const res = await request<LoginResponse>(`/api/Auth/logout/${id}`, {
        method: "POST",
    });
    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to logout");
    }
    return res;
}

export async function getCurrentUser() {
    const stored = Cookies.get("session");
    if (!stored) return null;

    const session = JSON.parse(stored);
    const user = await getUserById(session.userId);

    if (!user?.isSuccess) {
        Cookies.remove("session");
        return null;
    }

    return user;
}

