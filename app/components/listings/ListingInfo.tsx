'use client';

import { useCountries } from "@/app/hooks/use-countries";
import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../avatar/Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";
const Map = dynamic(() => import('../map/Map'), {
    ssr: false
});

interface Props {
    user: SafeUser;
    category?: {
        icon: IconType;
        label: string;
        description: string;
    };
    description: string;
    roomCount: number;
    guestCount: number;
    bathroomCount: number;
    locationValue: string;
}
const ListingInfo: React.FC<Props> = ({
    user, category, description, roomCount, guestCount, bathroomCount, locationValue
}) => {
    const { getByValue } = useCountries();
    const coordinates = getByValue(locationValue)?.latlng;

    return (
        <div className="col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
                <div className="text-xl font-semibold flex flex-row items-center gap-2">
                    <div>Hosted by {user?.name} </div>
                    <Avatar avatarSrc={user?.image} />
                </div>
                <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
                    <div className="">{guestCount} guests</div>
                    <div className="">{roomCount} room</div>
                    <div className="">{bathroomCount} bathrooms</div>
                </div>
            </div>
            <hr />
            {category && (
                <ListingCategory icon={category.icon} label={category.label} description={category.description} />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">{description}</div>
            <hr />
            <Map center={coordinates} />
        </div>
    )
}

export default ListingInfo