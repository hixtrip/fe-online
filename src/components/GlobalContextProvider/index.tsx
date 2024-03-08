import React, { memo, createContext, useContext } from 'react';

interface GlobalContextType {
    loading?: boolean;
    changeLoading?: (value: boolean) => void;
  }

export const globalContext = createContext<GlobalContextType>({});

export function useGlobalContext() {
    return useContext(globalContext);
}

function ContextProvider({ context, children, value }) {
    return <context.Provider value={value}>{children}</context.Provider>;
}
export default memo(ContextProvider);
