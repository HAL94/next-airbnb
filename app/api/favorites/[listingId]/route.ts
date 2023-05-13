import { NextResponse } from 'next/server';

import { getCurrentUser } from '@/app/actions/get-current-user';
import prisma from '@/app/libs/prismadb';

interface IParams {
    listingId?: string
}

export async function POST(request: Request, { params }: { params: IParams }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.error();
    }
    const { listingId } = params;
    console.log('listing id', listingId);
    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid ID')
    } 
    let favoriteIds = [...(user.favoriteIds || [])];
    favoriteIds.push(listingId);

    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(updatedUser);

}

export async function DELETE(request: Request, { params }: { params: IParams }) {
    const user = await getCurrentUser();
    if (!user) {
        return NextResponse.error()
    }
    
    const { listingId } = params;

    if (!listingId || typeof listingId !== 'string') {
        throw new Error('Invalid id')
    }

    let favoriteIds = [...(user.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);
    const updatedUser = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            favoriteIds
        }
    });

    return NextResponse.json(updatedUser);
    
}