import type {Festival, FestivalRequest} from "@/types/festivals.ts";
import type {ErrorResponse} from "@/types/common.ts";

const festivalAPIBaseURL = "http://localhost:8080";


export const listFestivals = async (): Promise<Festival[]> => {
    const response = await fetch(`${festivalAPIBaseURL}/festivals`,
        {
            method: "GET"
        });
    if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    const festivals: Festival[] = await response.json();
    return festivals;
}

export const createFestivals = async(request: FestivalRequest):Promise<Festival|ErrorResponse> => {
    const response = await fetch(`${festivalAPIBaseURL}/festivals`,
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(request),
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
    const festivals: Festival = await response.json();
    return festivals;
}

export const updateFestival = async(id: string, request: FestivalRequest):Promise<Festival|ErrorResponse> => {
    const response = await fetch(`${festivalAPIBaseURL}/festivals/${id}`,
        {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(request),
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
    const festivals: Festival = await response.json();
    return festivals;
}



export const getFestival = async(id: string):Promise<Festival|ErrorResponse> => {
    const response = await fetch(`${festivalAPIBaseURL}/festivals/${id}`,
        {
            method: "GET",
            headers: {
                "Accept": "application/json",
            }
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
    const festivals: Festival = await response.json();
    return festivals;
}

export const deleteFestivals = async(id: string):Promise<ErrorResponse| void> => {
    const response = await fetch(`${festivalAPIBaseURL}/festivals/${id}`,
        {
            method: "DELETE",
        });
    if (!response.ok) {
        const error: ErrorResponse = await response.json();
        return error;
    }
}
