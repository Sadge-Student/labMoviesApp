import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavouritesIcon = ({ actor }) => {
    const context = useContext(ActorsContext);

    const handleAddToFavourites = (e) => {
        e.preventDefault();
        context.addToFavourites(actor);
    };

    return (
        <IconButton aria-label="add to favourites" onClick={handleAddToFavourites}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};
export default AddToFavouritesIcon;