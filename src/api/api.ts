/**
 * @file src/api/api.ts
 * @description API client and request helpers.
 * @lastUpdated 2025-09-19T11:33:09.008Z
 */

// src/api.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from './BASE_URL';

/** Allowed HTTP methods for apiRequest */
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/**
 * Perform a JSON HTTP request against the configured API.
 * - Automatically appends Authorization header when token is available.
 * - Serializes body as JSON when provided.
 * - Accepts `params` for querystring.
 */
export async function apiRequest<T>(
  endpoint: string,
  method: HttpMethod = 'GET',
  body?: object,
  params?: Record<string, any>,
): Promise<T> {
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const query = new URLSearchParams(params).toString();
    url += `?${query}`;
  }

  const token = await AsyncStorage.getItem('token');

  // Debug logging for visibility during development
  console.log(endpoint, ' endpoint ');
  console.log(body, ' body ');
  console.log(params, ' params ');

  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  // Response object for quick inspection
  console.log(response);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}
