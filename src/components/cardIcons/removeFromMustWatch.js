import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const RemoveFromMustWatchIcon = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleRemoveFromMustWatch = (e) => {
        e.preventDefault();
        context.removeFromMustWatch(movie);
    };

    return (
        <Tooltip title="Remove From Must Watch" placement="bottom" arrow>
            <IconButton aria-labelledby="remove from favourites" onClick={handleRemoveFromMustWatch}>
                <DeleteIcon color="primary" fontSize="large" />
            </IconButton>
        </Tooltip>
    );
};
export default RemoveFromMustWatchIcon;