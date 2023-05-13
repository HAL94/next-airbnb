import prisma from '@/app/libs/prismadb';

import { getCurrentUser } from './get-current-user';

export default async function getFavoriteListings() {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return [];
        }
        const favorites = await prisma.listing.findMany({
            where: { id: { in: [...(user.favoriteIds || [])] } }
        })
        const safeFavorites = favorites.map(favItem => ({
            ...favItem,
            createdAt: favItem.createdAt.toISOString()
        }))
        return safeFavorites;
    } catch (error: any) {
        throw new Error(error);
    }
}
