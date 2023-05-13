'use client';

import { useCountries } from '@/app/hooks/use-countries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { Reservation } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react'
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../button/HeartButton';
import Button from '../button/Button';

interface Props {
    data: SafeListing
    user: SafeUser | null
    reservation?: SafeReservation;
    onAction?: (actionId: any) => void
    actionLabel?: string
    actionId?: string
    disabled?: boolean
}

const ListingCard: React.FC<Props> = ({
    data, reservation, onAction, disabled, actionLabel, actionId, user
}) => {
    const router = useRouter()
    const { getByValue } = useCountries();
    const location = getByValue(data.locationValue)
    const handleCancel = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()

        if (disabled) {
            return;
        }

        onAction?.(actionId)

    }, [onAction, actionId, disabled])

    const price = useMemo(() => {
        if (reservation) {
            return reservation.totalPrice
        }
        return data.price
    }, [reservation, data.price])

    const reservationData = useMemo(() => {
        if (!reservation) {
            return null;
        }
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])
    return (
        <div onClick={() => router.push(`/listings/${data.id}`)} className='
            col-span-1 cursor-pointer group
        '>
            <div className='flex flex-col gap-2 w-full'>
                <div className='aspect-square w-full relative overflow-hidden rounded-xl'>
                    <Image fill alt='Listing Image' src={data.imageSrc} className='object-cover h-full w-full group-hover:scale-110 transition' />
                    <div className='absolute top-3 right-3'>
                        <HeartButton listingId={data.id} user={user} />
                    </div>
                </div>
                <div className='font-semibold text-lg'>
                    {location?.region}, {location?.label}
                </div>
                <div className='font-light text-neutral-500'>
                    {reservationData || data.category}
                </div>
                <div className='flex flex-row items-center gap-1'>
                    <div className='font-semibold'>
                        $ {price}
                    </div>
                    {
                        !reservation && (
                            <div className='font-light'>night</div>
                        )
                    }
                </div>
                {
                    onAction && actionLabel && (
                        <Button disabled={disabled} small label={actionLabel} onClick={handleCancel} />
                    )
                }
            </div>
        </div>
    )
}

export default ListingCard