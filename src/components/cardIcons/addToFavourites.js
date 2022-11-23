import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";

const AddToFavouritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToFavourites = (e) => {
        e.preventDefault();
        context.addToFavourites(movie);
    };

    return (
        <Tooltip title="Favourite Movie" placement="bottom" arrow>
            <IconButton aria-label="add to favourites" onClick={handleAddToFavourites}>
                <FavoriteIcon color="primary" fontSize="large" />
            </IconButton>
        </Tooltip>
    );
};
export default AddToFavouritesIcon;