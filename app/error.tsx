'use client';

import { useEffect } from "react";
import EmptyListing from "./components/listings/EmptyListing";

interface Props {
    error: Error
}

const ErrorState: React.FC<Props> = ({ error }) => {
    useEffect(() => {
        console.error(error);
    }, [error])

    return (
        <EmptyListing title="Uh Oh" subtitle="Something went wrong" />
    )
}

export default ErrorState;