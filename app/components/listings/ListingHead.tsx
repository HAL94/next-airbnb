'use client';

import { useCountries } from '@/app/hooks/use-countries';
import { SafeUser } from '@/app/types';
import React from 'react'
import Heading from '../heading/Heading';
import Image from 'next/image';
import HeartButton from '../button/HeartButton';

interface Props {
    title: string;
    imageSrc: string;
    locationValue: string;
    id: string;
    user?: SafeUser | null;
}

const ListingHead: React.FC<Props> = ({
    title, imageSrc, locationValue, id, user
}) => {
    const { getByValue } = useCountries();
    const location = getByValue(locationValue);

    return (
        <React.Fragment>
            <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
            <div className='w-full h-[60vh] overflow-hidden rounded-xl relative'>
                <Image src={imageSrc} alt={'Listing'} fill className='object-cover w-full' />
                <div className='absolute top-5 right-5'>
                    <HeartButton user={user} listingId={id} />
                </div>
                
            </div>

        </React.Fragment>
    )
}

export default ListingHead