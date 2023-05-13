'use client';

import { useRouter } from 'next/navigation';
import React from 'react'
import Heading from '../heading/Heading';
import Button from '../button/Button';
interface Props {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
}
const EmptyListing: React.FC<Props> = (
    {
        title = 'No exact matches',
        subtitle = 'Try changing or removing some of your filters',
        showReset
    }
) => {
    const router = useRouter();

    return (
        <div className='
            h-[60vh]
            flex flex-col
            gap-2
            justify-center
            items-center
        '>
            <Heading title={title} subtitle={subtitle} />
            <div className='w-48 mt-4'>
                {
                    showReset && <Button
                        outline
                        label='Remove All Filters'
                        onClick={() => router.push('/')}
                    />
                }
            </div>
        </div>
    )
}

export default EmptyListing