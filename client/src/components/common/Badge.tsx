import React from 'react'

export default function Badge({ count }: { count: number }) {
    return (
        <>
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                {count}
            </span>
        </>
    )
}