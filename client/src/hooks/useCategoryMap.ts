import { useEffect, useState } from "react"

import CategoryService from "../services/CategoryService"
import Category from "../model/Category"

export default function useCategoryMap() {
    const [categoryMap, setCategoryMap] = useState({})

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

    const deleteCategory = (category: Category) => {
        if (category._id) {
            const newCategoryMap = {
                ...categoryMap
            }
            delete newCategoryMap[category._id]
            setCategoryMap(() => newCategoryMap)
        }
    }

    return { categoryMap, updateCategoryMap, deleteCategory }
}