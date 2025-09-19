/**
 * @file src/utils/globalUse.ts
 * @description Utility helpers and shared logic.
 * @lastUpdated 2025-09-19T11:33:09.043Z
 */

import { Dimensions, Platform } from 'react-native';

/**
 * Width-percentage helper: returns pixels for given % of screen width.
 */
export const wp = (percent: number) => globalUse.WIDTH * (percent / 100);
/**
 * Height-percentage helper: returns pixels for given % of screen height.
 */
export const hp = (percent: number) => globalUse.HEIGHT * (percent / 100);

/** Platform/screen helpers shared across the app */
const globalUse = {
  WIDTH: Dimensions.get('window').width,
  HEIGHT: Dimensions.get('window').height,
  IOS: Platform.OS === 'ios',
};

export default globalUse;
