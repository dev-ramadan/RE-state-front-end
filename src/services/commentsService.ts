import type { CommentResponse } from "../types/Responses";
import Cookies from "js-cookie";


export function getToken(): string {
    const token = Cookies.get("Authentication");
    const user = token ? JSON.parse(token) : null;
    if (!user?.jwtToken) throw new Error("No authentication token found");
    return user.jwtToken;
}

// إضافة تعليق
export async function postComment(comment: CommentResponse | any) {
    const jwtToken = getToken();


    const res = await fetch("https://re-estate.runasp.net/api/Comment", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwtToken,
        },
        body: JSON.stringify(comment),
    });



    return res;
}

//  تعليقات العقار
export async function getPropertyComments(id: string) {
    const URL = `https://re-estate.runasp.net/api/Comment/property/${id}`;
    const jwtToken = getToken();

    const res = await fetch(URL, {
        method: "GET",
        headers: {
            "Authorization": jwtToken,
        },
    });

    const data = await res.json()


    return data.data.items;
}
// edit comment 

export async function editUserComment(id: string, comment: string) {
    const jwtToken = getToken();

    const res = await fetch(`https://re-estate.runasp.net/api/Comment/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwtToken,
        },
        body: JSON.stringify({ commentText: comment }),
    });

    return res;
}

export async function deleteUserComment(id: string) {
    const jwtToken = getToken();

    const res = await fetch(`https://re-estate.runasp.net/api/Comment/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwtToken,
        },
    });

    return res;
}
