import React from 'react'
import { createContext } from "react";
import useCategoryMap from '../hooks/useCategoryMap';
import { CategoryMapType } from '../model/Category';

export const CategoryContext = createContext({
    categoryMap: {} as CategoryMapType,
});

export function CategoryConextProvider({ children }: { children: React.ReactNode }) {
    const {
        categoryMap
    } = useCategoryMap()
    return (
        <CategoryContext.Provider value={{ categoryMap }}>
            {children}
        </CategoryContext.Provider>
    )
}
