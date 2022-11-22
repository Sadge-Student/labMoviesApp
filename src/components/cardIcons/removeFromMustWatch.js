import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const RemoveFromMustWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromMustWatch = (e) => {
        e.preventDefault();
        context.removeFromMustWatch(movie);
    };

    return (
        <IconButton
            aria-labelledby="remove from favourites"
            onClick={handleRemoveFromMustWatch}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};
export default RemoveFromMustWatchIcon;