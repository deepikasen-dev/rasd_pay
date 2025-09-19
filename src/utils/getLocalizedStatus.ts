/**
 * @file src/utils/getLocalizedStatus.ts
 * @description Utility helpers and shared logic.
 * @lastUpdated 2025-09-19T11:33:09.042Z
 */

import strings from './strings';

export const getLocalizedStatus = (status: string) => {
  switch (status.toLowerCase()) {
    case 'approved':
      return strings.approved;
    case 'pending':
      return strings.pending;
    case 'rejected':
      return strings.rejected;
    default:
      return status; // fallback if unknown
  }
};
