import React from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getMovie } from "../api/tmdb-api";
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import Spinner from "../components/spinner";

const WriteReviewPage = (props) => {
    const location = useLocation();
    const { movieId } = location.state;
    const { data: movie, error, isLoading, isError } = useQuery(
        ["movie", { id: movieId }],
        getMovie
    );

    if (isLoading)
        return <Spinner />
    
    if (isError)
        return <h1>{error.message}</h1>
    
    return (
        <PageTemplate movie={movie}>
            <ReviewForm movie={movie} />
        </PageTemplate>
    );
};
export default WriteReviewPage;