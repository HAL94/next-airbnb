import EmptyListing from "../components/listings/EmptyListing";
import ClientOnly from "../components/ClientOnly";

import { getCurrentUser } from "../actions/get-current-user";
import getReservation from "../actions/get-reservations";
import { TripsClient } from "./TripsClient";

const TripsPage = async () => {
    const user = await getCurrentUser();
    if (!user) {
        return (
            <ClientOnly>
                <EmptyListing title='Unauthorized' subtitle='Please login' />
            </ClientOnly>
        )
    }
    const reservations = await getReservation({
        userId: user.id
    });

    return (
        <ClientOnly>
            <TripsClient reservations={reservations} user={user} />
        </ClientOnly>
    )
}

export default TripsPage;