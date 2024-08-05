import React, { useContext } from 'react'
import { CategoryContext } from '../../../contexts/CategoryContext'

export default function CategorySelector(props) {
    const { categoryMap } = useContext(CategoryContext),
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