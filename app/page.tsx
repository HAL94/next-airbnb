import { getCurrentUser } from "./actions/get-current-user";
import getListings, { IListingParams } from "./actions/get-listings";
import { Container } from "./components";
import ClientOnly from "./components/ClientOnly";
import EmptyListing from "./components/listings/EmptyListing";
import ListingCard from "./components/listings/ListingCard";
import { SafeListing } from "./types";

export const dynamic = 'force-dynamic';

interface Props {
  searchParams: IListingParams
}
export default async function Home({ searchParams }: Props) {
  const listings = await getListings(searchParams);
  const user = await getCurrentUser();
  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return (
      <ClientOnly>
        <EmptyListing showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
      <Container>
        <div className='
            pt-24 
            grid 
            grid-cols-1 
            sm:grid-cols-2 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            2xl:grid-cols-6 
            gap-8
          '>
          {
            listings.map((listing: SafeListing) => {
              return (
                <ListingCard key={listing.id} user={user} data={listing} />
              )
            })
          }

        </div>
      </Container>
    </ClientOnly>
  )
}
