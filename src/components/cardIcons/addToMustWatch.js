import React, {useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Tooltip from "@mui/material/Tooltip";

const AddToMustWatch = ({ movie }) => {
    const context = useContext(MoviesContext);

    const handleAddToMustWatch = (e) => {
        e.preventDefault();
        context.addToMustWatch(movie);
    }

    return (
        <Tooltip title="Add To Must Watch" placement="bottom" arrow>
            <IconButton aria-label="add to must watch" onClick={handleAddToMustWatch}>
                <PlaylistAddIcon color="primary" fontSize="large"/>
            </IconButton>
        </Tooltip>
    );
};
export default AddToMustWatch;