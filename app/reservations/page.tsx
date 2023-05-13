import EmptyListing from "../components/listings/EmptyListing";
import ClientOnly from "../components/ClientOnly";

import { getCurrentUser } from "../actions/get-current-user";
import getReservation from "../actions/get-reservations";
import ReservationsClient from "./ReservationsClient";

export default async function ReservationsPage() {
    const user = await getCurrentUser();
    if (!user) {
        return <ClientOnly>
            <EmptyListing title='Unauthorized' subtitle="Please login" />
        </ClientOnly>
    }

    const reservations = await getReservation({
        authorId: user.id
    });

    if (reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyListing title='No reservations found' subtitle="Looks like you have no reservations on your properties" />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <ReservationsClient reservations={reservations} user={user} />
        </ClientOnly>
    )

}