'use client';

import { Container } from "@/app/components";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";
import useLoginModal from "@/app/hooks/use-login-modal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
};

interface Props {
    user?: SafeUser;
    reservations?: SafeReservation[]
    listing: SafeListing & {
        user: SafeUser
    };
}

const ListingClient: React.FC<Props> = ({
    user, listing, reservations
}) => {
    const loginModal = useLoginModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [dateRange, setDateRange] = useState(initialDateRange);
    const [totalPrice, setTotalPrice] = useState(listing.price);

    const onCreateReservation = useCallback(() => {
        if (!user) {
            return loginModal.onOpen();
        }
        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice,
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
            .then(() => {
                toast.success('Listing Reserved');
                setDateRange(initialDateRange);
                router.push('/trips');
            })
            .catch((error) => {
                console.log('error', error);
                toast.error('Something went wrong');
            })
            .finally(() => setIsLoading(false))


    }, [
        totalPrice,
        dateRange,
        listing?.id,
        router,
        user,
        loginModal
    ]);
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = Math.abs(differenceInCalendarDays(dateRange.startDate, dateRange.endDate));
            if (dayCount && listing.price) {
                setTotalPrice(dayCount * listing.price);
            } else {
                setTotalPrice(listing.price)
            }
        }
    }, [dateRange, setTotalPrice, listing.price])

    const disabledDates = useMemo(() => {
        let dates: Date[] = [];
        reservations?.forEach((reservation: SafeReservation) => {
            const range = eachDayOfInterval(
                {
                    start: new Date(reservation.startDate),
                    end: new Date(reservation.endDate)
                }
            );
            dates = [...dates, ...range];
        })
        return dates;
    }, [reservations]);

    const category = useMemo(() => {
        return categories.find((catItem) => catItem.label === listing.category)
    }, [listing.category]);


    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead title={listing.title} imageSrc={listing.imageSrc} locationValue={listing.locationValue} id={listing.id} user={user} />
                    <div className='grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6'>
                        <ListingInfo user={listing.user} category={category} description={listing.description} roomCount={listing.roomCount} guestCount={listing.guestCount} bathroomCount={listing.bathroomCount} locationValue={listing.locationValue} />
                        <div className="order-first mb-10 md:order-last md:col-span-3">
                            <ListingReservation price={listing.price} totalPrice={totalPrice} onChangeDate={
                                (value: any) => {
                                    console.log('value', value);
                                    setDateRange(value)
                                }
                            } dateRange={dateRange} onSubmit={onCreateReservation} disabled={isLoading} disabledDates={disabledDates} />
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient