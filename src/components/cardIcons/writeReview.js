import React from "react";
import { Link } from "react-router-dom";
import RateReviewIcon from "@mui/icons-material/RateReview";

const WriteReviewIcon = ({ movie }) => {
    return (
        <Link
            to={"/reviews/form"}
            state={{
                movieId: movie.id
            }}
        >
            <RateReviewIcon color="primary" fontSize="large" />
        </Link>
    );
};
export default WriteReviewIcon;