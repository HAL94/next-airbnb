import { NextResponse } from "next/server";

import { getCurrentUser } from "@/app/actions/get-current-user";
import prisma from '@/app/libs/prismadb';

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request,
    { params } : { params: IParams }) {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.error();
        }

        const { reservationId } = params;
        
        if (!reservationId || typeof reservationId !== 'string') {
            throw new Error('Invalid ID');
        }
        
        const reservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [
                    { userId: user.id },
                    { listing: { userId: user.id }}
                ]
            }
        });

        return NextResponse.json(reservation);
}