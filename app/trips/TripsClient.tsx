'use client';

import React, { useCallback, useState } from 'react'
import { SafeReservation, SafeUser } from '../types'
import { Container } from '../components';
import Heading from '../components/heading/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface Props {
    reservations: SafeReservation[];
    user: SafeUser | null;
}

export const TripsClient: React.FC<Props> = ({ reservations, user }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback((id: string) => {
    console.log('canceling', id);
    setDeletingId(id);
    axios.delete(`/api/reservations/${id}`)
        .then(() => {
            toast.success(`Reservation Canceled`);
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => setDeletingId(''))
  }, [router, setDeletingId])

  return (
    <Container>
        <Heading title='Trips' subtitle="Where you've been and where you're heading" />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {reservations.map((reservation: SafeReservation) => (
                <ListingCard 
                    key={reservation.id} 
                    data={reservation.listing}
                    reservation={reservation}
                    actionId={reservation.id}
                    onAction={onCancel}
                    disabled={deletingId === reservation.id}
                    actionLabel='Cancel Reservation'
                    user={user}
                />
            ))}
        </div>
    </Container>
  )
}
