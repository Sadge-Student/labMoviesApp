import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const RemoveFromFavouritesIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromFavourites = (e) => {
        e.preventDefault();
        context.removeFromFavourites(movie);
    };

    return (
        <Tooltip title="Remove Favourite" placement="bottom" arrow>
            <IconButton aria-labelledby="remove from favourites" onClick={handleRemoveFromFavourites}>
                <DeleteIcon color="primary" fontSize="large" />
            </IconButton>
        </Tooltip>
    );
};
export default RemoveFromFavouritesIcon;