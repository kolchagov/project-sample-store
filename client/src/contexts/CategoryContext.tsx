import React from 'react'
import { createContext } from "react";
import useCategoryMap from '../hooks/useCategoryMap';

export const CategoryContext = createContext({});

export function CategoryConextProvider({ children }: { children: React.ReactNode }) {
    const { categoryMap } = useCategoryMap()
    return (
        <CategoryContext.Provider value={categoryMap}>
            {children}
        </CategoryContext.Provider>
    )
}
