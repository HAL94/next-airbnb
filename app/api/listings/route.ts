import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb';
import { getCurrentUser } from "@/app/actions/get-current-user";

const checkIfParamsMissing = (data: any) => {
    Object.keys(data).forEach((value: any) => {
        if (!data[value]) {
            return NextResponse.error()
        }
    })
}
export async function POST(request: Request) {
    const user = await getCurrentUser();

    if (!user) {
        return NextResponse.error()
    }

    const body = await request.json();

    checkIfParamsMissing(body);

    const {
        title, description, imageSrc, category, roomCount, bathroomCount, guestCount, location, price
    } = body

    const listing = await prisma.listing.create({
        data: {
            title, 
            description,
            imageSrc, 
            category, 
            roomCount, 
            bathroomCount, 
            guestCount, 
            locationValue: location.value, 
            price: parseInt(price, 10),
            userId: user.id
        }
    })

    return NextResponse.json(listing)


}