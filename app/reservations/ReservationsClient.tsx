'use client';

import React, { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';

import { useRouter } from 'next/navigation';
import { SafeReservation, SafeUser } from '../types';
import Heading from '../components/heading/Heading';
import ListingCard from '../components/listings/ListingCard';
import { Container } from '../components';
import axios from 'axios';
interface Props {
    reservations: SafeReservation[];
    user: SafeUser | null;
}
const ReservationsClient: React.FC<Props> = ({
    reservations, user
}) => {
    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');
    const onCancel = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/reservations/${id}`)
            .then(() => {
                toast.success('Reservation Canceled');
                router.refresh();
            })
            .catch((error) => {
                toast.error('Something went wrong');
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router, setDeletingId])

    return (
        <Container>
            <Heading title='Reservations' subtitle='Bookings on your properties' />
            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
                {reservations.map((reservation: SafeReservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel='Cancel Guest Reservation'
                        user={user} />
                ))}
            </div>
        </Container>
    )
}

export default ReservationsClient