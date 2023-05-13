import { NextResponse } from 'next/server';

import { getCurrentUser } from "@/app/actions/get-current-user";
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string;
}

export async function DELETE(
    request: Request,
    { params } : { params: IParams }
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.error();
        }

        const { listingId } = params;

        if (!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid Id')
        }

        const listing = await prisma.listing.deleteMany({
            where: {
                id: listingId,
                userId: user.id
            }
        });

        return NextResponse.json(listing);
    } catch (error: any) {
        throw new Error(error);
    }
}