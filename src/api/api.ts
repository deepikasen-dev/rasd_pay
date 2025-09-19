// src/api.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "./BASE_URL";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export async function apiRequest<T>(
    endpoint: string,
    method: HttpMethod = "GET",
    body?: object,
    params?: Record<string, any>
): Promise<T> {
    let url = `${ API_URL }${ endpoint }`;
    if ( params ) {
        const query = new URLSearchParams( params ).toString();
        url += `?${ query }`;
    }

    const token = await AsyncStorage.getItem( "token" );

    console.log( endpoint, " endpoint " );
    console.log( body, " body " );
    console.log( params, " params " );
    

    const response = await fetch( url, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...( token ? { Authorization: `Bearer ${ token }` } : {} ),
        },
        body: body ? JSON.stringify( body ) : undefined,
    } );
   console.log(response);
   
    

    if ( !response.ok ) {
        throw new Error( `API error: ${ response.status }` );
    }

    return response.json();
}
