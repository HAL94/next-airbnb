'use client';

import React from 'react'
import { SafeListing, SafeUser } from '../types';
import { Container } from '../components';
import Heading from '../components/heading/Heading';
import ListingCard from '../components/listings/ListingCard';
interface Props {
    listings: SafeListing[];
    user: SafeUser | null;
}
const FavoritesClient: React.FC<Props> = ({
    listings,
    user
}) => {
    return (
        <Container>
            <Heading title="Favorites" subtitle='List of places you wish to go' />
            <div className='
                mt-10 grid
                grid-cols-1 
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
                gap-8
            '>
                {listings.map((listing: SafeListing) => (
                    <ListingCard key={listing.id} user={user} data={listing} />
                ))}
            </div>
        </Container>
    )
}

export default FavoritesClient;
