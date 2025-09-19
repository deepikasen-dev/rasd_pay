/**
 * @file src/types/verifyCode.ts
 * @description Shared TypeScript type definitions.
 * @lastUpdated 2025-09-19T11:33:09.040Z
 */

import { User } from './user';

export interface VerifyCodeResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    access_token: string;
  };
}
