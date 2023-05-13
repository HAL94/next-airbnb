import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./use-login-modal";

interface IUseFavorite {
    listingId: string;
    user?: SafeUser | null;
}

const useFavorite = ({
    listingId, user
}: IUseFavorite) => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const hasFavorited = useMemo(() => {
        const list = user?.favoriteIds || []
        return list.includes(listingId);
    }, [listingId, user])

    const toggleFavorite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if (!user) {
            return loginModal.onOpen();
        }

        try {
            let request;
            if (hasFavorited) {
                request = () => axios.delete(`/api/favorites/${listingId}`);
            } else {
                request = () => axios.post(`/api/favorites/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success');
        } catch (error) {
            toast.error('Something went wrong');
        }
    }, [
        user, hasFavorited, listingId, loginModal, router
    ])

    return {
        hasFavorited, toggleFavorite
    }
}

export default useFavorite;