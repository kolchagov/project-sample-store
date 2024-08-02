import React from 'react'
import useCategoryMap from '../../../hooks/useCategoryMap'

export default function CategorySelector(props) {
    const { categoryMap } = useCategoryMap(),
        categories = Object.values(categoryMap)

    return (
        <>
            <select
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                {...props}
            >
                {
                    categories.map(category => (
                        <option key={category.name} value={category._id}>
                            {category.name}
                        </option>
                    ))
                }
            </select>
        </>
    )
}