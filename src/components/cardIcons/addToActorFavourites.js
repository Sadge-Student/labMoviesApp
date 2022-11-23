import React, { useContext } from "react";
import { ActorsContext } from "../../contexts/actorsContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Tooltip from "@mui/material/Tooltip";

const AddToFavouritesIcon = ({ actor }) => {
    const context = useContext(ActorsContext);

    const handleAddToFavourites = (e) => {
        e.preventDefault();
        context.addToFavourites(actor);
    };

    return (
        <Tooltip title="Favourite Actor" placement="bottom" arrow>
            <IconButton aria-label="add to favourites" onClick={handleAddToFavourites}>
                <FavoriteIcon color="primary" fontSize="large" />
            </IconButton>
        </Tooltip>
    );
};
export default AddToFavouritesIcon;