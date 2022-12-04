import React from "react";
import ReactMarkdown from 'react-markdown';
import Chip from "@mui/material/Chip";
import Tooltip from '@mui/material/Tooltip';
import Paper from "@mui/material/Paper";

const chip = { margin: 0.5 };

const MovieReview = ({ review }) => {
    return (
        <>
        <Paper component="ul" sx={{ p: '0 15px 15px 15px'}}>
            <div style={{ padding: '25px 0 25px 0'}}>
                <span> Review by: </span>
                <Tooltip title="Author Name" arrow>
                    <Chip label={review.author} sx={chip} color="primary" />
                </Tooltip>
                <Tooltip title="Username" arrow>
                    <Chip label={`@${review.author_details.username}`} sx={chip} color="secondary" />
                </Tooltip>
            </div>
            <ReactMarkdown>{review.content}</ReactMarkdown>
        </Paper>
        </>
    );
};
export default MovieReview;