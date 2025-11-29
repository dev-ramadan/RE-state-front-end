import { getToken } from "./commentsService";

const url = "https://re-estate.runasp.net/api/Like/ToggleLikeProperty"
const commentLikeUrl = "https://re-estate.runasp.net/api/Like/ToggleLikeComment"

export const Like = async (id: any) => {
    try {
        const token = getToken()

        const setLike = await fetch(`${url}/${id}`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        return await setLike.json()

    } catch (err) { console.log(err) };

}


export const commentLike = async (id: any) => {
    try {
        const token = getToken()

        const setLike = await fetch(`${commentLikeUrl}/${id}`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
        });
        return await setLike.json()

    } catch (err) { console.log(err) };

}

