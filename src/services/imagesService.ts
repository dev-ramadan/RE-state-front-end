import type { BadRequest } from "../types/Responses";
import request from "../utils/request";

type postImagesResponse = {
    isSuccess: true;
    message: string;
    data?: string[];
} | BadRequest;

/**
 * Uploads images for a given property (after property is created).
 */
export async function postImages({
    images,
    propertyId,
}: {
    images: File[];
    propertyId: string;
}) {
    //build FormData

    const formData = new FormData();
    formData.append("PropertyId", propertyId);
    (propertyId);
    images.forEach((file) => formData.append("MediaFiles", file));


    (formData);

    //  send to API
    const res = await request<postImagesResponse>("/api/PropertyGallery", {
        method: "POST",
        body: formData,
        headers: {
            "Accept": "application/json",

        },
    });

    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to upload image");
    }
    return res.data;

}
