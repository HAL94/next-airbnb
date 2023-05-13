import EmptyListing from "../components/listings/EmptyListing";
import ClientOnly from "../components/ClientOnly";

import { getCurrentUser } from "../actions/get-current-user";

import { PropertiesClient } from "./PropertiesClient";
import getListings from "../actions/get-listings";

const PropertiesPage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return (
            <ClientOnly>
                <EmptyListing title='Unauthorized' subtitle='Please login' />
            </ClientOnly>
        )
    }
    const listings = await getListings({
        userId: user.id
    });

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyListing title='No Properties Found' subtitle="Looks like you haven't reserved any trips" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient listings={listings} user={user} />
        </ClientOnly>
    )
}

export default PropertiesPage;