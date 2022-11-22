import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { ActorsContext } from "../../contexts/actorsContext";

const RemoveFromFavouriteActorIcon = ({ actor }) => {
    const context = useContext(ActorsContext);

    const handleRemoveFromFavourites = (e) => {
        e.preventDefault();
        context.removeFromFavourites(actor);
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
export default RemoveFromFavouriteActorIcon;