import { useEffect, useState } from "react"

import CategoryService from "../services/CategoryService"
import Category from "../model/Category"

export default function useCategoryMap() {
    const [categoryMap, setCategoryMap] = useState({})

    const updateCategoryMap = (category: Category) => {
        if (category._id) {
            const newCategoryMap = {
                ...categoryMap, [category._id]: category
            }
            setCategoryMap(() => newCategoryMap)
        }
    }

    useEffect(() => {
        CategoryService.getCategoryMap().then(categories => {
            setCategoryMap(() => categories)
        })
    }, [])

    return { categoryMap, updateCategoryMap }
}