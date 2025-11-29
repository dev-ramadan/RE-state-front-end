import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ListingFormInputs } from "../types/property";
import { postImages } from "../services/imagesService";
import { delPropertyById, getAllProperties, getPropertyById, postProperty, putProperty,getProperties } from "../services/PropertyService";
import { useParams } from "react-router";
import toast from "react-hot-toast";


export function useAddProperty() {
    return useMutation({
        mutationFn: async (formData: ListingFormInputs) => {
            const { images, ...property } = formData;
            //  post property first
            const propertyRes =
                property.propertyType === 0
                    ? await postProperty(0, property)
                    : await postProperty(1, property);
            if (!propertyRes.isSuccess) {
                throw new Error(propertyRes.message);
            }
            const propertyId = propertyRes.data?.propertyId;

            (images);
            if (propertyId && images && images.length > 0) {
                await postImages({
                    propertyId,
                    images,
                });

            }
            return propertyRes;
        },
    });
}

export function useEditProperty() {
    return useMutation({
        mutationFn: async ({ formData, propertyId }: { formData: Omit<ListingFormInputs, 'images' | 'agentId'>, propertyId: string }) => {
            const property = formData;
            //  post property first
            const propertyRes = await putProperty(propertyId, property)
            if (!propertyRes.isSuccess) {
                throw new Error(propertyRes.message);
            }
            return propertyRes;
        },
    });
}

export function useDeleteProperty() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ propertyId, propertyType }: { propertyId: string, propertyType: string }) => {
            const propertyRes = await delPropertyById(propertyId, propertyType)
            if (!propertyRes.isSuccess) {
                throw new Error(propertyRes.message);
            }
            return propertyRes;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
            toast.success("Property deleted successfully!");

        },
        onError: () => {
            toast.error("Failed to delete property");
        },
    });
}

export function usePrevData() {
    const { propertyId, propertyType } = useParams<{ propertyId: string; propertyType: string }>();

    const { data: queryData, isLoading, isError, error } = useQuery({
        queryKey: ["property", propertyId, propertyType],
        queryFn: () => getPropertyById(propertyId!, propertyType!),
        enabled: !!propertyId && !!propertyType,
        staleTime: Infinity,
    });

    const data = queryData?.isSuccess ? queryData.data : undefined;

    return { data, isLoading, isError, error };
}


export function useAllProperties(propertyType: string) {
  const query = useQuery({
    queryKey: ["properties", propertyType],  
    queryFn: () => getAllProperties(propertyType),  
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

export function useProperties() {
  const query = useQuery({
    queryKey: ["properties"],  
    queryFn:  getProperties,  
    staleTime: 5 * 60 * 1000,
  });

  return {
    data: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
  };
}

