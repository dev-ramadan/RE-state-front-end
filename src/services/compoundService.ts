
import type { getAllCompoundsResponse } from "../types/Responses";
import request from "../utils/request";
export async function getAllCompounds() {
    const res = await request<getAllCompoundsResponse>("/api/Compound/?PageSize=1000", { method: "GET" });

    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }

    return res;
}


