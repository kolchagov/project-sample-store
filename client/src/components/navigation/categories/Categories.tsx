import React, { useContext } from 'react'
import { CategoryContext } from '../../../contexts/CategoryContext';

import Category from '../../../model/Category'

import './Categories.css'

export default function Categories() {
    const categoryMap = useContext(CategoryContext),
        categories = Object.values(categoryMap) as [Category]
    return (
        <div className='sidenav'>
            <ul className='vertical-menu list-group'>
                <li className="text-center bg-black"><strong>Categories:</strong></li>
                {
                    categories.map((cat, index) => <li key={index}>{cat.name}</li>)
                }
            </ul>
        </div>
    )
}