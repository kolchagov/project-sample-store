import React from 'react'
import { createContext } from "react";

import Category, { CategoryMapType } from '../model/Category';
import useCategoryMap from '../hooks/useCategoryMap';

export const CategoryContext = createContext({
    categoryMap: {} as CategoryMapType,
    deleteCategory: (categoryId: string) => { },
    updateCategoryMap: (category: Category) => { },
    getCategoryName: (categoryId: string | undefined) => '' as string,
});

export function CategoryConextProvider({ children }: { children: React.ReactNode }) {
    const {
        categoryMap, deleteCategory, updateCategoryMap, getCategoryName
    } = useCategoryMap()
    return (
        <CategoryContext.Provider value={{ categoryMap, deleteCategory, updateCategoryMap, getCategoryName }}>
            {children}
        </CategoryContext.Provider>
    )
}
