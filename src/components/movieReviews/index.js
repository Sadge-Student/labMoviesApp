import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";
import { excerpt } from "../../util";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableHead";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from '@mui/material/Avatar';
import CardHeader from "@mui/material/CardHeader";
import ReviewsIcon from '@mui/icons-material/Reviews';
import Button from "@mui/material/Button";
import img from "../../images/profile.png";
import ReactMarkdown from 'react-markdown';

export default function MovieReviews({ movie }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getMovieReviews(movie.id).then((reviews) => {
            setReviews(reviews);
        });
    }, []);

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="reviews table">
          <TableHead>
            <TableRow>
              <TableCell sx={{fontSize: '1.5rem', p: '10px 10px 10px 50px'}}>Author</TableCell>
              <TableCell sx={{fontSize: '1.5rem'}} align="center">Excerpt</TableCell>
              <TableCell sx={{fontSize: '1.5rem', p: '10px 80px 10px 10px'}} align="right">More</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((r) => (
              <TableRow key={r.id}>
                <TableCell component="th" scope="row">
                <CardHeader
                  avatar={
                    <Avatar
                    alt={r.author_details.avatar_path}
                    src={r.author_details.avatar_path === null ? img : String(r.author_details.avatar_path).includes('https') ? String(r.author_details.avatar_path).slice(1) : 'https://image.tmdb.org/t/p/w500/'+ String(r.author_details.avatar_path)}
                    />
                  }
                    title={r.author}
                  />
                </TableCell>
                <TableCell><ReactMarkdown>{excerpt(r.content)}</ReactMarkdown></TableCell>
                <TableCell>
                  <Link
                    style={{textDecoration: 'none'}}
                    to={`/reviews/${r.id}`}
                    state={{
                      review: r,
                      movie: movie,
                    }}
                  >
                    <Button variant="outlined" endIcon={<ReviewsIcon />} style={{margin: '0 10px'}}>Full Review</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}