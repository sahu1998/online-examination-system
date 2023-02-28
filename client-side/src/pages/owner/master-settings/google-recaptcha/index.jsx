import React from 'react'
import Recaptcha from '../../../../components/owner/master-settings/google-recaptcha/temp'
import OwnerLayout from '../../../../layouts/owner-layout'

export default function RecaptchaSetting() {
    return (
        <OwnerLayout>
            <div className='my-5 ml-5'>
                <Recaptcha />
            </div>
        </OwnerLayout>
    )
}
