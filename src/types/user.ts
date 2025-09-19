/**
 * @file src/types/user.ts
 * @description Shared TypeScript type definitions.
 * @lastUpdated 2025-09-19T11:33:09.039Z
 */

// src/types/user.ts
export interface User {
  id: number;
  name: string;
  email: string;
  profile_image: string | null;
  mpin: string | null;
  country_code: string | null;
  phone_number: string | null;
  email_verified_at: string | null;
  phone_verified_at: string | null;
  email_verification_code: string | null;
  phone_verification_code: string | null;
  last_login_at: string | null;
  biometric_login: number;
  is_notify: number;
  language_id: number;
  role: string;
  status: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  notification_count?: number; // present only in fetchUserDetails
}

export interface Funds {
  funds_received: string;
  funds_spent: string;
  remaining_balance: string;
}
