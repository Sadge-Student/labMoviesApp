import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const RemoveFromFavouritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromFavourites = (e) => {
        e.preventDefault();
        context.removeFromFavourites(movie);
    };

    return (
        <IconButton
            aria-labelledby="remove from favourites"
            onClick={handleRemoveFromFavourites}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};
export default RemoveFromFavouritesIcon;