import { getCurrentUser } from '@/app/actions/get-current-user';
import getListingById from '@/app/actions/get-listing'
import ClientOnly from '@/app/components/ClientOnly';
import React from 'react'
import ListingClient from './ListingClient';
import { SafeUser } from '@/app/types';
import getReservation from '@/app/actions/get-reservations';

interface IParams {
    listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
    const listing = await getListingById({ listingId: params.listingId });
    const reservations = await getReservation(params);
    const user = await getCurrentUser();
    if (!listing) {
        return <ClientOnly>
            <h1>Not found!</h1>
        </ClientOnly>
    }
    return (
        <ClientOnly>
           <ListingClient reservations={reservations} listing={listing} user={user as SafeUser} />

        </ClientOnly>
    )
}

export default ListingPage