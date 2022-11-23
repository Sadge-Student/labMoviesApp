import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

const RemoveFromFavouriteActorIcon = ({ actor }) => {
    const context = useContext(ActorsContext);

    const handleRemoveFromFavourites = (e) => {
        e.preventDefault();
        context.removeFromFavourites(actor);
    };

    return (
        <Tooltip title="Remove Favourite" placement="bottom" arrow>
            <IconButton aria-labelledby="remove from favourites" onClick={handleRemoveFromFavourites}>
                <DeleteIcon color="primary" fontSize="large" />
            </IconButton>
        </Tooltip>
    );
};
export default RemoveFromFavouriteActorIcon;