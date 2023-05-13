'use client';

import React, { useCallback, useState } from 'react'
import { SafeListing, SafeUser } from '../types'
import { Container } from '../components';
import Heading from '../components/heading/Heading';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface Props {
    listings: SafeListing[];
    user: SafeUser | null;
}

export const PropertiesClient: React.FC<Props> = ({ listings, user }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');
  const onCancel = useCallback((id: string) => {
    console.log('canceling', id);
    setDeletingId(id);
    axios.delete(`/api/listings/${id}`)
        .then(() => {
            toast.success(`Listing Deleted`);
            router.refresh();
        })
        .catch((error) => {
            toast.error(error?.response?.data?.error);
        })
        .finally(() => setDeletingId(''))
  }, [router, setDeletingId])

  return (
    <Container>
        <Heading title='Properties' subtitle="List of your properties" />
        <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
            {listings.map((listing: SafeListing) => (
                <ListingCard 
                    key={listing.id} 
                    data={listing}
                    actionId={listing.id}
                    onAction={onCancel}
                    disabled={deletingId === listing.id}
                    actionLabel='Delete Property'
                    user={user}
                />
            ))}
        </div>
    </Container>
  )
}
