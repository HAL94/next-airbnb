import EmptyListing from "../components/listings/EmptyListing";
import ClientOnly from "../components/ClientOnly";
import { getCurrentUser } from "../actions/get-current-user";
import getFavoriteListings from "../actions/get-favorite-listings";
import FavoritesClient from "./FavoritesClient";

export default async function ListingPage() {
    const favoriteListings = await getFavoriteListings();
    const user = await getCurrentUser();
    if (favoriteListings.length === 0) {
        return (
            <ClientOnly>
                <EmptyListing title='No favorites found' subtitle="Looks like you have no favorites" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoritesClient 
                listings={favoriteListings}
                user={user}
            />
        </ClientOnly>
    )
}