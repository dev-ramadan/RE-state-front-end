import type { CommercialProperty, residentialProperty } from "../types/property";
import type { deletePropertyResponse, getCommercialPropertyById, getResidentialPropertyById, postComPropertyResponse, postResPropertyResponse } from "../types/Responses";
import request from "../utils/request";


export async function postProperty(
    propertyType: 0 | 1,
    property: Omit<residentialProperty | CommercialProperty, "images">
) {
    if (property.compoundId == "") {
        property.compoundId = null;
    }
    const endpoint =
        propertyType === 0
            ? "/api/ResidentialProperty"
            : "/api/CommercialProperty";
    const res = propertyType ? await request<postResPropertyResponse>(endpoint, {
        method: "POST",
        body: JSON.stringify(property),
    }) : await request<postComPropertyResponse>(endpoint, {
        method: "POST",
        body: JSON.stringify(property),
    });

    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }
    return res;
}

export async function putProperty(
    id: string,
    property: Omit<residentialProperty | CommercialProperty, 'images' | 'agentId'>
) {
    const endpoint =
        property.propertyType === 0
            ? `/api/ResidentialProperty/${id}`
            : `/api/CommercialProperty/${id}`;
    const res = property.propertyType == 0 ? await request<postResPropertyResponse>(endpoint, {
        method: "PUT",
        body: JSON.stringify(property),
    }) : await request<postComPropertyResponse>(endpoint, {
        method: "PUT",
        body: JSON.stringify(property),
    });
    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }
    return res;


}
export async function delPropertyById(
    id: string,
    propertyType: string
) {
    const res = propertyType == "Residential" ? await request<deletePropertyResponse>(`/api/ResidentialProperty/${id}`, {
        method: "DELETE",
    }) : await request<deletePropertyResponse>(`/api/CommercialProperty/${id}`, {
        method: "DELETE",
    });
    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }
    return res;
}

export async function getPropertyById(id: string, propertyType: string) {
    const url =
        propertyType == "Residential"
            ? `/api/ResidentialProperty/${id}`
            : `/api/CommercialProperty/${id}`;
    (url);

    // Dynamically pick the correct response type
    const res =
        propertyType == "Residential"
            ? await request<getResidentialPropertyById>(url, { method: "GET" })
            : await request<getCommercialPropertyById>(url, { method: "GET" });

    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }
    return res;

}

export async function getAllProperties(propertyType: string) {
    const url =
        propertyType === "residential"
            ? `/api/ResidentialProperty`
            : `/api/CommercialProperty`;

    const res = await request<any>(url, { method: "GET" });

    if (!res.isSuccess) {
        throw new Error(res.message || "Failed to fetch compounds");
    }

  return res.data; 
}

export async function getProperties() {
  const url = `/api/Property`

  const res = await request<any>(url, { method: "GET" });

  if (!res.isSuccess) {
    throw new Error(res.message || "Failed to fetch compounds");
  }

  return res.data; 
}

