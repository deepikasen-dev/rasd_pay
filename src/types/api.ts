/**
 * @file src/types/api.ts
 * @description Shared TypeScript type definitions.
 * @lastUpdated 2025-09-19T11:33:09.037Z
 */

// src/types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}
