import React from "react";

const MovieReview = ({ review }) => {
    return (
        <>
            <p>Review by: {review.author} </p>
            <p>{review.content} </p>
        </>
    );
};
export default MovieReview;