/**
 * @file src/context/StatusBarColorContext.tsx
 * @description React context and related hooks.
 * @lastUpdated 2025-09-19T11:33:09.015Z
 */

import React, { createContext, useContext, useState } from 'react';
import colors from '../utils/colors';

type StatusBarColorContextType = {
  color: string;
  setColor: (color: string) => void;
};

const StatusBarColorContext = createContext<StatusBarColorContextType>({
  color: colors.secondory,
  setColor: () => {},
});

export const StatusBarColorProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [color, setColor] = useState(colors.secondory);

  return (
    <StatusBarColorContext.Provider value={{ color, setColor }}>
      {children}
    </StatusBarColorContext.Provider>
  );
};

export const useStatusBarColor = () => useContext(StatusBarColorContext);
