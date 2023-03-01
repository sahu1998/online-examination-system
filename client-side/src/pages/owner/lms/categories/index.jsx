import React from 'react'
import LmsCat from '../../../../components/owner/lms/categories/temp'
import OwnerLayout from '../../../../layouts/owner-layout'

export default function LmsCategory() {
    return (
        <OwnerLayout>
            <div className='my-5'>
                <LmsCat />
            </div>
        </OwnerLayout>
    )
}
