import { useEffect, useState } from "react"

import CategoryService from "../services/CategoryService"
import Category, { CategoryMapType } from "../model/Category"

export default function useCategoryMap() {
    const [categoryMap, setCategoryMap] = useState({} as CategoryMapType)

    useEffect(() => {
        CategoryService.getCategoryMap().then(categories => {
            setCategoryMap(() => categories)
        })
    }, [])

    const updateCategoryMap = (category: Category) => {
        if (category._id) {
            const newCategoryMap = {
                ...categoryMap, [category._id]: category
            }
            setCategoryMap(() => newCategoryMap)
        }
    }

    const deleteCategory = (categoryId: string) => {
        const newCategoryMap = {
            ...categoryMap
        }
        delete newCategoryMap[categoryId]
        setCategoryMap(() => newCategoryMap)
    }

    const getCategoryName = (categoryId: string = "default") => {
        const category = categoryMap[categoryId] || categoryMap["default"]
        return category?.name
    }

    return { categoryMap, getCategoryName, updateCategoryMap, deleteCategory }
}