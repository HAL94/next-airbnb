import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from "@/app/actions/get-current-user";

export async function POST(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.error();
    }

    const body = await request.json();

    const {
        listingId, startDate,
        endDate, totalPrice
    } = body;

    if (!listingId || !startDate || !endDate || typeof totalPrice === 'undefined') {
        return NextResponse.error();
    }

    const listingAndReservation = await prisma.listing.update({
        where: {
            id: listingId
        },
        data: {
            reservations: {
                create: {
                    userId: user.id,
                    startDate,
                    endDate,
                    totalPrice
                }
            }
        }
    });
    return NextResponse.json(listingAndReservation);
    

}